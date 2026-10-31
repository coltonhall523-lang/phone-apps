#!/bin/bash
# Turn on Newspaper agent reports: adds Stop + SubagentStop hooks running ~/phone-apps/agent-report.py.
python3 - <<'PY'
import json, os
p = os.path.expanduser('~/.claude/settings.json'); s = json.load(open(p))
h = {"type": "command", "command": "python3 ~/phone-apps/agent-report.py", "timeout": 15}
for ev in ('Stop', 'SubagentStop'):
    lst = s.setdefault('hooks', {}).setdefault(ev, [])
    if not any('agent-report' in json.dumps(x) for x in lst):
        lst.append({"hooks": [h]})
json.dump(s, open(p, 'w'), indent=2)
print("Agent reports ON. Restart Claude Code to load the hooks.")
PY
