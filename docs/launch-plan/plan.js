
/* ================= PLAN DATA (v3: test week first, Oct 31 2026) =================
   v3 change: apps "good enough" by Sun Nov 1, 5 test videos Mon Nov 2 - Fri Nov 6, niche verdict Sat Nov 7,
   buy-a-channel gate on Checkpoint 1 (Nov 29). Coach's reasoning is in the Newspaper.
   Goal 1: $5,000/month by Mon Dec 21, 2026 (start of Christmas break, day 55).
   Goal 2: $10,000/month by the last day of the plan (day 364).
   Time budget: weekdays up to 45 min, Saturdays + Sundays 2–3 h each (~9 h a week).
   The sprint (Oct 28 – Dec 23) is written day by day in calendar order.
   t = short label, d = goal of the day, w = done when, m = minutes, ms = milestone */
const SPRINT_WD = [
/* Wed Oct 28 – Fri Oct 30 */
 {phase:'Foundation', t:'Give Claude the 7-fix prompt', m:15, d:'Your Second Brain is the research engine for the whole channel, so it has to be right first. Open the NotebookLM answer called "Prompt for Claude" in your Briefings notebook, copy it, and paste it into Claude to apply fixes 1–7 (typical vs upside profit, monetized status, video length, no duplicate saves, What If titles, script length, channel name).', w:'Claude confirms all 7 fixes are applied and the Second Brain reloads without errors.'},
 {phase:'Foundation', t:'Test all 7 Second Brain fixes', m:45, d:"One sitting for every fix. (1–4) Run Competitor Analysis on Alternate You: you should see a Typical (median) AND Upside (average) estimate, a “Monetized?” line and an Average Video Length box; click Validate once in the Niche Validator and make sure only ONE record saves. (5–7) “What If You Aged 1 Year Every Day?” should score above the old 5/10 in the Title Validator; a 2-minute script with the length box at 10 min should get a warning; typing a channel by hand should fill the Channel Name box.", w:'All 7 fixes work, or what broke is written in today’s notes for Claude.'},
 {phase:'Foundation', t:'Test Thumbnail Validator + vidIQ link fill', m:40, d:"Upload a MagnatesMedia downfall thumbnail (1M+ views) and a weak one from a small channel; the big one should score clearly higher. Then test your data bridge: if Claude Code finished the vidIQ “paste a link, fill everything” feature, paste one finance channel link and check every field fills. If not, run yt-pull.py once and paste the YT1: code instead. You need fast, real data for this weekend’s niche test.", w:'Thumbnail scores make sense and one channel’s data fills automatically.'},
/* Mon Nov 2 – Fri Nov 6 */
 {phase:'Test Week', t:'Test videos #1 and #2 go live', m:45, ms:'Test week starts', d:"Publish test videos #1 and #2 in YouTube Studio (title, thumbnail, description, captions, end screen). You planned all 5 today. Better: 2 today, then 1 a day. Each video then gets its own first-day push, and you can fix packaging on #3–#5 from what #1–#2 show you. All 5 must be the SAME sub-niche and the SAME format, or the test tells you nothing. Answer the “altered or synthetic content” question honestly.", w:'Two videos public; #3 is ready for tomorrow.'},
 {phase:'Test Week', t:'Test video #3 + read the first 24 hours', m:40, d:"Publish #3. Then open Studio for #1 and #2 and write down 3 numbers each: impressions, click-through rate (CTR = clicks ÷ impressions) and views. Judge CTR in the first 1–2 days; it falls as a video spreads. Normal CTR is 2–10%.", w:'#3 public; impressions, CTR and views for #1–#2 in notes.'},
 {phase:'Test Week', t:'Test video #4 + fix weak packaging', m:40, d:"Publish #4. If #1 or #2 got 100+ impressions but CTR is under 3%, swap in a new thumbnail or title today. If a video is stuck under ~100 impressions, don't re-upload it anywhere: the fix is the title, thumbnail or topic. Order of importance: niche > topic > title > thumbnail.", w:'#4 public; any weak thumbnail or title swapped.'},
 {phase:'Test Week', t:'Test video #5 goes live', m:40, d:"Publish #5, the last test video. Before you hit publish, put your 5 videos side by side. If they look like one template with a swapped noun, YouTube's “inauthentic content” rule can block monetization later. Each one needs its own research and angle.", w:'All 5 test videos public.'},
 {phase:'Test Week', t:'Log the test-week numbers', m:30, d:"For every test video, log views, impressions, CTR and average percentage viewed (aim 40%+). Add them up in the “Log your real numbers” box. Tomorrow you judge the niche with these numbers, not with feelings.", w:'All 5 videos’ numbers logged.'},
/* Mon Nov 9 – Fri Nov 13 */
 {phase:'Build the Machine', t:'Approve research + script #1', m:45, d:"Read research #1 (one clear decision? real sources? anything made up?), then read script #1 out loud once. You’re listening for boring stretches and generic AI filler. Approving research and scripts is the job you keep forever.", w:'Research and script #1 approved, or fixes noted for Claude.'},
 {phase:'Build the Machine', t:'Voiceover #1 + visual style sheet', m:35, d:"Have Claude Code generate audio/video1.mp3 with your channel voice and listen to the first 2 minutes. Then approve visuals/STYLE.md: 2 brand colors, font, how charts and maps look, and when to use stock footage vs motion graphics.", w:'Voice file sounds clean; STYLE.md approved.'},
 {phase:'Build the Machine', t:'Have Claude build the chart & map maker', m:45, d:"Ask Claude Code for a script that turns numbers from the research (stock price, revenue, store count) into animated chart clips in your colors. These clips are what make you look different from slideshow channels, and originality is what keeps you monetizable.", w:'One animated chart renders to an .mp4.'},
 {phase:'Build the Machine', t:'Shot list + 60-second test render', m:40, d:"Claude matches every script line to a visual (stock clip, chart, map, text card) in visuals/video1-shots.md. Skim it, then have it render just the first 60 seconds. Watch it on your phone: does the cold open grab you in 10 seconds?", w:'Shot list approved; test render watched and notes given.'},
 {phase:'Build the Machine', t:'Description template + research #2 and #3', m:40, d:"Have Claude write a reusable description: 2 hook lines, chapters, sources, “not financial advice”, and an affiliate section with a disclosure line (“Some links are affiliate links; I may earn a commission.” The law requires it). Then have the research skill run stories #2 and #3 so they’re ready right after launch. Working one video ahead is how you hit 4 a week later.", w:'Template saved; research #2 and #3 waiting for you.'},
/* Mon Nov 16 – Fri Nov 20 */
 {phase:'Launch Sprint', t:'Approve scripts #2 and #3', m:40, d:"Check only the hook (first 3 lines), the pivotal decision, and anything Claude flagged as “needs a source”.", w:'Both approved.'},
 {phase:'Launch Sprint', t:'Apply to 2 affiliate programs', m:40, d:"Affiliates are the only money you can earn before YouTube’s Partner Program, so start now. Pick 1–2 that approve new creators (a business tool, or an investing/stock-research app with a creator program; read their rules on finance promotions). Skip Amazon Associates for now: it closes accounts without 3 sales in 180 days. Links are only clickable after advanced features are unlocked (Nov 1 task).", w:'1–2 applications sent.'},
 {phase:'Launch Sprint', t:'Approve packaging + publish video #2', m:30, d:"Pick from Claude’s 3 thumbnails and 5 titles (Title Validator 8/10+ only). The robot uploaded it as Private; open YouTube Studio, add the end screen, and switch it to Public.", w:'Video #2 public.'},
 {phase:'Launch Sprint', t:'Read video #1’s first numbers', m:30, d:"In Studio look at 3 things: click-through rate (CTR, aim 4%+), average view duration (aim 40%+), and where viewers drop. If CTR is under 3% after 48 hours, swap in your second-best thumbnail today. On a 7-week deadline you can’t wait a week to fix packaging.", w:'3 numbers in notes; thumbnail swapped if CTR < 3%.'},
 {phase:'Launch Sprint', t:'Publish video #3 + approve Shorts', m:30, d:"Publish #3 the same way. Approve Claude’s 3 Shorts per video (30–50 s, captions, a line pointing to the full video). Shorts views don’t count toward watch hours; their job is sending viewers to your long videos.", w:'Video #3 public; 6+ Shorts scheduled.'},
/* Mon Nov 23 – Fri Nov 27 (Thanksgiving week) */
 {phase:'Launch Sprint', t:'Approve 3 topics from the inbox', m:30, d:"From this week: 3 long videos a week. The pipeline proposes stories; approve 3 from the top of your ranked bank (stories similar to your best performer first).", w:'3 topics approved.'},
 {phase:'Launch Sprint', t:'Approve 3 scripts', m:45, d:"Hook, pivotal decision, flagged facts. Set a 15-minute timer per script so this stays inside your 45 minutes.", w:'3 scripts approved.'},
 {phase:'Launch Sprint', t:'Approve packaging + publish/schedule', m:30, d:"Pick titles and thumbnails, then publish one and schedule the other two for your fixed upload days. Spread uploads out.", w:'This week’s videos public or scheduled.'},
 {phase:'Launch Sprint', t:'Thanksgiving: light day', m:15, d:"Just reply to comments. Early comments tell you what viewers want next; add good requests to the topic bank. Enjoy the day.", w:'All comments answered.'},
 {phase:'Launch Sprint', t:'Originality checklist + week numbers', m:40, d:"YouTube demonetizes “generic or repetitive” channels and judges the whole channel. With Claude, write 5 checks every script must pass (new research, a unique angle, a real lesson, varied structure, no recycled lines) and add them to CLAUDE.md. Then log this week’s views, subs and watch hours below.", w:'Checklist in CLAUDE.md; numbers logged.'},
/* Mon Nov 30 – Fri Dec 4 */
 {phase:'Push to $5k', t:'Approve 4 topics: double down on your winner', m:30, d:"From now until Christmas: 4 long videos a week. Look at your best video so far and pick at least 2 topics that are close cousins of it (same type of company, same kind of mistake). Winners tell you what the algorithm will push.", w:'4 topics approved, 2+ tied to your best video.'},
 {phase:'Push to $5k', t:'Approve 4 scripts', m:45, d:"10 minutes each: hook, decision, flags, originality checklist. Trust the system for the rest.", w:'4 scripts approved.'},
 {phase:'Push to $5k', t:'Publish + playlists and end screens', m:35, d:"Publish/schedule the week. Have the upload step file every video into a playlist automatically (e.g., “Biggest Business Failures”). End screens can’t be set by the API: in Studio use “Import from video” to copy your standard end screen. Both add watch time for free.", w:'Videos scheduled; playlists automatic; end screens on.'},
 {phase:'Push to $5k', t:'Set up AdSense now', m:30, d:"Ad money is ~80% of the $5k, and it can’t start without AdSense. Create ONE AdSense for YouTube account (duplicates stall applications), make sure your name and address match your ID, and add tax info. Doing this before you’re eligible removes the most common delay.", w:'AdSense account ready and linked.'},
 {phase:'Push to $5k', t:'Partner Program eligibility check', m:20, d:"Studio > Earn shows how close you are to 1,000 subs + 4,000 long-form watch hours. Log both numbers. Have Claude estimate the date you’ll cross both at your current pace. Applying before Feb 1, 2027 lets you use the 4,000-hour rule (it doubles to 8,000 after that).", w:'Numbers logged and an estimated eligibility date in notes.'},
/* Mon Dec 7 – Fri Dec 11 */
 {phase:'Push to $5k', t:'Approve 4 topics (incl. a timely one)', m:30, d:"If a company is in the news this week (layoffs, bankruptcy, a crash), make one of the 4 a fast “breaking story” video. Timely stories are the most likely way a new channel gets a sudden spike before Dec 21.", w:'4 topics approved.'},
 {phase:'Push to $5k', t:'Approve 4 scripts', m:45, d:"Same 4 checks. For the breaking story, be extra strict on facts: every claim needs a source.", w:'4 scripts approved.'},
 {phase:'Push to $5k', t:'Publish + approve the Shorts batch', m:30, d:"Publish/schedule the week and approve the day’s Shorts from the automatic cutter.", w:'Week scheduled; Shorts approved.'},
 {phase:'Push to $5k', t:'Apply to YPP if you qualify', m:30, ms:'YPP check', d:"If Studio > Earn shows 1,000 subs + 4,000 watch hours, apply today. Review takes about a month, so this is the last realistic day to apply and still have a shot at ad money by Dec 21. Not there yet? Write the gap (subs and hours) and keep going: the next deadline is Feb 1.", w:'Applied, or the exact gap written down.'},
 {phase:'Push to $5k', t:'Fix your weakest thumbnail', m:30, d:"Find the video with the lowest CTR and approve a new thumbnail for it. Log this week’s numbers vs the pace target below.", w:'One thumbnail replaced; pace note saved.'},
/* Mon Dec 14 – Fri Dec 18 */
 {phase:'Push to $5k', t:'Approve 4 topics', m:30, d:"Prefer stories similar to your top 2 videos. Add one seasonal topic (e.g., a famous holiday retail failure) for the Christmas week.", w:'4 topics approved.'},
 {phase:'Push to $5k', t:'Approve 4 scripts', m:45, d:"Hook, decision, flags, originality, and your new retention rules.", w:'4 scripts approved.'},
 {phase:'Push to $5k', t:'Publish + Shorts', m:30, d:"Publish/schedule and approve Shorts.", w:'Done.'},
 {phase:'Push to $5k', t:'Sponsor-ready email + mini media kit', m:40, d:"Create a business email for the channel, add it to the About page, and have Claude make a one-page media kit (topics, views, audience). Sponsors are part of the $10k mix later; be findable now.", w:'Email on About page; media kit saved.'},
 {phase:'Push to $5k', t:'Check the holiday buffer', m:30, d:"Make sure at least 2 weeks of videos are approved and scheduled through New Year so the channel keeps posting even if you take time off.", w:'Videos scheduled through Jan 3.'},
/* Tue Dec 22 – Wed Dec 23 (Dec 21 is pinned) */
 {phase:'Monetize', t:'Plan your Christmas-break push', m:30, d:"If the break gives you extra time, use it for the things that compound: a 1-hour compilation, remaking your 3 weakest thumbnails, and getting 2 extra videos ahead. Write down how many extra hours you really have and pick ONE of those.", w:'Break plan written (even if it’s “rest”).'},
 {phase:'Monetize', t:'Approve topics for after Christmas', m:20, d:"Approve next week’s topics so the pipeline can work over the holiday.", w:'Topics approved.'},
];
const SPRINT_WE = [
 /* Sat Oct 31 */ {phase:'Foundation', t:'Apps good enough + pick the test niche', m:180, ms:'Test niche picked', d:"Part 1 (1 h): “finished” means you can make ONE video start to finish in the Workstation. Make a list of what blocks that and fix only those; polish waits. Ask the coach for a health check. Part 2 (2 h): pick ONE sub-niche and ONE format for all 5 test videos. Mimic-channel check: a channel whose growth happened in the last ~6 months, still getting 50K+ views on recent uploads. Then pick 5 topics from outlier videos (3x+ their channel's usual views) and run the uniqueness check: search your exact title; if 5 channels already made it, change the angle. Plan with a $2–5 RPM, not $10–30.", w:'Blocker list fixed; one sub-niche, one format and 5 checked topics written in notes.'},
 /* Sun Nov 1 */ {phase:'Foundation', t:'Create the channel + make test videos #1–#2', m:180, ms:'Channel created', d:"Part 1 (1 h): brainstorm names with Claude (not a real company’s brand). Use your own Google account (or a Brand Account you own) and turn on 2-Step Verification. Create the channel. In Studio > Settings > Channel > Feature eligibility, verify your phone (custom thumbnails) and request advanced features. Part 2 (2 h): make test videos #1 and #2 in the Workstation, with titles and thumbnails. Get #3 started if there's time.", w:'Channel exists with 2FA and phone verified; videos #1 and #2 are ready to post.'},
 /* Sat Nov 7 */ {phase:'Test Week', t:'Niche verdict: is this a $100-a-week niche?', m:150, ms:'Niche verdict', d:"$100 a week ≈ 25,000 views a week at a $4 RPM (50,000 at $2). You can't measure dollars yet: ad money is $0 until the Partner Program. So judge views. PASS: one video passes ~5,000 views in its first week, or the channel is climbing every day. Keep the niche and make more of the winner. MAYBE: videos at 500–5,000. Change the topic angle or packaging and run 3–5 more. FAIL: all 5 under ~500 views after 100+ impressions each. Swap the sub-niche, keep the broad niche and the format. These cut-offs are coach rules of thumb, not YouTube rules.", w:'PASS, MAYBE or FAIL written in notes, with the next 5 topics.'},
 /* Sun Nov 8 */ {phase:'Build the Machine', t:'Style bible from your test winners', m:180, d:"Have Claude write CLAUDE.md, the brain of your automation: your promise, the format your best test video used (title pattern, thumbnail style, structure, length), banned phrases, and the rule that every claim needs a source. Copy what worked in the test, not what you guessed before it. Then queue the next 3 videos in the winning format.", w:'CLAUDE.md saved; 3 next topics queued in the winning format.'},
 /* Sat Nov 14 */ {phase:'Build the Machine', t:'Render the next video start to finish', m:180, d:"Run the whole Workstation flow on your next video in the winning format: voice, shots, light music (YouTube Audio Library is free and safe), 1080p export, captions. Write 10 titles and keep one that scores 8/10+. Make 3 thumbnails. Watch it like a stranger and fact-check every number.", w:'Video plays cleanly; title, thumbnail and captions ready; facts checked.'},
 /* Sun Nov 15 */ {phase:'Launch Sprint', t:'Publish + set up the upload API', m:180, ms:'Upload API live', d:"First (30 min): publish this week's video with title, thumbnail, description, captions and end screen, and have Claude cut 3 Shorts. Then (2 h): with Claude Code create a Google Cloud project, enable YouTube Data API v3 and OAuth, and make Claude ALWAYS upload as Private with title, description, captions, thumbnail and playlist set. You press publish; that click keeps a human in charge.", w:'Video public; a test upload lands as Private with everything filled.'},
 /* Sat Nov 21 */ {phase:'Launch Sprint', t:'Approval Inbox + one-command pipeline', m:180, ms:'Approval Inbox live', d:"Ask Claude to build one page (like this Launch Plan) where each video is a card: Topic → Research → Script → Title/Thumbnail → Ready, each with Approve / Fix buttons. Then have Claude Code chain everything (research → script → voice → visuals → render → captions → thumbnail → private upload), stopping at each approval gate. Run it for video #4.", w:'Video #4 goes from topic to private upload while you only approved.'},
 /* Sun Nov 22 */ {phase:'Launch Sprint', t:'Put the pipeline on a schedule', m:150, ms:'Pipeline on autopilot', d:"Have Claude schedule it: Monday topics + research, Tuesday scripts, Wednesday render + private upload, with a notification when something needs you. Run it on an always-on machine (the Mac mini if it’s set up; otherwise one command each morning on the Chromebook). Add a “no repeats” memory (topics/published.md) and a Sunday report: views, watch hours toward 4,000, subs toward 1,000, CTR, retention, and today’s pace target.", w:'A scheduled run creates a draft on its own; the first report arrives.'},
 /* Sat Nov 28 */ {phase:'Launch Sprint', t:'Automatic Shorts + comment replies', m:180, d:"Have Claude add two steps. Shorts cutter: after each long video, find the 3 strongest moments and make 9:16 Shorts with big captions, uploaded as Private for your approval; aim for 1–2 Shorts a day. Comment assistant: draft short, friendly replies (no financial advice) into the inbox for one-tap approval.", w:'Shorts and reply drafts show up in your inbox automatically.'},
 /* Sun Nov 29 */ {phase:'Launch Sprint', t:'Checkpoint 1: is anything taking off?', m:150, ms:'Checkpoint 1', d:"Day 33 with hard numbers. To stay on the Dec 21 pace you need about ~60,000 views in the last 30 days, ~600 subs and ~2,000 watch hours, plus at least one video clearly beating the others. If one video is pulling ahead, copy what it did (topic type, title pattern, thumbnail style) into CLAUDE.md and STYLE.md. If nothing is above 1,000 views, rework titles/thumbnails first and re-check the niche with the Validator. Then the buy-a-channel gate (see “Buy a channel?” on the money tab): if this channel is near 1,000 subs and 4,000 hours, buying makes no sense. Keep building. Be honest in your notes: this tells you how realistic Dec 21 is.", w:'A written decision: double down on X, fix packaging, or re-check the niche. Buy-a-channel gate answered.'},
 /* Sat Dec 5 */ {phase:'Push to $5k', t:'Your first long compilation', m:180, ms:'First compilation', d:"Have Claude stitch your best related videos into a 45–60 minute compilation (“1 Hour of Business Collapses” style) with a strong new title and thumbnail. Long videos stack watch hours toward 4,000 faster than anything else. Also have Claude cut a 60-second channel trailer for non-subscribers and arrange the home page into playlist rows.", w:'Compilation scheduled; trailer and home page live.'},
 /* Sun Dec 6 */ {phase:'Push to $5k', t:'Build the “breaking story” fast lane', m:150, d:"When a company makes big news, the pipeline should make a fact-checked video within 48 hours. Have Claude add a daily news check that drops candidate stories into your inbox. Also have it post a first comment on each new video (a question + your best affiliate link); you pin it in Studio when you publish (the API can’t pin).", w:'News candidates arrive in the inbox; first comments post automatically.'},
 /* Sat Dec 12 */ {phase:'Push to $5k', t:'Retention + thumbnail rules from real data', m:180, d:"Open the retention graph of your top 3 videos. Have Claude match each drop to the line that caused it and write 5 retention rules into CLAUDE.md (e.g., intro under 20 seconds, a mini-cliffhanger every 90 seconds). Then pull CTR for every video and have Claude write 5 thumbnail rules into STYLE.md from your best vs worst.", w:'5 retention rules + 5 thumbnail rules saved.'},
 /* Sun Dec 13 */ {phase:'Push to $5k', t:'Make one flagship video', m:150, d:"Pick the most-searched story in your niche and approve extra research for a 20+ minute flagship. Longer videos fit more mid-roll ads (8+ min needed) and flagships often become a channel’s main traffic source.", w:'Flagship script approved and rendering.'},
 /* Sat Dec 19 */ {phase:'Push to $5k', t:'Batch the holiday buffer', m:180, d:"Approve 6–8 videos in one sitting so the channel posts through Christmas and New Year even if you approve nothing for 2 weeks. Include your seasonal topic and one more compilation. Time yourself: this is the end-state routine.", w:'Uploads scheduled through about Jan 3.'},
 /* Sun Dec 20 */ {phase:'Push to $5k', t:'Sprint review: the honest Dec 21 numbers', m:120, d:"Log your real numbers below: income rate, views in the last 30 days, subs, watch hours, YPP status. Then have Claude compare them with the pace and calculate, from YOUR growth rate, the realistic date you’ll hit $5k and $10k. Whatever the answer, you’ll have a working machine and a channel that’s growing; that’s what the $10k goal is built on.", w:'Real numbers logged and a new realistic date for $5k in notes.'},
];

/* Tasks pinned to a calendar date (they don't move if you change the start date) */
const PINNED = {
 '2026-12-21': {phase:'Push to $5k', t:'Christmas break: the $5k check-in 🎄', m:30, ms:'$5k deadline', d:"Your deadline day. Open Studio > Analytics and look at the last 28 days of estimated revenue plus affiliate earnings. Hit $5k? Write down exactly what worked. Not yet? That’s the expected result for a 7-week-old channel, not a failure: use yesterday’s review to set the new date, and keep the machine running. The next real deadline is applying to YPP before Feb 1.", w:'Income logged below and the next target date written in notes.'},
 '2027-01-29': {phase:'Monetize', t:'Last call: apply to YPP before Feb 1', m:30, ms:'YPP before Feb 1', d:"From Feb 1, 2027 new applicants need 8,000 watch hours instead of 4,000 (subs stay at 1,000). If you have 1,000 subs + 4,000 public long-form hours and haven’t applied, apply today in Studio > Earn. Already applied or accepted? Just confirm it in notes.", w:'Applied, accepted, or the gap to 8,000 hours written down.'},
};

/* ---------- Weeks 9–52: operating rhythm + one Wednesday upgrade + one Sunday project ---------- */
const WED_UPGRADES = [
 ['Check voice credits for 4 videos a week', 'Four 10–12 minute videos a week is ~3–4 hours of audio a month. Check your voice plan has room (Flash/Turbo voices or the next plan up) so the pipeline never stalls.'],
 ['Ask Claude to log every API error', 'Have the pipeline write errors to a log and send you a short alert. Silent failures are the #1 way automated channels stop uploading.'],
 ['Add a backup voice / render plan', 'If the voice API or a stock site is down, the pipeline should retry, then use a backup. Ask Claude to add it.'],
 ['Pin your best video on the channel', 'Feature your highest-retention video on the home page for new visitors.'],
 ['Update the topic bank from comments', 'Have Claude pull topic requests from comments into the topic bank, marked “viewer request”.'],
 ['Refresh a weak old thumbnail', 'Pick the old video with the lowest CTR and approve a new thumbnail for it. Old videos can come back to life.'],
 ['Clean up the Approval Inbox', 'Clear anything stuck. Ask Claude why it got stuck and fix that step.'],
 ['Check copyright claims', 'Studio > Content > Restrictions. Any claim? Have Claude replace the clip and add that source to a “never use” list.'],
 ['Add chapters to older videos', 'Have Claude write chapters for any older video missing them. Chapters help search and retention.'],
 ['Write a better hook formula', 'Have Claude compare the first 15 seconds of your best and worst videos and update the hook rule in CLAUDE.md.'],
 ['Approve a community post', 'Have Claude draft a community poll (“Which collapse should I cover next?”). Polls double as topic research.'],
 ['Check your RPM by video', 'Studio > Analytics > Revenue. Which topics pay the highest RPM? Tell Claude to favor them.'],
 ['Rotate the best affiliate link', 'Look at affiliate clicks per video and have Claude put the best-converting link first everywhere.'],
 ['Test a longer video length', 'Ask the pipeline to make the next video 14–16 minutes if the story is strong. Longer videos fit more mid-roll ads.'],
 ['Approve a playlist cleanup', 'Have Claude regroup playlists by what viewers binge (check “viewers also watch”).'],
 ['Review your cost per video', 'Total monthly costs ÷ videos published. Keep it under about $15 per video.'],
 ['Add a recurring series name', 'Give your best format a series name (e.g., “Billion-Dollar Mistakes #12”). Series raise binge-watching.'],
 ['Turn on Test & Compare', 'Once you’re in the Partner Program, Studio lets you test up to 3 thumbnails (or titles) per video and keeps the winner. Have the pipeline always prepare 3 thumbnails and turn testing on for every upload.'],
 ['Approve Shorts for your top video', 'Have Claude cut 3 extra Shorts from your best-ever video. Winners deserve more doors in.'],
 ['Check the Generic/Repetitive risk', 'Have Claude compare your last 10 scripts for repeated sentences or structures and flag anything templated.'],
 ['Update the description template', 'Add your newest affiliate or sponsor slot to the description template.'],
 ['Check search terms viewers use', 'Studio > Analytics > Research tab. Feed the top searches to the topic picker.'],
 ['Approve a re-upload of a Short', 'Have Claude re-edit your best Short with a new hook and post it as a new Short.'],
 ['Back up the whole project', 'Have Claude push the project to a private GitHub repo or Google Drive. Protect your machine.'],
 ['Update old end screens in Studio', 'Point the end screens on older videos to your current best video (a few clicks per video; the API can’t do this).'],
 ['Refresh first comments on top videos', 'Have Claude post an updated first comment with your best affiliate link on your top 10 videos, then pin them in Studio.'],
 ['Check subscriber conversion', 'Which video gained the most subs per 1,000 views? Tell the topic picker.'],
 ['Approve the monthly cost report', 'Read Claude’s cost vs income summary and cut any tool you don’t need.'],
 ['Test a new thumbnail style', 'Ask for one thumbnail in a totally new style and test it against your usual one.'],
 ['Approve 5 evergreen topics', 'Pick 5 stories people will still search for in 5 years (Enron, Blockbuster…). Evergreen videos earn forever.'],
 ['Check Shorts → long-form flow', 'In Analytics, see how many viewers your Shorts send to long videos. Tell Claude which Short hooks worked.'],
 ['Update the sponsor media kit numbers', 'Have Claude refresh your media kit with this month’s views, subs and audience data.'],
 ['Reply to sponsor emails (approve drafts)', 'Have Claude draft replies to brand emails. Never accept a deal without reading it yourself.'],
 ['Approve next month’s content calendar', 'Have Claude lay out next month’s ~17 videos and approve the list in one go.'],
 ['Check your top traffic sources', 'Browse vs Search vs Suggested. Tell Claude to optimize titles for whichever is growing.'],
 ['Approve a “best of” compilation', 'Have Claude stitch a 40–60 min compilation of related stories. Long compilations rack up watch time and ads.'],
 ['Review the error log', 'Ask Claude to summarize this month’s pipeline errors and fix the most common one.'],
 ['Check email-list growth', 'How many viewers joined your list this month? Have Claude improve the call-to-action in the best-performing video.'],
 ['Approve a viewer-request video', 'Pick the most-requested story from comments and fast-track it. Viewers who get their request become regulars.'],
 ['Check Reels/TikTok reposts', 'Which reposted Shorts did best off YouTube? Tell Claude to make more of that hook.'],
 ['Plan for Q4 ad rates', 'Advertisers pay the most October–December. Make sure your strongest topics are scheduled for Q4.'],
 ['Approve a holiday/seasonal topic', 'Pick a story tied to an upcoming season and schedule it a week early.'],
 ['Raise your sponsor rate', 'With your current views, have Claude recalculate a fair sponsor price and update the media kit.'],
 ['Write next year’s note to yourself', 'What would you tell yourself on Day 1? Save it. You’re almost there.'],
];
const SUN_PROJECTS = [
 /*9*/  ['Christmas break: a second Shorts style', 'Have Claude create a second Shorts format (“one shocking business fact in 30 seconds”) made from your research files, posted daily. More Shorts = more viewers finding your long videos. Only if the break gives you time; otherwise rest.'],
 /*10*/ ['Month-2 review + reset the targets', 'Compare your numbers with the pace (target now: ~$5,300/mo, ~570,000 views/month). Have Claude list what’s working vs not, aim the topic picker at your best performers, and recalculate the realistic dates for $5k and $10k from your real growth.'],
 /*11*/ ['Build a fact-check robot', 'Add a second pass that checks every number in a script against the research sources and flags anything unsupported before you see it. Fewer mistakes = less for you to review.'],
 /*12*/ ['YPP: apply or calculate the gap', 'Need: 1,000 subs + 4,000 public long-form watch hours in the last 12 months (8,000 if you apply after Feb 1, 2027). Eligible? Apply in Studio > Earn. Rejected (usually “reused” or repetitive content)? Fix the pattern channel-wide and reapply after 30 days. Not there? Have Claude calculate exactly how many more videos you need.'],
 /*13*/ ['Make a 1-hour flagship compilation', 'Have Claude assemble a 60+ minute compilation of your best stories with a strong title. People play these in the background for hours: lots of watch time and ads.'],
 /*14*/ ['Upgrade the visuals one level', 'Pick one: animated maps, a recurring intro sting, or kinetic text for key numbers. Have Claude build it into the pipeline so every future video gets it.'],
 /*15*/ ['Automate the monthly income report', 'Ad income, affiliate income, sponsor income, costs, profit, and progress toward $5k and $10k, landing on the 1st of every month.'],
 /*16*/ ['Write your first sponsor pitch', 'Have Claude find 10 brands that sponsor channels like MagnatesMedia or Logically Answered (watch their sponsor segments) and draft a short pitch for each. You approve and send.'],
 /*17*/ ['Rebuild your 5 worst videos', 'Rewrite titles + thumbnails for the 5 lowest performers, and fully remake the one with the best story. Old videos are free inventory.'],
 /*18*/ ['Checkpoint 2: month-4 review', 'Pace: ~$6,200/mo and ~640,000 views/month. Under half? Have Claude find the gap (packaging, topics or frequency) before adding anything new. Close? Keep 4 videos a week and push sponsors.'],
 /*19*/ ['Add mid-roll ad placement', 'Have Claude mark natural mid-roll spots (after cliffhangers) in every 8+ minute video and add them to the upload step. Smart mid-rolls raise RPM without hurting retention.'],
 /*20*/ ['Build the “approval only” phone routine', 'Make the Approval Inbox work well on your phone: big approve buttons and one daily notification. Goal: approve everything in 10–15 minutes a day from anywhere.'],
 /*21*/ ['Redo the $10k math with real RPM', 'Look at your first full monetized month. Have Claude calculate your real RPM and redo the math: views needed = ($10,000 − affiliates − sponsors) ÷ RPM × 1,000. If that’s out of reach in 7 months, Claude gives you the honest new date and the fastest lever.'],
 /*22*/ ['Start a second topic lane', 'Add a second lane inside your niche (e.g., “rise” stories or AI business news). One video a week in the new lane for 4 weeks, then compare.'],
 /*23*/ ['Test auto-dubbing', 'If it’s available on your channel, turn on YouTube’s auto-dubbing for your best video. More languages = more views from the same work.'],
 /*24*/ ['Expand affiliates to 5 programs', 'Add 2–3 programs that match your best-earning topics. Have Claude place each link only where it fits naturally.'],
 /*25*/ ['Launch channel memberships (optional)', 'If eligible, set up 1 membership level with a small perk (early access + a members-only monthly bonus story). Small, but recurring.'],
 /*26*/ ['Checkpoint 3: month-6 review', 'Pace: ~$7,300/mo and ~740,000 views/month. Look at the money split (ads vs affiliates vs sponsors) and have Claude say which one is furthest behind the $10k mix.'],
 /*27*/ ['Build a “rewatch” playlist machine', 'Have Claude build binge playlists ordered by retention (best first) and auto-add every new video to the right one.'],
 /*28*/ ['Automate sponsor-read insertion', 'When you land a sponsor, Claude writes a 60-second read in your channel voice, inserts it after the cold open, and adds the link + disclosure. Tick “includes paid promotion” in Studio (required). You approve the read.'],
 /*29*/ ['Lock 1 recurring sponsor', 'Aim for one sponsor that books monthly. Have Claude draft a 3-video package offer. You approve and send.'],
 /*30*/ ['Stress-test at 5 videos a week', 'Have Claude run 5 videos in one week on the Mac mini and report time, cost and failures. You want room before the $10k push.'],
 /*31*/ ['Month-7 review', 'Pace: ~$7,800/mo. Have Claude list the 3 changes that would add the most income in the next 60 days.'],
 /*32*/ ['Refresh the brand', 'Have Claude propose a sharper banner, logo polish and trailer using your best-performing visuals. Approve the one you like.'],
 /*33*/ ['Land a second sponsor', 'The $10k mix needs about $1,000/mo from sponsors. Pitch 10 more brands with your updated media kit.'],
 /*34*/ ['Add a long deep-dive format', 'Test one 30–40 minute deep dive a month on your biggest story type. Fewer, longer videos can beat several short ones on watch time and ads.'],
 /*35*/ ['Month-8 review + sponsor follow-ups', 'Pace: ~$8,300/mo, ~820,000 views/month. Follow up on every sponsor pitch (approve Claude’s drafts).'],
 /*36*/ ['Start an email list', 'Have Claude make a free one-page “business lessons” guide and a simple sign-up page linked in every description. An email list is an audience YouTube can’t take away, and newsletters can carry sponsors too.'],
 /*37*/ ['Approve 10 evergreen topics', 'Stories people will still search in 5 years earn every month. Have Claude rank 10 and schedule them over the next 2 months.'],
 /*38*/ ['Checkpoint 4: month-9 money check', 'Pace: ~$8,800/mo. Redo the $10k math with your real RPM and real growth rate. If the answer is past month 12, Claude tells you the honest finish date and what would close the gap fastest.'],
 /*39*/ ['Write the channel’s operating manual', 'Have Claude write RUNBOOK.md: how everything works, what to do when something breaks, all accounts and costs.'],
 /*40*/ ['Repost Shorts to Reels and TikTok', 'Have Claude repost your best Shorts to Instagram Reels and TikTok with a line pointing to the YouTube channel. Same work, more reach.'],
 /*41*/ ['Month-10 review: lock the money mix', 'Target ~$9,200/mo. Split: ads ~$8,000, affiliates ~$1,500, sponsors ~$750. Have Claude say which to push for the last 2 months.'],
 /*42*/ ['Raise sponsor rates', 'Update the media kit with your current views and have Claude draft a rate increase for renewing sponsors. You approve and send.'],
 /*43*/ ['Plan Q4 (highest ad rates)', 'Advertisers pay the most October–December. Have Claude schedule your strongest, highest-RPM topics for October and pre-make a buffer.'],
 /*44*/ ['Final cost & profit audit', 'Have Claude calculate your true monthly profit (income − every cost) and cut anything that doesn’t pay for itself.'],
 /*45*/ ['Month-11 review', 'Target ~$9,600/mo. Have Claude list the 3 changes that would close the gap to $10k fastest.'],
 /*46*/ ['Batch a Q4 buffer', 'Have the pipeline pre-make 6 videos so the channel keeps posting through the busy season even if you approve nothing for 2 weeks.'],
 /*47*/ ['Plan year 2', 'With Claude: keep this channel growing on approvals only, and decide whether to clone the system for a second channel.'],
 /*48*/ ['Set the autopilot rules for year 2', 'Write what Claude does without asking (e.g., reply drafts auto-post after 24 h) vs what stays human-approved (scripts, sponsors, money, facts).'],
 /*49*/ ['Year-in-review page', 'Have Claude make a one-page year-in-review with your numbers: where you started vs where you are.'],
 /*50*/ ['Final push: double the winning format', 'Make next month’s calendar 70% your best-performing format. Ride what works into the finish.'],
 /*51*/ ['Pre-final check vs $10k', 'Compare this month’s income with $10,000 and have Claude list what to change in the last week, if anything.'],
 /*52*/ ['$10,000/month check-in 🏁', 'Final day. Compare your monthly income with $10,000. Hit it? You built a channel that runs on approvals. Not yet? Have Claude extend the plan by the exact number of weeks needed at your current growth rate.'],
];
const SUN_MS = {12:'Apply to YPP', 13:'1-hour compilation', 18:'Checkpoint 2', 21:'Real RPM', 26:'Checkpoint 3', 29:'Recurring sponsor', 38:'Checkpoint 4', 52:'$10k/month'};

/* Pace targets by day number. inc = monthly income rate. This is the pace your two goals require; planning targets, not promises. */
const TARGETS = [
 {d:0,   inc:0,     vids:0,   views:0,       subs:0,     hrs:0},
 {d:18,  inc:0,     vids:1,   views:0,       subs:0,     hrs:0},
 {d:30,  inc:100,   vids:6,   views:60000,   subs:600,   hrs:2000},
 {d:40,  inc:600,   vids:11,  views:200000,  subs:2000,  hrs:4500},
 {d:55,  inc:5000,  vids:19,  views:550000,  subs:6000,  hrs:15000},
 {d:91,  inc:5600,  vids:33,  views:600000,  subs:12000, hrs:55000},
 {d:121, inc:6200,  vids:46,  views:640000,  subs:18000, hrs:100000},
 {d:152, inc:6800,  vids:59,  views:690000,  subs:25000, hrs:150000},
 {d:182, inc:7300,  vids:72,  views:740000,  subs:32000, hrs:205000},
 {d:213, inc:7800,  vids:85,  views:780000,  subs:40000, hrs:262000},
 {d:243, inc:8300,  vids:98,  views:820000,  subs:48000, hrs:322000},
 {d:273, inc:8800,  vids:111, views:860000,  subs:57000, hrs:385000},
 {d:304, inc:9200,  vids:124, views:900000,  subs:66000, hrs:452000},
 {d:334, inc:9600,  vids:137, views:950000,  subs:75000, hrs:522000},
 {d:364, inc:10000, vids:150, views:1000000, subs:85000, hrs:597000},
];
const PHASES = [
 {name:'Foundation', color:'var(--teal)', blurb:'Apps good enough to make one video, pick the test niche, create the channel.'},
 {name:'Test Week', color:'#79aaa0', blurb:'5 test videos Nov 2–6 in one sub-niche and one format, then the niche verdict on Nov 7.'},
 {name:'Build the Machine', color:'var(--mustard)', blurb:'Claude Code builds the pipeline in 2 weeks: research → script → voice → visuals → upload.'},
 {name:'Launch Sprint', color:'var(--amber)', blurb:'Video #1 on Nov 15, then 2 and 3 a week, inbox + schedule.'},
 {name:'Push to $5k', color:'var(--rust)', blurb:'4 videos a week, compilations, breaking stories, YPP application.'},
 {name:'Monetize', color:'var(--green)', blurb:'Partner Program, AdSense, affiliates, first sponsors.'},
 {name:'Scale to $10k', color:'var(--red)', blurb:'Double down on winners, recurring sponsors, email list.'},
];

/* build weeks 9–52 (generated) */
const GEN_WD = [], GEN_WE = [];
for (let wk = 9; wk <= 52; wk++) {
  const i = wk - 9, up = WED_UPGRADES[i], sp = SUN_PROJECTS[i];
  const phase = wk <= 17 ? 'Monetize' : 'Scale to $10k';
  const perWeek = 4;
  GEN_WD.push(
    {phase, t:`Approve ${perWeek} topics for week ${wk}`, m:15, auto:'topics', d:`The robot ranked next stories by outlier score and your past winners. Read its one-line reason for each and approve ${perWeek} (or swap one).`, w:`${perWeek} topics approved in the Approval Inbox.`},
    {phase, t:`Approve ${perWeek} scripts`, m:40, auto:'scripts', d:'About 10 minutes each: the hook, the pivotal decision, and anything the fact-check robot flagged. Trust the system for the rest; that’s what you built it for.', w:'All scripts approved or sent back with one note each.'},
    {phase, t: up[0], m:20, d: up[1], w:'Done and noted.'},
    {phase, t:'Approve thumbnails & publish', m:25, auto:'publish', d:'Pick the thumbnail/title set for each video, then in YouTube Studio: import the end screen, pin the first comment, and switch the private upload to Scheduled. That click keeps a human in charge of what goes public.', w:'This week’s videos are scheduled.'},
    {phase, t:'Pace check vs today’s target', m:15, auto:'pace', d:'Open the Sunday report and compare your numbers with the pace target below. One line: ahead, on pace, or behind, and why. Approve today’s comment replies.', w:'Pace note saved.'});
  GEN_WE.push(
    {phase, t:'Weekly review + batch approvals', m:120, auto:'review', d:'Read the analytics report, approve comment replies and the week’s Shorts in one batch, and look at the best and worst video of the week. Tell Claude one thing to do more of and one thing to stop. Use leftover time to get one video ahead.', w:'Report read, batch approved, 1 more / 1 less note given.'},
    {phase, t: sp[0], m:150, ms: SUN_MS[wk], d: sp[1], w:'Project finished or the next step is written down.'});
}
