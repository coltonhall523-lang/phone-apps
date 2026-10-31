#!/usr/bin/env python3
"""Send web pushes to the paired phones.

  send.py newspaper OLD.json NEW.json   one alert per newly filed story
  send.py test APP                       a test alert to one app

Env: VAPID_PRIVATE (raw base64url key), PUSH_SUBS (JSON: {app: [{sub, start?}]})."""
import json, os, sys
from pywebpush import webpush, WebPushException

SITE = 'https://coltonhall523-lang.github.io/phone-apps'
SUBS = json.loads(os.environ.get('PUSH_SUBS') or '{}')


def send(app, payload, only=None):
    ok = 0
    for s in SUBS.get(app, []):
        if only and not only(s):
            continue
        try:
            webpush(subscription_info=s['sub'], data=json.dumps(payload), vapid_private_key=os.environ['VAPID_PRIVATE'],
                    vapid_claims={'sub': 'https://coltonhall523-lang.github.io'}, ttl=86400)
            ok += 1
        except WebPushException as e:
            code = getattr(e.response, 'status_code', None)
            print(f'{app}: send failed ({code}):', 'the phone unsubscribed; pair it again' if code in (404, 410) else e)
    print(f'{app}: sent "{payload["title"]}" to {ok} phone(s)')
    return ok


def newspaper(old_path, new_path):
    try:
        old = {a['id'] for a in json.load(open(old_path))}
    except (OSError, ValueError):
        old = set()
    new = [a for a in json.load(open(new_path)) if a['id'] not in old and a.get('headline')]
    if len(new) > 3:
        send('newspaper', {'title': 'The Newspaper', 'body': f'{len(new)} new reports filed, led by: {new[0]["headline"]}', 'url': './', 'tag': 'np'})
        return
    for a in new:
        send('newspaper', {'title': f'The Newspaper · {a.get("section", "New report")}', 'body': a['headline'], 'url': '#a-' + a['id'], 'tag': 'np-' + a['id']})


if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'newspaper':
        newspaper(sys.argv[2], sys.argv[3])
    elif mode == 'test':
        app = sys.argv[2]
        name = 'The Newspaper' if app == 'newspaper' else 'Launch Plan'
        sys.exit(0 if send(app, {'title': name, 'body': 'Paired. Notifications from your Chromebook reach this phone.', 'url': './'}) else 1)
