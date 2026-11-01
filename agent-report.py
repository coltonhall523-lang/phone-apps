#!/usr/bin/env python3
"""Claude Code hook: when an agent finishes a long job, file a Newspaper story and push it to the phone.

Wired in ~/.claude/settings.json for the Stop (main session) and SubagentStop (any subagent) events.
A story is filed only for real work, so quick chat turns don't spam the phone:
  main session turn  >= MAIN_MIN seconds     subagent run  >= SUB_MIN seconds
  AGENT_REPORT_ALWAYS=1 files every run (takeover mode sets it); AGENT_REPORT_OFF=1 files nothing.
Story: ~/coach/newspaper/articles/agent-*.json (section "Agent Desk"), then publish.sh pushes it;
the Newspaper alerts workflow sends the notification. The phone-apps site is PUBLIC, so secrets are scrubbed.
"""
import json, os, re, subprocess, sys, time
from datetime import datetime

HOME = os.path.expanduser('~')
ARTICLES = f'{HOME}/coach/newspaper/articles'
PUBLISH = f'{HOME}/phone-apps/publish.sh'
LOG = f'{HOME}/phone-apps/.agent-report.log'
MAIN_MIN, SUB_MIN = 180, 60

SECRET = re.compile(r'(github_pat_\w+|gh[pousr]_\w{20,}|sk-[\w-]{20,}|AIza[\w-]{30,}|xox[abp]-[\w-]+|eyJ[\w-]{20,}\.[\w-]+\.[\w-]+'
                    r'|-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----|\b[A-Za-z0-9_\-]{40,}\b)')
NEEDS = re.compile(r'needs you|blocked|stuck|you (must|need to|have to)|sign in|log in|waiting for you|can.?t continue|need your', re.I)
FAILED = re.compile(r'\b(failed|failing|error|broke|broken|could not|couldn.?t|didn.?t work)\b', re.I)


def scrub(s):
    return SECRET.sub('[hidden]', s or '')


def text_of(content):
    if isinstance(content, str):
        return content
    return '\n'.join(c.get('text', '') for c in content or [] if isinstance(c, dict) and c.get('type') == 'text')


def ts(e):
    try:
        return datetime.fromisoformat(e['timestamp'].replace('Z', '+00:00')).timestamp()
    except (KeyError, ValueError, AttributeError):
        return None


def read_run(path, whole):
    """Return (task, final_text, tool_count, errors, seconds) for the last turn (or whole file for subagents)."""
    rows = []
    for line in open(path, errors='replace'):
        try:
            rows.append(json.loads(line))
        except ValueError:
            pass
    start = 0
    if not whole:  # main session: start at the last real user prompt (not a tool result)
        for i, e in enumerate(rows):
            m = e.get('message') or {}
            if e.get('type') == 'user' and not e.get('isMeta') and m.get('role') == 'user':
                c = m.get('content')
                if isinstance(c, str) or any(isinstance(x, dict) and x.get('type') == 'text' for x in c or []):
                    start = i
    run = rows[start:]
    task, final, tools, errors = '', '', 0, []
    for e in run:
        m = e.get('message') or {}
        c = m.get('content')
        if e.get('type') == 'user' and not task and text_of(c).strip():
            task = text_of(c)
        if e.get('type') == 'assistant':
            t = text_of(c).strip()
            if t:
                final = t
            for x in c or []:
                if isinstance(x, dict) and x.get('type') == 'tool_use':
                    tools += 1
                    if 'Handback' in x.get('name', '') and isinstance(x.get('input'), dict):
                        final = str(x['input'].get('message') or final)  # subagent's real final report
        if e.get('type') == 'user' and isinstance(c, list):
            for x in c:
                if isinstance(x, dict) and x.get('type') == 'tool_result' and x.get('is_error'):
                    errors.append(text_of(x.get('content')) if not isinstance(x.get('content'), str) else x['content'])
    times = [t for t in (ts(e) for e in run) if t]
    secs = (max(times) - min(times)) if len(times) > 1 else 0
    return task, final, tools, errors, secs


def short(s, n):
    s = re.sub(r'<[^>]{1,40}>', '', s).strip()
    return s if len(s) <= n else s[:n - 1].rstrip() + '…'


def main():
    if os.environ.get('AGENT_REPORT_OFF') == '1':
        return
    hook = json.load(sys.stdin)
    sub = hook.get('hook_event_name') == 'SubagentStop'
    path = hook.get('agent_transcript_path') if sub else hook.get('transcript_path')
    if not path or not os.path.exists(path) or hook.get('stop_hook_active'):
        return
    task, final, tools, errors, secs = read_run(path, whole=sub)
    final = hook.get('last_assistant_message') or final
    always = os.environ.get('AGENT_REPORT_ALWAYS') == '1'
    if not always and secs < (SUB_MIN if sub else MAIN_MIN):
        return
    who = (hook.get('agent_type') or 'subagent') if sub else ('Cursor (takeover)' if always else 'Claude')
    who = who.split(':')[-1].capitalize() if sub else who
    status = 'Needs you' if NEEDS.search(final[-1500:]) else ('Hit problems' if errors and FAILED.search(final) else 'Done')
    mins = max(1, round(secs / 60))
    task_s, final_s = scrub(task), scrub(final)
    lines = [l for l in task_s.splitlines() if l.strip()] or ['a job']
    first = re.sub(r'^(user.s task[^:]*:|task:)\s*', '', lines[0].strip(), flags=re.I).strip('"\' ')
    first = short(first or 'a job', 90)

    body = [f'**Status: {status}.** {who} worked {mins} min, ran {tools} tool steps, hit {len(errors)} errors.', '',
            '## The job', '', short(task_s, 200), '', '## What happened', '', short(final_s, 1000) or '_No final report._']
    if errors:
        body += ['', '## What went wrong along the way', '']
        body += [f'- `{short(scrub(e).replace(chr(10), " ").replace("`", "'"), 120)}`' for e in errors[-3:]]
    if status != 'Done':
        body += ['', '## Needs work', '', 'Read "What happened" above for what is left. Open Claude Code on the Chromebook to pick it up.']

    now = datetime.now()
    sid = (hook.get('agent_id') or hook.get('session_id') or 'x')[:8]
    story = {'section': 'Agent Desk', 'order': 50, 'date': now.strftime('%Y-%m-%d'), 'byline': f'By {who}',
             'headline': f'{status}: {first}', 'dek': f'{now.strftime("%-I:%M %p")} · {mins} min · {tools} steps · {len(errors)} errors',
             'body': '\n'.join(body), 'source': 'agent-report hook'}
    os.makedirs(ARTICLES, exist_ok=True)
    name = f'{ARTICLES}/agent-{now.strftime("%Y%m%d-%H%M%S")}-{sid}.json'
    json.dump(story, open(name, 'w'), ensure_ascii=False, indent=1)
    if os.environ.get('AGENT_REPORT_DRY') == '1':
        print(name); return
    # Publish in the background so the hook returns at once; flock keeps two finishes from pushing at the same time.
    subprocess.Popen(['bash', '-c', f'sleep 5; flock {HOME}/phone-apps/.publish.lock "{PUBLISH}" "Agent report: {status}"'],
                     stdout=open(LOG, 'a'), stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL, start_new_session=True)


if __name__ == '__main__':
    try:
        main()
    except Exception as e:  # never break Claude Code over a report
        open(LOG, 'a').write(f'{time.ctime()} agent-report error: {e!r}\n')
