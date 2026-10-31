#!/usr/bin/env python3
"""Build the phone-app site in docs/ from the apps' own sources.

Each app's page is the same file published on claude.ai, wrapped in a real
document with a manifest, Home Screen icons, the service worker and the
notification bell (src/pwa.js). Run ./publish.sh to build and push."""
import glob, hashlib, json, os, shutil, subprocess

HOME = os.path.expanduser('~')
ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(ROOT, 'docs')
VAPID_PUBLIC = json.load(open(os.path.join(HOME, '.config/phone-apps/vapid.json')))['public']
CHROME = glob.glob(os.path.join(HOME, '.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell'))

APPS = {
    'newspaper': {
        'name': 'The Newspaper', 'short': 'Newspaper', 'src': f'{HOME}/coach/newspaper/newspaper.html',
        'theme': '#eeece5', 'bg': '#eeece5',
        'tokens': '--pwa-bg:var(--sheet);--pwa-fg:var(--ink);--pwa-line:var(--hair);--pwa-accent:var(--accent);--pwa-on-accent:var(--sheet)',
        'extra_css': '',
        'icon': '''<body style="margin:0;width:100vw;height:100vh;display:grid;place-items:center;background:#f5f3ec">
          <div style="text-align:center;color:#1c1b17"><div style="font-family:'UnifrakturMaguntia';font-size:62vw;line-height:.9">N</div>
          <div style="border-top:2.4vw double #1c1b17;width:62vw;margin:2vw auto 0"></div></div>''',
        'fonts': 'UnifrakturMaguntia',
    },
    'launch-plan': {
        'name': 'Launch Plan', 'short': 'Launch Plan', 'src': f'{HOME}/apps/launch-plan.html',
        'theme': '#17100a', 'bg': '#17100a',
        'tokens': '--pwa-bg:var(--panel);--pwa-fg:var(--fg);--pwa-line:var(--line-2);--pwa-accent:var(--amber);--pwa-on-accent:#1d1006',
        # the progress review needs Claude, which only answers on claude.ai
        'extra_css': '#reviewBtn{display:none}',
        'icon': '''<body style="margin:0;width:100vw;height:100vh;display:grid;place-items:center;background:#17100a">
          <div style="position:relative;width:64vw;height:64vw;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffb347,#f28c28 55%,#a4552c);box-shadow:0 0 0 4vw #0a0603">
          <div style="position:absolute;left:50%;top:9vw;width:4vw;margin-left:-2vw;height:24vw;background:#1a0f05;border-radius:2vw;transform-origin:50% 23vw;transform:rotate(40deg)"></div></div>''',
        'fonts': '',
    },
}

SKELETON = '''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{name}</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{short}">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="{theme}">
<style>:root{{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}html{{scroll-padding-top:env(safe-area-inset-top,0px)}}body{{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
</head><body>
{page}
<style>:root{{{tokens}}}{extra_css}</style>
<script src="../pwa.js" data-app="{app}" data-name="{name}" data-vapid="{vapid}"></script>
</body></html>
'''


def icon(app, cfg, size, out):
    html = os.path.join(ROOT, '.icon.html')
    fonts = f'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={cfg["fonts"]}&display=block">' if cfg['fonts'] else ''
    open(html, 'w').write(f'<!doctype html><html><head><meta charset="utf-8">{fonts}</head>{cfg["icon"]}</body></html>')
    subprocess.run([CHROME[0], '--no-sandbox', '--hide-scrollbars', f'--window-size={size},{size}', '--virtual-time-budget=4000',
                    f'--screenshot={out}', 'file://' + html], check=True, capture_output=True)
    os.remove(html)


def articles():
    out = []
    for f in sorted(glob.glob(f'{HOME}/coach/newspaper/articles/*.json')):
        d = json.load(open(f))
        d['id'] = os.path.basename(f)[:-5]
        out.append(d)
    return out


def main():
    os.makedirs(DOCS, exist_ok=True)
    shutil.copy(os.path.join(ROOT, 'src/pwa.js'), os.path.join(DOCS, 'pwa.js'))
    sw_src = open(os.path.join(ROOT, 'src/sw.js')).read()
    for app, cfg in APPS.items():
        d = os.path.join(DOCS, app)
        os.makedirs(d, exist_ok=True)
        page = open(cfg['src']).read()
        html = SKELETON.format(page=page, app=app, vapid=VAPID_PUBLIC, **{k: v for k, v in cfg.items() if k not in ('src', 'icon', 'fonts')})
        open(os.path.join(d, 'index.html'), 'w').write(html)
        data = ''
        if app == 'newspaper':
            data = json.dumps(articles(), ensure_ascii=False, indent=0)
            open(os.path.join(d, 'articles.json'), 'w').write(data)
        version = hashlib.sha1((html + data + sw_src + open(os.path.join(DOCS, 'pwa.js')).read()).encode()).hexdigest()[:10]
        open(os.path.join(d, 'sw.js'), 'w').write(sw_src.replace('__VERSION__', version).replace('__NAME__', cfg['name']))
        json.dump({'name': cfg['name'], 'short_name': cfg['short'], 'start_url': './', 'scope': './', 'display': 'standalone',
                   'background_color': cfg['bg'], 'theme_color': cfg['theme'],
                   'icons': [{'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
                             {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}]},
                  open(os.path.join(d, 'manifest.webmanifest'), 'w'), indent=1)
        for size in (180, 192, 512):
            p = os.path.join(d, f'icon-{size}.png')
            if not os.path.exists(p):
                icon(app, cfg, size, p)
        print('built', app, version)


if __name__ == '__main__':
    main()
