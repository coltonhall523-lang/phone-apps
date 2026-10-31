/* Phone-app layer shared by every app on this site: registers the service worker
   and adds a bell button that turns on push notifications and shows the pairing
   code that ~/phone-apps/pair.py feeds to the GitHub Actions sender. */
(() => {
  const me = document.currentScript, APP = me.dataset.app, NAME = me.dataset.name, VAPID = me.dataset.vapid;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const pushable = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  let reg = null;
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(r => { reg = r; }).catch(() => {});

  const css = document.createElement('style');
  css.textContent = `
.pwa-bell{position:fixed;z-index:40;right:max(14px,env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));width:46px;height:46px;border-radius:50%;border:1px solid var(--pwa-line);background:var(--pwa-bg);color:var(--pwa-fg);display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.28)}
.pwa-bell svg{width:22px;height:22px}
.pwa-bell[data-on="1"]::after{content:"";position:absolute;top:9px;right:10px;width:9px;height:9px;border-radius:50%;background:var(--pwa-accent)}
body.reading .pwa-bell{display:none}
.pwa-sheet{position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}
.pwa-card{width:min(460px,100%);max-height:85vh;overflow:auto;background:var(--pwa-bg);color:var(--pwa-fg);border:1px solid var(--pwa-line);border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:12px;font:15px/1.5 system-ui,-apple-system,sans-serif}
.pwa-card h2{margin:0;font-size:20px;line-height:1.2}
.pwa-card p,.pwa-card ol{margin:0}
.pwa-card ol{padding-left:1.2em}
.pwa-card textarea{width:100%;min-height:96px;font:12px/1.4 ui-monospace,monospace;color:var(--pwa-fg);background:transparent;border:1px solid var(--pwa-line);border-radius:8px;padding:8px;word-break:break-all;resize:none}
.pwa-row{display:flex;flex-wrap:wrap;gap:8px}
.pwa-card button,.pwa-card a.pwa-btn{font:600 14px system-ui,-apple-system,sans-serif;padding:10px 14px;border-radius:9px;border:1px solid var(--pwa-line);background:transparent;color:var(--pwa-fg);cursor:pointer;text-decoration:none}
.pwa-card .pwa-go{background:var(--pwa-accent);border-color:var(--pwa-accent);color:var(--pwa-on-accent)}
.pwa-muted{opacity:.75;font-size:13.5px}`;
  document.head.append(css);

  const bell = document.createElement('button');
  bell.className = 'pwa-bell'; bell.type = 'button'; bell.setAttribute('aria-label', 'Notifications');
  bell.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';
  document.body.append(bell);

  const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const key = s => { const p = '='.repeat((4 - s.length % 4) % 4), raw = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(raw, c => c.charCodeAt(0)); };
  /* Launch Plan reminders count days from the plan's start date, so the code carries it */
  const extra = () => { if (APP !== 'launch-plan') return {}; try { return { start: JSON.parse(localStorage.getItem('launchplan:settings') || '{}').main?.start || null }; } catch { return {}; } };
  const codeFor = sub => 'PUSH1:' + b64(new TextEncoder().encode(JSON.stringify({ app: APP, sub: sub.toJSON(), ...extra() })));
  const current = async () => { const r = reg || await navigator.serviceWorker.ready; return r.pushManager.getSubscription(); };
  (async () => { try { if (pushable && Notification.permission === 'granted' && await current()) bell.dataset.on = '1'; } catch {} })();

  function sheet(html) {
    const s = document.createElement('div');
    s.className = 'pwa-sheet';
    s.innerHTML = `<div class="pwa-card" role="dialog" aria-modal="true" aria-label="Notifications">${html}<button type="button" data-x>Close</button></div>`;
    s.addEventListener('click', e => { if (e.target === s || e.target.closest('[data-x]')) s.remove(); });
    document.body.append(s);
    return s;
  }
  function showCode(sub) {
    const code = codeFor(sub);
    const s = sheet(`<h2>Notifications are on</h2>
      <p>One last step: get this pairing code to Claude so it can send to this phone. Copy it, then paste it into Claude Code, or email it to yourself and tell Claude to look for it.</p>
      <textarea readonly id="pwa-code">${code}</textarea>
      <div class="pwa-row"><button type="button" class="pwa-go" data-copy>Copy code</button>
        <a class="pwa-btn" href="mailto:?subject=${encodeURIComponent(NAME + ' push code')}&body=${encodeURIComponent(code)}">Email it</a>
        <button type="button" data-test>Test on this phone</button></div>
      <p class="pwa-muted">${APP === 'launch-plan' ? 'You get a reminder every morning at 9am Eastern during your 90 days. If you change your start date, send a new code.' : 'You get a notification each time a new report is filed.'}</p>
      <button type="button" data-off>Turn notifications off</button>`);
    s.querySelector('[data-copy]').onclick = async e => {
      const ta = s.querySelector('#pwa-code');
      try { await navigator.clipboard.writeText(code); e.target.textContent = 'Copied'; } catch { ta.select(); e.target.textContent = 'Selected, press Copy'; }
    };
    s.querySelector('[data-test]').onclick = async () => { const r = reg || await navigator.serviceWorker.ready; r.showNotification(NAME, { body: 'Notifications work on this phone.', icon: 'icon-192.png' }); };
    s.querySelector('[data-off]').onclick = async () => { try { await sub.unsubscribe(); } catch {} delete bell.dataset.on; s.remove(); };
  }
  async function turnOn(btn) {
    btn.disabled = true; btn.textContent = 'Asking…';
    try {
      if (await Notification.requestPermission() !== 'granted') throw new Error('denied');
      const r = reg || await navigator.serviceWorker.ready;
      const sub = await r.pushManager.getSubscription() || await r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key(VAPID) });
      bell.dataset.on = '1'; btn.closest('.pwa-sheet').remove(); showCode(sub);
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Turn on notifications';
      btn.insertAdjacentHTML('afterend', `<p class="pwa-muted">${e.message === 'denied' ? 'Notifications are blocked. Turn them on in Settings › Notifications › ' + NAME + ', then try again.' : 'That did not work: ' + String(e.message || e)}</p>`);
    }
  }
  bell.onclick = async () => {
    if (ios && !standalone) return sheet(`<h2>Add ${NAME} to your Home Screen</h2>
      <p>iPhone only sends notifications to apps on the Home Screen.</p>
      <ol><li>Tap the Share button in Safari.</li><li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li><li>Open ${NAME} from your Home Screen and tap this bell again.</li></ol>`);
    if (!pushable) return sheet(`<h2>Notifications aren't available here</h2><p>This browser can't receive push notifications. On iPhone, use iOS 16.4 or newer and open the app from the Home Screen.</p>`);
    try { const sub = await current(); if (sub && Notification.permission === 'granted') return showCode(sub); } catch {}
    const s = sheet(`<h2>Get notified</h2><p>${APP === 'launch-plan' ? 'A morning reminder with your day number and next milestone.' : 'A notification on this phone each time a new report lands in the paper.'}</p>
      <button type="button" class="pwa-go" data-on>Turn on notifications</button>`);
    s.querySelector('[data-on]').onclick = e => turnOn(e.currentTarget);
  };
})();
