// The 4-week plan: single source of truth for copy, designs, Reels, scripts and calendar.
// Every fact traces to a source doc in copy/sources/ or kit-facts.md. [CONFIRM] = Rebeca must check.
// Carousels: Sun + Wed. Reels: Mon, Tue, Thu, Fri. No Saturday.
// Mix: 14 education (58%), 6 kit (25%), 4 consult/proof (17%).

const L = {
  kit: 'https://www.etsy.com/listing/4593424898/guest-of-honor-day-of-kit-wedding-day',
  site: 'https://edeneraevents.com',
  consult: 'https://cal.com/rebeca-amich-fnwvd7/60min',
};

const CTA = {
  KIT: 'Comment KIT and I\'ll send you the link to the Guest of Honor Day-Of Kit. Or tap the link in bio.',
  PLAN: 'Comment PLAN and I\'ll send you my calendar for a 60-minute virtual consult ($50). Or tap the link in bio.',
};

const posts = [
  // ───────────── WEEK 1 · Budget + the kit launch ─────────────
  {
    id: 'w1-sun-budget-10-steps', date: '2026-10-18', format: 'carousel', pillar: 'Education', keyword: 'PLAN',
    source: 'Ultimate Wedding Budget Guide',
    hook: 'Your wedding budget in 10 steps (save this before you book anything)',
    caption: `Wedding budget planning: how to build your wedding budget in 10 steps.

Most budget stress comes from deciding in the wrong order. Do it in this order and every later decision gets easier:

1. Look at the full picture: savings, income, family help
2. Set a total you can comfortably afford
3. Name your top priorities
4. Pick a guest count early
5. Know fixed vs. changing costs
6. Break it into categories
7. Compare quotes
8. Track every payment and due date
9. Add a 5–10% buffer
10. Review it regularly

Let's stress now so the day can be stress-less.

Save this for your first budget meeting. Want help building yours? ${CTA.PLAN}`,
    hashtags: ['#weddingbudget', '#weddingplanning', '#engaged', '#weddingplanner', '#weddingtips'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding budget guide', title: 'Your wedding\nbudget in\n*10 steps*', sub: 'Do them in this order and every decision after gets easier.', swipe: 'Save this' },
      { type: 'list', eyebrow: 'Start here', title: 'Know your *numbers*', items: ['Look at the full picture: savings, income, family help', 'Set a total you can *comfortably* afford', 'Name your top priorities. Spend more there.'] },
      { type: 'list', eyebrow: 'Then', title: 'Decide what *drives* cost', start: 4, items: ['Pick a guest count early. It touches almost every line.', 'Fixed costs (venue, photographer) vs. changing costs (catering)', 'Break it into categories'] },
      { type: 'list', eyebrow: 'The 8 categories', title: 'Where it *goes*', itemSize: 30, items: ['Venue · Catering', 'Photography / Videography', 'Decor & Floral · Entertainment', 'Attire · Stationery · Favors'], start: 1, note: '' },
      { type: 'list', eyebrow: 'Keep it on track', title: 'Protect the *plan*', start: 7, items: ['Research and compare quotes', 'Track every payment, deposit and due date', 'Add a 5–10% buffer for surprises', 'Review and adjust regularly'] },
      { type: 'point', eyebrow: 'Planner tip', title: 'Venue and catering\nare usually the\n*biggest* lines.', body: 'Guest count moves catering. That\'s why step 4 comes so early.' },
      { type: 'cta', eyebrow: 'Want help building yours?', title: 'Let\'s stress *now*\nso the day can be\nstress-less.', keyword: 'PLAN', sub: '60-minute virtual consult · $50 · link in bio' },
    ],
    story: 'Poll: "Have you set your total wedding budget yet?" Yes / Working on it',
  },
  {
    id: 'w1-mon-talk-upcoming-news', date: '2026-10-14', launch: true, format: 'reel', pillar: 'Kit', keyword: 'KIT', talking: true,
    source: 'Rebeca video IMG_6763 + kit listing',
    footage: 'reels/w1-talk-upcoming-news.mp4 (REAL footage, already edited)',
    hook: 'Upcoming news from Eden Era Events',
    caption: `Wedding day coordinator help for couples: some news I've been holding onto.

I know I've been quiet here. I've been building something for couples who can't hire a day-of coordinator but still want to be the guest of honor at their own wedding.

The Guest of Honor Day-Of Kit gives a friend you trust a clear plan to run your day: a 26-page guide in plain words, a Google Sheets planner, and printable binder pages.

Your friend runs the day. You enjoy it.

${CTA.KIT}`,
    hashtags: ['#dayofcoordinator', '#weddingplanning', '#weddingday', '#engaged'],
    beats: [['Big news', 'I\'ve been *quiet* here.\nHere\'s why.'], ['For couples', 'Who can\'t hire a\n*day-of coordinator*'], ['', 'A plan your\n*friend* can run'], ['Inside', '26-page guide.\nPlanner. *Printables.*'], ['', 'Your friend runs the day.\n*You enjoy it.*']],
    cta: 'Be the *guest of honor.*',
    script: 'Use the real clip you filmed: "So I\'m really excited to share some upcoming news. I know I\'ve been very distant on here." (Already edited, 12 s.)',
    story: 'Countdown sticker: "Kit launch" + question box "What worries you most about your wedding day?"',
  },
  {
    id: 'w1-tue-budget-buffer', date: '2026-10-20', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'Ultimate Wedding Budget Guide, step 9',
    hook: 'The line most wedding budgets forget',
    caption: `Wedding budget tip: add a 5–10% buffer before you book a single vendor.

Unexpected costs are part of wedding planning: extra decor, a weather change, something that shows up the last week. A buffer means those surprises don't come out of the parts you care about most.

Build it in now so you're not scrambling later.

${CTA.PLAN}`,
    hashtags: ['#weddingbudget', '#weddingplanningtips', '#engaged', '#weddingplanner'],
    beats: [['Wedding budget', 'The line most\nbudgets *forget*'], ['', 'A *5–10%*\nbuffer'], ['It covers', 'Extra decor.\n*Weather* changes.'], ['', 'Last-minute\n*surprises*'], ['', 'Build it in *before*\nyou book anything']],
    cta: 'Let\'s build your budget *together.*',
    script: 'Here\'s the line most wedding budgets forget. A buffer. Set aside five to ten percent for surprises, like extra decor or a weather change. Build it in before you book anything. Comment PLAN and let\'s build yours together.',
    story: 'Quiz: "What % buffer should a wedding budget have?" 1% / 5–10% / 25%',
  },
  {
    id: 'w1-wed-kit-green-yellow-red', date: '2026-10-21', format: 'carousel', pillar: 'Kit', keyword: 'KIT',
    source: 'Kit cheat sheet (Green/Yellow/Red rule)',
    hook: 'Who decides when something goes wrong on your wedding day?',
    caption: `Wedding day problems: who decides when something goes wrong?

If the answer is "us," you'll spend your reception fixing things. The Green, Yellow, Red rule gives your helper a simple way to sort every problem:

🟢 Green: handle it. A vendor is 10 minutes late. Fix it, log it.
🟡 Yellow: ask, then act. The caterer wants $200 extra. Text the Decider.
🔴 Red: safety first. A guest feels faint. Call 911 if needed, then tell the Decider.

It's one page in the Guest of Honor Day-Of Kit, and it's the page your helper keeps in their pocket.

${CTA.KIT}`,
    hashtags: ['#dayofcoordinator', '#weddingday', '#weddingplanning', '#weddingtips'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding day problems', title: 'Who decides\nwhen something\ngoes *wrong?*', sub: 'Use the Green, Yellow, Red rule so it\'s never you.', swipe: 'Swipe' },
      { type: 'point', eyebrow: 'Green: handle it', title: 'A vendor is\n10 minutes late.', body: 'Your helper fixes it and logs it.\nYou never hear about it.' },
      { type: 'point', eyebrow: 'Yellow: ask, then act', title: 'The caterer wants\n$200 extra.', body: 'Your helper texts your Decider first.\nNo surprise charges.' },
      { type: 'point', eyebrow: 'Red: safety first', title: 'A guest\nfeels faint.', body: 'Call 911 if needed.\nThen tell the Decider.' },
      { type: 'list', eyebrow: 'Your helper never', title: 'Write the limits *down*', items: ['Signs contracts', 'Pays with their own money', 'Serves alcohol', 'Makes legal choices'] },
      { type: 'cta', eyebrow: 'Be the guest of honor', title: 'Your friend\nruns the day.\n*You enjoy it.*', keyword: 'KIT', sub: 'Guest of Honor Day-Of Kit · link in bio' },
    ],
    story: 'Poll: "Who would run your wedding day?" A planner / A trusted friend',
  },
  {
    id: 'w1-thu-fixed-vs-changing', date: '2026-10-22', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'Ultimate Wedding Budget Guide, step 5',
    hook: 'Not every wedding cost is fixed',
    caption: `Wedding budget basics: fixed costs vs. costs that change with your guest list.

Fixed costs like your venue and photographer stay the same. Catering moves with every guest you add. Once you know which is which, you know exactly where to adjust.

Planner tip: a buffet can often lower catering costs.

${CTA.PLAN}`,
    hashtags: ['#weddingbudget', '#weddingcatering', '#weddingplanning', '#engaged'],
    beats: [['Wedding budget', 'Not every cost\nis *fixed*'], ['Fixed', 'Venue.\n*Photographer.*'], ['Changes', 'Catering moves with\nevery *guest*'], ['', 'So adjust the\n*guest list* first'], ['Planner tip', 'A *buffet* can often\nlower catering costs']],
    cta: 'Want a budget that *bends* without breaking?',
    script: 'Not every wedding cost is fixed. Your venue and photographer stay the same. Catering moves with every guest you add. So if you need to trim, start with the guest list. And a buffet can often lower catering costs. Comment PLAN if you want help with yours.',
    story: 'Question box: "What\'s the one thing you WON\'T cut from your budget?"',
  },
  {
    id: 'w1-fri-why-i-care-cana', date: '2026-10-23', format: 'reel', pillar: 'Consult', keyword: 'PLAN', talking: true,
    source: 'Brand voice: Cana story (John 2:1–11)',
    hook: 'Why I care about the details of your wedding',
    caption: `Online wedding planner, and why I care about your wedding details.

Jesus' first miracle was at a wedding. When the wine ran out at Cana, he cared enough to make sure that couple wasn't embarrassed (John 2).

Weddings matter. That's why I sweat the details: so nothing runs out, nothing catches you off guard, and you get to be present.

I'm Rebeca. I plan weddings online, wherever you're getting married.

${CTA.PLAN}`,
    hashtags: ['#weddingplanner', '#christianwedding', '#virtualweddingplanner', '#engaged'],
    beats: [['Why I do this', 'Why I care about\nyour *details*'], ['John 2', 'The first miracle was\nat a *wedding*'], ['', 'The wine ran out.\nHe *cared.*'], ['', 'Weddings *matter.*\nSo do the details.'], ['', 'So nothing runs out.\nAnd you get to be *present.*']],
    cta: 'I\'m Rebeca. Let\'s *plan* yours.',
    script: 'Do you know where Jesus did his first miracle? At a wedding. The wine ran out, and he cared enough to make sure that couple wasn\'t embarrassed. Weddings matter. That\'s why I sweat the details, so nothing runs out and you get to be present. I\'m Rebeca. Comment PLAN and let\'s talk.',
    story: 'Behind the scenes: your planning desk + "Ask me anything about planning" question box',
  },

  // ───────────── WEEK 2 · Venue + timeline ─────────────
  {
    id: 'w2-sun-venue-questions', date: '2026-10-25', format: 'carousel', pillar: 'Education', keyword: 'PLAN',
    source: 'Questions to Ask Venues (12 questions in doc)',
    hook: '12 questions to ask your wedding venue before you sign',
    caption: `Wedding venue questions: 12 to ask before you sign anything.

Falling in love with a venue is easy. Finding out later what's not included is the hard part. Bring these to every tour:

Availability: date, capacity, hours included
Included: rental fee, decor rules, in-house catering, outside caterers (and fees)
Guests: parking, nearby stays, rain plan
Money: deposit and cancellation, payment schedule

Save this for your next venue tour. ${CTA.PLAN}`,
    hashtags: ['#weddingvenue', '#venuetour', '#weddingplanning', '#engaged', '#weddingtips'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding venue tours', title: '*12 questions*\nto ask before\nyou sign', sub: 'The more you know up front, the smoother everything after.', swipe: 'Save for your tour' },
      { type: 'list', eyebrow: 'Availability & logistics', title: 'Can it *work?*', items: ['Is our date available?', 'What\'s the maximum seating capacity?', 'How many hours are included (setup to cleanup)?'] },
      { type: 'list', eyebrow: 'What\'s included', title: 'What are we *paying* for?', start: 4, items: ['What\'s in the rental fee? Tables, chairs, linens?', 'Any decoration rules? (candles, string lights, florals)', 'Do you offer in-house catering? Tastings?', 'Can we bring our own caterer? Any fees?'] },
      { type: 'list', eyebrow: 'Guest experience', title: 'Will guests be *comfortable?*', start: 8, items: ['Is parking on-site? Valet?', 'Where can out-of-town guests stay nearby?', 'What\'s the backup plan for an outdoor ceremony?'] },
      { type: 'list', eyebrow: 'Policies & money', title: 'No *surprises*', start: 11, items: ['What are the deposit and cancellation policies?', 'What\'s the payment schedule?'] },
      { type: 'cta', eyebrow: 'Touring venues?', title: 'I\'ll help you\n*compare* them.', keyword: 'PLAN', sub: '60-minute virtual consult · $50 · link in bio' },
    ],
    story: 'Poll: "Indoor or outdoor ceremony?" + slider: "How many venues have you toured?"',
  },
  {
    id: 'w2-mon-venue-questions-forgotten', date: '2026-10-26', format: 'reel', pillar: 'Education', keyword: 'PLAN', talking: true,
    source: 'Questions to Ask Venues',
    hook: '3 venue questions couples forget to ask',
    caption: `Wedding venue tour tips: 3 questions couples forget to ask.

1. How many hours are included? You need time for setup, the event AND cleanup.
2. Can we bring our own caterer, and is there a fee?
3. What's the backup plan if it rains?

Ask these before you sign, not after. ${CTA.PLAN}`,
    hashtags: ['#weddingvenue', '#venuetour', '#weddingplanning', '#engaged'],
    beats: [['Venue tours', '3 questions couples\n*forget* to ask'], ['1', 'How many *hours*\nare included?'], ['', 'Setup + event +\n*cleanup*'], ['2', 'Can we bring our own\ncaterer? *Any fee?*'], ['3', 'What\'s the plan\nif it *rains?*']],
    cta: 'Ask *before* you sign.',
    script: 'Three venue questions couples forget to ask. One: how many hours are included, setup and cleanup too? Two: can we bring our own caterer, and is there a fee? Three: what\'s the plan if it rains? Ask before you sign. Comment PLAN for help.',
    story: 'Question box: "What\'s on your venue must-have list?"',
  },
  {
    id: 'w2-tue-rental-fee', date: '2026-10-27', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'Questions to Ask Venues: "What is included in the rental fee?"',
    hook: 'Two venues, same price. Not the same deal.',
    caption: `Wedding venue pricing: what's actually included in the rental fee?

Some venues include tables, chairs and linens. Others are a blank slate, and you rent everything. Same price on paper, very different budget.

Ask for the list before you compare prices. ${CTA.PLAN}`,
    hashtags: ['#weddingvenue', '#weddingbudget', '#weddingplanning', '#engaged'],
    beats: [['Venue pricing', 'Same price.\n*Not* the same deal.'], ['Venue A', 'Tables, chairs,\nlinens *included*'], ['Venue B', 'A *blank slate.*\nYou rent it all.'], ['', 'Ask for the\n*included* list'], ['', 'Then compare\n*prices*']],
    cta: 'Want a second set of *eyes?*',
    script: 'Two venues, same price, not the same deal. One includes tables, chairs and linens. The other is a blank slate, and you rent everything. Always ask what\'s included before you compare prices. Comment PLAN if you want a second set of eyes.',
    story: 'This-or-that: "All-inclusive venue or blank slate?"',
  },
  {
    id: 'w2-wed-kit-timeline', date: '2026-10-28', format: 'carousel', pillar: 'Kit', keyword: 'KIT',
    source: 'Kit guide p.9 (timeline + padding rules)',
    hook: 'Build a wedding day timeline that doesn\'t break',
    caption: `Wedding day timeline: how to build one that doesn't fall apart.

Your timeline is one page. It says what happens, when, and who owns it.

Write your ceremony time in the middle. List your hard stops: venue end time, sunset, music curfew. Work backward for getting ready, vendor arrivals, photos and setup. Work forward for cocktail hour, dinner, toasts and the send-off.

Then pad it:
+15 minutes when 5 or more people must move together
+20 minutes when a car, shuttle or parking lot is involved
Ask your photographer how long each family photo group takes, then multiply.

Your ceremony may start a few minutes late. Don't build a timeline that breaks if it does.

The Guest of Honor Day-Of Kit has a planner where the times fill in on their own. ${CTA.KIT}`,
    hashtags: ['#weddingtimeline', '#weddingday', '#dayofcoordinator', '#weddingplanning'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding day timeline', title: 'Build a timeline\nthat doesn\'t\n*break*', sub: 'One page. What happens, when, and who owns it.', swipe: 'Swipe' },
      { type: 'list', eyebrow: 'Build it', title: 'Start in the *middle*', items: ['Write your ceremony time in the middle', 'List hard stops: venue end, sunset, music curfew', 'Work backward: getting ready, vendors, photos, setup', 'Work forward: cocktails, dinner, toasts, send-off'] },
      { type: 'point', eyebrow: 'Padding rule 1', title: '+15 minutes', body: 'when 5 or more people\nmust move together.' },
      { type: 'point', eyebrow: 'Padding rule 2', title: '+20 minutes', body: 'when a car, shuttle\nor parking lot is involved.' },
      { type: 'point', eyebrow: 'Padding rule 3', title: 'Family photos *multiply*', body: 'Ask your photographer how long each group takes. Then multiply by your number of groups.' },
      { type: 'point', title: 'Your ceremony may\nstart a few\nminutes *late.*', body: 'Don\'t build a timeline that breaks if it does.' },
      { type: 'cta', eyebrow: 'Inside the kit', title: 'Change one number.\n*The times update.*', keyword: 'KIT', sub: 'Google Sheets planner · link in bio' },
    ],
    story: 'Quiz: "How much padding when guests take a shuttle?" 5 / 20 / 60 min',
  },
  {
    id: 'w2-thu-venue-money', date: '2026-10-29', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'Questions to Ask Venues: policies & financial details',
    hook: 'Read this before you pay a venue deposit',
    caption: `Wedding venue contract questions: two to ask before you pay a deposit.

1. What's the deposit and cancellation policy?
2. What's the payment schedule? Some venues want full payment months ahead; others are more flexible.

Knowing the money timeline up front saves a lot of stress later. ${CTA.PLAN}`,
    hashtags: ['#weddingvenue', '#weddingbudget', '#weddingplanning', '#engaged'],
    beats: [['Before the deposit', 'Read this before you\npay a *venue*'], ['Ask', 'What\'s the deposit\nand *cancellation* policy?'], ['Ask', 'What\'s the\n*payment schedule?*'], ['', 'Some want it all\nmonths *ahead*'], ['', 'Know the money\ntimeline *first*']],
    cta: 'Know before you *sign.*',
    script: 'Before you pay a venue deposit, ask two things. What\'s the deposit and cancellation policy? And what\'s the payment schedule? Some venues want full payment months ahead. Know the money timeline before you sign. Comment PLAN for help.',
    story: 'Question box: "Venue contract questions? Drop them here."',
  },
  {
    id: 'w2-fri-kit-choose-deputy', date: '2026-10-30', format: 'reel', pillar: 'Kit', keyword: 'KIT', talking: true,
    source: 'Kit steps 1–2 (Deputy, 90-minute handoff)',
    hook: 'Who\'s in charge on your wedding day?',
    caption: `Day-of wedding coordinator alternative: who's in charge on your wedding day?

If you don't have a coordinator, pick a Deputy: one friend you trust to run the day. Then hand off the plan in one 90-minute talk.

The Guest of Honor Day-Of Kit walks you both through it in 10 simple steps, so a willing friend becomes a confident one.

${CTA.KIT}`,
    hashtags: ['#dayofcoordinator', '#weddingday', '#maidofhonor', '#weddingplanning'],
    beats: [['Wedding day', 'Who\'s in *charge*\non your day?'], ['', 'If not a coordinator...\npick a *Deputy*'], ['', 'One friend\nyou *trust*'], ['', 'Hand off the plan in\none *90-minute* talk'], ['', 'A willing friend becomes\na *confident* one']],
    cta: 'Be the *guest of honor.*',
    script: 'Who\'s in charge on your wedding day? If you don\'t have a coordinator, pick a Deputy, one friend you trust. Then hand off the whole plan in one ninety-minute talk. My kit walks you through it. Comment KIT.',
    story: 'Poll: "Do you already know who your Deputy would be?" Yes / Not yet',
  },

  // ───────────── WEEK 3 · Guest list + what a planner does ─────────────
  {
    id: 'w3-sun-guest-list', date: '2026-11-01', format: 'carousel', pillar: 'Education', keyword: 'PLAN',
    source: 'How to Manage Your Guest List',
    hook: 'How to build your wedding guest list without the drama',
    caption: `Wedding guest list tips: how to build yours without the drama.

1. Start with budget and venue size: what can you afford per guest, and how many fit?
2. Put your core people first
3. Make a two-tier list
4. Decide on plus-ones and kids early, and say it clearly
5. Set an RSVP deadline 4–6 weeks before the wedding
6. Plan for some guests to say no

Save this for the guest list talk with your families. ${CTA.PLAN}`,
    hashtags: ['#weddingguestlist', '#weddingplanning', '#engaged', '#weddingtips'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding guest list', title: 'Build your\nguest list\nwithout the *drama*', sub: '6 steps that balance people, budget and space.', swipe: 'Swipe' },
      { type: 'point', step: '01', title: 'Budget and\nvenue *first*', body: 'How many fit? What can you spend per guest? Keep a buffer for surprises.' },
      { type: 'point', step: '02', title: 'Your core\n*people*', body: 'Family, close friends, wedding party. The people you can\'t imagine the day without.' },
      { type: 'point', step: '03', title: 'A *two-tier* list', body: 'Tier one: must invite. Tier two: invite as RSVPs come in, if space and budget allow.' },
      { type: 'point', step: '04', title: 'Plus-ones and\nkids: decide *early*', body: 'Then say it clearly on your invitation or wedding website.' },
      { type: 'point', step: '05', title: 'RSVP deadline:\n*4–6 weeks* out', body: 'Give travelers time. Follow up when it passes.' },
      { type: 'point', step: '06', title: 'Plan for\n*no-shows*', body: 'Not everyone you invite will come. Use your final RSVPs to set catering and seating.' },
      { type: 'cta', eyebrow: 'Guest list stress?', title: 'I\'ll track RSVPs\nso you *don\'t* have to.', keyword: 'PLAN', sub: 'Partial planning starting at $3,000 · link in bio' },
    ],
    story: 'Slider: "How many guests are you hoping for?" + question box "Biggest guest list headache?"',
  },
  {
    id: 'w3-mon-two-tier-list', date: '2026-11-02', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'How to Manage Your Guest List, step 3',
    hook: 'The guest list trick that saves so much stress',
    caption: `Wedding guest list strategy: the two-tier list.

Tier one is your must-invite list. Tier two is for people you'd love to invite if space and budget allow. As "no" RSVPs come in, you invite from tier two.

Flexible, fair, and so much less stressful. ${CTA.PLAN}`,
    hashtags: ['#weddingguestlist', '#weddingplanningtips', '#engaged', '#weddingplanner'],
    beats: [['Guest list', 'The trick that saves\nso much *stress*'], ['Tier one', 'Your *must-invite*\nlist'], ['Tier two', 'Love to invite, if\n*space* allows'], ['', 'A "no" RSVP\ncomes in...'], ['', 'Invite someone\nfrom *tier two*']],
    cta: 'Need help with the *list?*',
    script: 'Here\'s the guest list trick that saves so much stress. Make two tiers. Tier one is your must-invite list. Tier two is people you\'d love to invite if space allows. When a no comes in, invite from tier two. Comment PLAN for help.',
    story: 'Poll: "Two-tier guest list: genius or awkward?"',
  },
  {
    id: 'w3-tue-rsvp-deadline', date: '2026-11-03', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'How to Manage Your Guest List, step 6',
    hook: 'When should your RSVP deadline be?',
    caption: `Wedding RSVP deadline: when to set it and what to do after.

Set it 4–6 weeks before the wedding. Give out-of-town guests extra time to plan travel. When the deadline passes, follow up; don't wait and hope.

Your final head count drives catering and seating, so it has to be right. ${CTA.PLAN}`,
    hashtags: ['#weddingrsvp', '#weddingguestlist', '#weddingplanning', '#engaged'],
    beats: [['RSVPs', 'When should your\nRSVP *deadline* be?'], ['', '*4–6 weeks*\nbefore the wedding'], ['', 'Travelers need\n*extra* time'], ['Deadline passed?', '*Follow up.*\nDon\'t wait and hope.'], ['', 'Your head count sets\n*catering* and seating']],
    cta: 'I\'ll chase the RSVPs. *You relax.*',
    script: 'When should your RSVP deadline be? Four to six weeks before the wedding. Give travelers extra time. And when the deadline passes, follow up. Don\'t wait and hope. Your head count sets catering and seating. Comment PLAN and I\'ll help.',
    story: 'Question box: "How are you collecting RSVPs?"',
  },
  {
    id: 'w3-wed-what-planner-does', date: '2026-11-04', format: 'carousel', pillar: 'Consult', keyword: 'PLAN',
    source: '5 Things Your Wedding Planner Can Do + services pricing',
    hook: '5 things a wedding planner takes off your plate',
    caption: `What does a wedding planner do? 5 things I take off your plate.

1. Budget: set it and actually stay within it
2. Vendors: when to book, what to ask, reading the contracts
3. Design: turning your Pinterest board into a day that looks like you
4. RSVPs and details: tracked, followed up, done on time
5. The day itself: the timeline runs, vendors are managed, hiccups handled without you ever knowing

I plan online, wherever you're getting married.
Month-of coordination starting at $1,000 · Partial planning starting at $3,000 · Full planning starting at $5,000

${CTA.PLAN}`,
    hashtags: ['#weddingplanner', '#virtualweddingplanner', '#weddingplanning', '#engaged', '#weddingcoordinator'],
    slides: [
      { type: 'cover', theme: 'sage', eyebrow: 'Online wedding planning', title: '5 things a planner\ntakes off your\n*plate*', sub: 'Even if you love DIY.', swipe: 'Swipe' },
      { type: 'list', eyebrow: 'What I handle', title: 'So you *don\'t* have to', itemSize: 32, items: ['*Budget:* set it, then stay within it', '*Vendors:* when to book, what to ask, contracts', '*Design:* your Pinterest board, made real', '*RSVPs:* tracked and followed up', '*The day:* timeline, vendors, hiccups'] },
      { type: 'point', title: 'Hiccups handled\nwithout you\never *knowing.*', body: 'That\'s the whole job on the day.' },
      { type: 'list', eyebrow: 'Online · wherever you marry', title: 'Ways to work *together*', itemSize: 30, items: ['Month-of coordination · starting at $1,000', 'Partial planning · starting at $3,000', 'Full planning · starting at $5,000', 'Not sure? 60-min virtual consult · $50'] },
      { type: 'cta', eyebrow: 'Let\'s talk', title: 'Don\'t stress\nthe *details.*', keyword: 'PLAN', sub: 'Book your consult · link in bio' },
    ],
    story: 'Question box: "What part of planning do you wish someone else would handle?"',
  },
  {
    id: 'w3-thu-kit-deputy-never', date: '2026-11-05', format: 'reel', pillar: 'Kit', keyword: 'KIT',
    source: 'Kit cheat sheet + Permission Slip',
    hook: 'Things your wedding day helper should NEVER do',
    caption: `Wedding day helper rules: what your friend should never do.

Your Deputy runs the day, but some things aren't theirs to carry. They never:
• sign contracts
• pay with their own money
• serve alcohol
• drive a guest who drank
• make legal choices

When something isn't their call, they say: "That is not my call, but I will get you to the person who can decide."

The Permission Slip in the Guest of Honor Day-Of Kit puts it in writing. ${CTA.KIT}`,
    hashtags: ['#dayofcoordinator', '#bridesmaid', '#maidofhonor', '#weddingday'],
    beats: [['Your wedding helper', 'Things they should\n*never* do'], ['Never', 'Sign *contracts*'], ['Never', 'Pay with their\n*own* money'], ['Never', 'Drive a guest\n*who drank*'], ['They say', '"That\'s not my call, but\nI\'ll get you to *who decides*."']],
    cta: 'Put it in *writing.*',
    script: 'Things your wedding day helper should never do. Never sign contracts. Never pay with their own money. Never drive a guest who drank. When it\'s not their call, they say: that\'s not my call, but I\'ll get you to the person who can decide. Comment KIT for the permission slip.',
    story: 'Poll: "Has a friend ever been stuck \'running\' a wedding?" Yes / No',
  },
  {
    id: 'w3-fri-plus-ones-kids', date: '2026-11-06', format: 'reel', pillar: 'Education', keyword: 'PLAN', talking: true,
    source: 'How to Manage Your Guest List, step 4 (Rebeca\'s own wedding)',
    hook: 'Plus-ones and kids: here\'s what we did',
    caption: `Wedding plus-ones and kids: how to decide (and how we did it).

For our wedding, we allowed plus-ones only for married or long-term couples, and children only for families traveling from far away.

Whatever you choose, decide early and say it clearly on your invitation or wedding website. Some venues are family-friendly; some are adults-only, so check first.

${CTA.PLAN}`,
    hashtags: ['#weddingguestlist', '#plusone', '#weddingplanning', '#engaged'],
    beats: [['Guest list', 'Plus-ones and kids:\n*what we did*'], ['Plus-ones', 'Only *married* or\nlong-term couples'], ['Kids', 'Only from families\ntraveling *far*'], ['', 'Decide *early*'], ['', 'Say it *clearly*\non your invite or website']],
    cta: 'Need help deciding?',
    script: 'Plus-ones and kids: here\'s what we did at our wedding. Plus-ones only for married or long-term couples. Kids only from families traveling far. Whatever you choose, decide early and say it clearly. Comment PLAN if you want help.',
    story: 'This-or-that: "Kids at weddings: yes / adults-only"',
  },

  // ───────────── WEEK 4 · Dress, planner vs. coordinator, kit contents ─────────────
  {
    id: 'w4-sun-dress-shopping', date: '2026-11-08', format: 'carousel', pillar: 'Education', keyword: 'PLAN',
    source: 'How to Prepare for Wedding Dress Shopping',
    hook: 'How to prepare for wedding dress shopping',
    caption: `Wedding dress shopping tips: how to prepare for your appointment.

1. Set your budget first
2. Keep an open mind (I walked in sure I wanted A-line and fell for a mermaid dress)
3. Test-drive it: walk, sit, dance, hug
4. Bring a small, honest group
5. Visit more than one shop
6. Take photos and videos
7. Enjoy every moment

Which tip will help you most? Tell me below. ${CTA.PLAN}`,
    hashtags: ['#weddingdress', '#bridetobe', '#weddingdressshopping', '#engaged'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding dress shopping', title: 'How to prepare\nfor dress\n*shopping*', sub: '7 tips so you leave feeling like the best version of you.', swipe: 'Save for your appointment' },
      { type: 'list', eyebrow: 'Before you go', title: 'Set yourself *up*', items: ['Set your budget first', 'Keep an open mind', 'Bring a small, honest group'] },
      { type: 'point', eyebrow: 'From my own appointment', title: 'I was sure about\nA-line. I fell for\na *mermaid* dress.', body: 'Try the style you\'d never pick.' },
      { type: 'list', eyebrow: 'In the dressing room', title: '*Test-drive* it', start: 4, items: ['Walk, sit, dance and hug in it', 'Visit more than one shop to compare', 'Take photos and videos of each one', 'Enjoy every moment'] },
      { type: 'cta', eyebrow: 'Dress done. What\'s next?', title: 'Let\'s plan the\n*rest* together.', keyword: 'PLAN', sub: '60-minute virtual consult · $50 · link in bio' },
    ],
    story: 'Poll: "Do you know your dress style yet?" + question box "Who\'s coming dress shopping?"',
  },
  {
    id: 'w4-mon-test-drive-dress', date: '2026-11-09', format: 'reel', pillar: 'Education', keyword: 'PLAN',
    source: 'Dress shopping, tip 3',
    hook: 'Don\'t buy a wedding dress until you do this',
    caption: `Wedding dress shopping tip: test-drive the dress before you say yes.

Your wedding day is walking, sitting, dancing, hugging, and maybe a spontaneous twirl. Do all of it in the fitting room. You don't want to be stuck on the dance floor like a penguin.

Comfort matters as much as style. ${CTA.PLAN}`,
    hashtags: ['#weddingdress', '#bridetobe', '#weddingdressshopping', '#weddingtips'],
    beats: [['Dress shopping', 'Don\'t say yes until\nyou do *this*'], ['', '*Walk* in it'], ['', '*Sit* in it'], ['', '*Dance* and hug in it'], ['', 'Comfort matters as\nmuch as *style*']],
    cta: 'More planning help?',
    script: 'Don\'t say yes to the dress until you test-drive it. Walk in it. Sit in it. Dance and hug in it. You don\'t want to be stuck on the dance floor like a penguin. Comfort matters as much as style. Comment PLAN for more planning help.',
    story: 'Emoji slider: "How excited are you for dress shopping?"',
  },
  {
    id: 'w4-tue-venue-coordinator-vs-planner', date: '2026-11-10', format: 'reel', pillar: 'Consult', keyword: 'PLAN', talking: true,
    source: 'Top 10 Tips, tip 4',
    hook: 'Your venue coordinator is not your wedding planner',
    caption: `Venue coordinator vs. wedding planner: they are not the same job.

A venue coordinator focuses on the venue. A wedding planner focuses on your whole day and your vision: vendors, budget, timeline, and you.

If full planning isn't in your budget, month-of coordination (starting at $1,000) covers the final details so the day flows.

${CTA.PLAN}`,
    hashtags: ['#weddingplanner', '#weddingcoordinator', '#weddingvenue', '#engaged'],
    beats: [['Know the difference', 'Venue coordinator\n≠ *wedding planner*'], ['Venue coordinator', 'Focuses on\nthe *venue*'], ['Wedding planner', 'Focuses on *you*\nand your whole day'], ['', 'Vendors. Budget.\n*Timeline.*'], ['Option', 'Month-of coordination\nstarting at *$1,000*']],
    cta: 'Not sure what you need?',
    script: 'Your venue coordinator is not your wedding planner. A venue coordinator focuses on the venue. A wedding planner focuses on you and your whole day: vendors, budget, timeline. Month-of coordination starts at one thousand dollars. Comment PLAN and let\'s figure out what you need.',
    story: 'Quiz: "Does your venue coordinator manage your vendors?" Yes / No (answer: usually not; ask)',
  },
  {
    id: 'w4-wed-kit-everything', date: '2026-11-11', format: 'carousel', pillar: 'Kit', keyword: 'KIT',
    source: 'Kit listing: What you get + 10 steps',
    hook: 'Everything inside the Guest of Honor Day-Of Kit',
    caption: `Wedding day planner kit: everything inside the Guest of Honor Day-Of Kit.

• A 26-page guide in plain words, with 10 simple steps
• A Google Sheets planner you copy and make your own (times fill in by themselves)
• Printable binder pages, including the Permission Slip
• A Final 48 Hours checklist
• "The Forgotten Five": the things couples miss most

You need a free Google account, and a printer if you want paper copies.

Your friend runs the day. You enjoy it. ${CTA.KIT}`,
    hashtags: ['#weddingplanner', '#dayofcoordinator', '#weddingtimeline', '#weddingplanning'],
    slides: [
      { type: 'cover', eyebrow: 'Wedding day coordinator kit', title: 'Guest of Honor\n*Day-Of Kit*', sub: 'Everything a trusted friend needs to run your day.', swipe: 'See inside' },
      { type: 'list', eyebrow: 'What you get', title: 'Everything in *one* kit', items: ['26-page guide in plain words', 'Google Sheets planner you copy', 'Printable binder pages', 'Final 48 Hours checklist', '"The Forgotten Five"'] },
      { type: 'list', eyebrow: 'The 10 steps', title: 'From "yes" to *"I do"*', itemSize: 29, items: ['Choose your Deputy', 'Hand off the plan', 'Build the timeline', 'Fill in contacts', 'Green, Yellow, Red rule'] },
      { type: 'list', eyebrow: 'The 10 steps', title: 'Short pages. *Plain words.*', start: 6, itemSize: 29, items: ['Pack the emergency kit', 'Send the messages', 'Run the rehearsal', 'Follow the playbook', 'Plan the send-off'] },
      { type: 'point', eyebrow: 'Inside the planner', title: 'Change one number.\n*The times update*\nby themselves.', body: 'Timeline, contacts, Permission Slip, handoff notes, Final 48 Hours.' },
      { type: 'cta', eyebrow: 'Be the guest of honor', title: 'Your friend\nruns the day.\n*You enjoy it.*', keyword: 'KIT', sub: 'Digital download on Etsy · link in bio' },
    ],
    story: 'Share the carousel + link sticker to the Etsy listing',
  },
  {
    id: 'w4-thu-which-service', date: '2026-11-12', format: 'reel', pillar: 'Consult', keyword: 'PLAN',
    source: 'Services pricing (site) + consult',
    hook: 'Month-of, partial or full planning: which do you need?',
    caption: `Wedding planning packages explained: month-of, partial or full?

Month-of coordination, starting at $1,000: you've planned it; I bring it home.
Partial planning, starting at $3,000: you've started; I guide the rest.
Full planning, starting at $5,000: I'm with you from the start.

All online, wherever you're getting married. Not sure which fits? That's what the consult is for.

${CTA.PLAN}`,
    hashtags: ['#weddingplanner', '#virtualweddingplanner', '#weddingplanning', '#engaged'],
    beats: [['Which do you need?', 'Month-of, partial\nor *full* planning?'], ['Month-of', 'You planned it.\nI *bring it home.*\nStarting at $1,000'], ['Partial', 'You started.\nI *guide* the rest.\nStarting at $3,000'], ['Full', 'With you from\nthe *start.*\nStarting at $5,000'], ['', 'All *online,*\nwherever you marry']],
    cta: 'Not sure? *Let\'s talk.*',
    script: 'Month-of, partial or full planning: which do you need? Month-of, starting at one thousand: you planned it, I bring it home. Partial, starting at three thousand: you started, I guide the rest. Full, starting at five thousand: I\'m with you from the start. Not sure? Comment PLAN.',
    story: 'Poll: "Where are you in planning?" Just engaged / Halfway / Almost there',
  },
  {
    id: 'w4-fri-date-night', date: '2026-11-13', format: 'reel', pillar: 'Education', keyword: 'KIT', talking: true,
    source: 'Top 10 Tips, tips 8 and 10',
    hook: 'The wedding planning rule I wish every couple kept',
    caption: `Wedding planning self-care: the rule I wish every couple kept.

Schedule date nights where wedding talk is off-limits. Delegate tasks to friends and family who want to help. A happy, rested you is the best thing you can bring to your wedding day.

Want a friend to carry the wedding day itself? ${CTA.KIT}`,
    hashtags: ['#engagedlife', '#weddingplanning', '#weddingtips', '#engaged'],
    beats: [['A planning rule', 'The one I wish every\ncouple *kept*'], ['', 'Date nights.\n*No wedding talk.*'], ['', '*Delegate.*\nPeople want to help.'], ['', 'Protect your\n*rest*'], ['', 'A rested you is the\n*best gift* on the day']],
    cta: 'Let a friend run the *day.*',
    script: 'The wedding planning rule I wish every couple kept: date nights with no wedding talk. Delegate; people want to help. A rested you is the best thing you can bring to your wedding day. Want a friend to run the day itself? Comment KIT.',
    story: 'Question box: "What\'s your favorite no-wedding-talk date night?"',
  },
];

module.exports = { posts, L, CTA };
