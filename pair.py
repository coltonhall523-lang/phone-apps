#!/usr/bin/env python3
"""Pair a phone: ./pair.py PUSH1:...  (the code the app's bell shows)

Saves the phone's push subscription in ~/.config/phone-apps/subs.json, uploads
the set to the repo's PUSH_SUBS secret, and sends the phone a test alert."""
import base64, json, os, subprocess, sys

HOME = os.path.expanduser('~')
CFG = os.path.join(HOME, '.config/phone-apps')
REPO = 'coltonhall523-lang/phone-apps'
code = (sys.argv[1] if len(sys.argv) > 1 else sys.stdin.read()).strip()
if not code.startswith('PUSH1:'):
    sys.exit('That is not a pairing code. It starts with PUSH1: and comes from the bell in the app.')
raw = code[6:]
info = json.loads(base64.urlsafe_b64decode(raw + '=' * (-len(raw) % 4)))
app, sub = info['app'], info['sub']

path = os.path.join(CFG, 'subs.json')
subs = json.load(open(path)) if os.path.exists(path) else {}
entry = {'sub': sub, **({'start': info['start']} if info.get('start') else {})}
subs[app] = [s for s in subs.get(app, []) if s['sub']['endpoint'] != sub['endpoint']] + [entry]
json.dump(subs, open(path, 'w'), indent=1)
os.chmod(path, 0o600)
subprocess.run(['gh', 'secret', 'set', 'PUSH_SUBS', '--repo', REPO, '--body', json.dumps(subs)], check=True)
print(f'Paired {app}' + (f' (plan start {info["start"]})' if info.get('start') else '') + f'; {len(subs[app])} phone(s) on file.')

env = dict(os.environ, PUSH_SUBS=json.dumps(subs), VAPID_PRIVATE=json.load(open(os.path.join(CFG, 'vapid.json')))['private'])
subprocess.run([os.path.join(HOME, '.venv/bin/python3'), os.path.join(os.path.dirname(os.path.abspath(__file__)), '.github/push/send.py'), 'test', app], env=env)
