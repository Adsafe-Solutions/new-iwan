/* Blog posts, transcribed from the live iwan.community/blogs pages.

   `id` is also the slug: /blogs/<id> is the post's own page.

   `programme` is the nav path of the programme a post belongs to, or null for
   one that is not tied to one — the same field events carry, read back through
   `programmeOf` in lib/events.js so the chip and the filter cannot drift from
   what the programmes are actually called.

   `date` is a plain YYYY-MM-DD string, parsed field-by-field like event dates.
   ⚠ Two posts carry no date on the live site and none has been invented for
   them; they sort last and render without one.

   `body` is a list of [kind, text] blocks — "h" heading, "p" paragraph,
   "li" list item — which is as much structure as the source pages have.

   ⚠ `img` is hotlinked from the live site's uploads, like the session photos
   in programmes.js. The `?w=1200` is not optional: the originals are 8–9MB
   camera JPEGs, and i0.wp.com (Jetpack's CDN) rate-limits with a 429 when
   several are pulled at once. Copy them into public/ to cut both ties. */
export const BLOGS = [
  {
    id: "lessons-from-the-battle-of-badr-leadership-faith-mindset",
    title: "Lessons from the Battle of Badr: Leadership, Faith & Mindset.",
    programme: null,
    date: "2026-03-01",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-01-at-7.31.22-PM.jpeg?w=1200&ssl=1",
    excerpt:
      "🔹 Lessons for Us Today • Prepare with excellence, even if resources are limited",
    body: [
      [
        "h",
        "Lessons from the Battle of Badr: Leadership, Faith & Mindset. Summary of Seerah session – 01 March 2026",
      ],
      [
        "li",
        "The Battle of Badr teaches timeless lessons in leadership, unity, and reliance on Allah.",
      ],
      ["p", "🔹 From Caravan to Confrontation"],
      [
        "li",
        "The Prophet ﷺ and about 313 companions initially set out to intercept a caravan.",
      ],
      ["li", "They were lightly equipped only 2 horses and 70 camels, sharing rides."],
      [
        "li",
        "Suddenly, they faced a fully armed army of 1,000. What began as a small mission turned into a defining moment for the Ummah.",
      ],
      ["p", "🔹 Leadership Through Consultation (Shura)"],
      [
        "li",
        "When the reality of war became clear, the Prophet ﷺ did not impose a decision. He consulted his companions.",
      ],
      [
        "li",
        "Sa’d ibn Mu’adh (RA) spoke on behalf of the Ansar, pledging complete loyalty even if it meant entering the sea.",
      ],
      [
        "li",
        "This unity created psychological and spiritual strength. True leadership builds ownership, not fear.",
      ],
      ["p", "🔹 Arrogance vs. Humility"],
      ["li", "Abu Jahl marched in pride and arrogance to display power."],
      ["li", "The Prophet ﷺ spent the night in deep dua, crying to Allah for victory."],
      ["li", "One relied on ego. The other relied on Allah."],
      ["p", "🔹 Divine Support Comes After Effort"],
      [
        "li",
        "Allah sent tranquility, rain to firm the ground, and strength to the believers.",
      ],
      ["li", "Despite being outnumbered 3 to 1, they were granted victory."],
      [
        "p",
        "🔹 Lessons for Us Today • Prepare with excellence, even if resources are limited",
      ],
      ["li", "Consult and build unity in our teams and families"],
      ["li", "Strengthen ourselves physically, mentally, spiritually"],
      ["li", "Build institutions, not just consume"],
      ["li", "Trust Allah after sincere effort"],
      [
        "p",
        "Badr reminds us: Numbers don’t define victory. Faith, unity, preparation, and sincerity do.",
      ],
      [
        "p",
        "✨ If 300 sincere believers could change history then, a committed community today can transform its future.",
      ],
    ],
  },
  {
    id: "from-makkah-to-madinah-leadership-brotherhood-strategy",
    title: "From Makkah to Madinah: Leadership, Brotherhood & Strategy",
    programme: null,
    date: "2026-02-22",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-22-at-9.12.58-PM.jpeg?w=1200&ssl=1",
    excerpt:
      "✔ Be patient ✔ Avoid retaliation ✔ Continue da’wah wisely ✔ Migrate if necessary",
    body: [
      ["p", "Summary of today’s seerah session below."],
      ["p", "🌙 From Makkah to Madinah: Leadership, Brotherhood & Strategy"],
      ["p", "📍 1. Makkah – Patience Under Persecution"],
      ["li", "For 13 years in Makkah, Muslims endured severe oppression."],
      ["li", "The Prophet ﷺ remained patient, dignified, and steadfast."],
      [
        "li",
        "Protected initially under tribal system (especially by Abu Talib of Banu Hashim)",
      ],
      [
        "li",
        "After his death, persecution intensified (e.g., Abu Lahab – Surah Al-Masad)",
      ],
      ["li", "No permission to fight Commanded to:"],
      [
        "p",
        "✔ Be patient ✔ Avoid retaliation ✔ Continue da’wah wisely ✔ Migrate if necessary",
      ],
      ["p", "Lesson: Patience comes before power."],
      ["p", "🕋 2. Hijrah – The Turning Point Migration to Madinah changed everything."],
      ["p", "Two groups emerged:"],
      ["li", "Muhajirun – Migrants from Makkah"],
      ["li", "Ansar – Helpers of Madinah"],
      ["li", "The Ansar shared homes, wealth, and land."],
      ["li", "Islam replaced tribal pride with faith-based brotherhood."],
      [
        "li",
        "This marked the formation of the first Islamic state and the beginning of the Hijri calendar.",
      ],
      ["p", "Lesson: Brotherhood builds nations."],
      ["p", "⚖ 3. Social Order in Madinah The Prophet ﷺ established:"],
      ["li", "Brotherhood beyond tribe Protection of life, honor, & property"],
      ["li", "Agreements with Jewish tribes for mutual defense"],
      ["li", "Religious freedom under a unified civic system"],
      [
        "li",
        "Islam transformed a divided tribal society into a faith-centered community.",
      ],
      ["p", "Lesson: Justice creates stability."],
      ["p", "⚔ 4. Permission to Defend After migration:"],
      ["li", "Makkans seized Muslim property"],
      ["li", "Muslims were expelled and persecuted"],
      ["li", "Allah granted permission to fight (Surah Al-Hajj)"],
      ["li", "Caravan interceptions were responses to injustice not random aggression."],
      ["p", "Lesson: Justice before retaliation."],
      ["p", "🌙 5. Prelude to Badr (2 AH – Ramadan)"],
      [
        "p",
        "A Quraysh caravan led by Abu Sufyan returned from Syria with massive wealth.",
      ],
      [
        "p",
        "The Prophet ﷺ strategically mobilized companions. With secrecy, planning, and tawakkul, this led to the historic Battle of Badr where Allah granted victory despite overwhelming odds.",
      ],
      ["p", "Lesson: Strategy with trust in Allah."],
      ["p", "🌟 Core Takeaways for Us Today"],
      ["li", "Patience before power"],
      ["li", "Brotherhood over tribalism"],
      ["li", "Justice before retaliation"],
      ["li", "Strategy with tawakkul"],
      ["li", "Unity under strong leadership"],
      [
        "p",
        "The journey from Makkah to Madinah teaches us how faith, discipline, and unity build strong communities.",
      ],
      [
        "p",
        "May Allah make us people of patience in hardship and unity in strength. Ameen. 🤲",
      ],
    ],
  },
  {
    /* the live slug ends in a percent-encoded 🌙; React Router decodes a param
       before it reaches us, so the encoded form could never match — dropped */
    id: "seerah-insights-ramadan-prep",
    title: "Seerah Insights & Ramadan Prep 🌙",
    programme: null,
    date: null,
    img: null,
    excerpt:
      "We discussed the Prophet’s (SAW) role as a leader in his home and how we can prepare ourselves physically and spiritually for the upcoming Ramadan.",
    body: [
      ["p", "Summary of today’s Seerah session,"],
      [
        "p",
        "We discussed the Prophet’s (SAW) role as a leader in his home and how we can prepare ourselves physically and spiritually for the upcoming Ramadan.",
      ],
      ["p", "Here are the key takeaways:"],
      ["li", "The Prophet (SAW) as a Father & Leader"],
      [
        "li",
        "Role Modeling: The Prophet taught his family by example—teaching them sincerity, seeking refuge from evil, and prioritizing worship.",
      ],
      [
        "li",
        "Ramadan Habits: He would specifically wake his family up during the last 10 nights of Ramadan to pray and seek Laylatul Qadr.",
      ],
      [
        "li",
        "Action: As men, we must lead our families in worship with kindness and encouragement, not just instruction.",
      ],
      ["li", "Knowledge & Critical Thinking"],
      [
        "li",
        "Context is Key: We discussed the danger of taking Hadith out of context or relying solely on “Google Fatwas.”",
      ],
      [
        "li",
        "Trust Authentic Sources: Just as you wouldn’t trust AI to write a complex code without checking, don’t rely on random internet sources for Deen. Follow established schools of thought (Madhabs) or consult trustworthy scholars.",
      ],
      [
        "li",
        "Avoid “Fatwa Shopping”: Don’t look for answers that just suit your desires; seek the truth.",
      ],
      ["p", "2. Preparing for Ramadan (The Month of Taqwa)"],
      ["li", "We discussed the 3 Levels of Fasting (Imam Ghazali):"],
      ["li", "lvl 1 Basic: Restraining the stomach (no eating/drinking)."],
      ["li", "lvl 2 Intermediate: Restraining the body (eyes, ears, tongue) from sin."],
      [
        "li",
        "lvl 3 High Level: Restraining the heart from anything other than Allah (Total focus).",
      ],
      ["li", "Goal: Let’s aim for Level 2 and 3 this Ramadan!"],
      ["p", "3. Dua = Spiritual “Prompt Engineering”"],
      ["li", "Dua is how we ask Allah for what we need."],
      [
        "li",
        "To get the best “output,” we must ask with humility, praise Allah first, and send salutations on the Prophet (SAW).",
      ],
      [
        "li",
        "Best Times: Sujood, before breaking fast, between Adhan & Iqamah, and the last 1/3rd of the night.",
      ],
      ["p", "4. Practical Action Items for Ramadan"],
      [
        "li",
        "Set Realistic Goals: Don’t overcommit. Pick a Surah to memorize (e.g., Surah Al-Mulk or Surah Al-Ma’un) and read its Tafseer/Meaning. Understanding > mindless recitation.",
      ],
      [
        "li",
        "Generosity at Home: Be generous with your family. Buy good food/fruit for them and reduce the burden on the women in the kitchen.",
      ],
      [
        "li",
        "Don’t demand elaborate feasts; keep meals simple and healthy (high protein, less oil/sugar) to stay active for Taraweeh.",
      ],
      [
        "li",
        "Charity: Increase charity for the poor, but start by being kind and generous to your own household.",
      ],
      ["p", "5. Next Steps"],
      ["p", "Let’s set our individual goals (Memorization, Tajweed, or Tafseer)."],
      ["li", "Plan your Taraweeh location (focus on quality/peace over speed)."],
      ["p", "May Allah allow us to reach Ramadan and maximize its blessings. Aameen!"],
    ],
  },
  {
    id: "leadership-in-the-home-lessons-from-faith-and-life-seerah-series",
    title: "Leadership in the Home: Lessons from Faith and Life – Seerah series",
    programme: "/iwan-youth",
    date: "2026-02-09",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-12.57.05-PM.jpeg?w=1200&ssl=1",
    excerpt:
      "The Seerah session focused on the true meaning of leadership within the family, inspired by prophetic teachings and the example of Umar ibn al-Khattab (RA).",
    body: [
      [
        "p",
        "The Seerah session focused on the true meaning of leadership within the family, inspired by prophetic teachings and the example of Umar ibn al-Khattab (RA).",
      ],
      [
        "p",
        "Leadership was explained not as control or authority, but as responsibility, guidance, and mercy.",
      ],
      [
        "p",
        "A powerful example shared was that of camel-tending. Every camel has a different nature and requires individual care, yet all must be kept together as one flock.",
      ],
      [
        "p",
        "Similarly, every family member—spouse, children, parents—has a unique temperament.",
      ],
      [
        "p",
        "A leader must understand each person individually while keeping the family united.",
      ],
      ["p", "A. Two Essential Responsibilities of a Leader."],
      ["p", "A family leader must focus on both worlds:"],
      ["p", "1. Worldly (Dunyā) Responsibilities"],
      [
        "li",
        "Teaching beneficial skills needed today (education, English language, basic finance, social awareness).",
      ],
      [
        "li",
        "Creating an environment of learning at home—children learn by watching elders.",
      ],
      ["p", "B. Spiritual (Ākhirah) Responsibilities"],
      ["li", "Teaching faith, worship, and the reality of death and the Hereafter."],
      [
        "li",
        "Connecting the family to the Qur’an with understanding, not just recitation.",
      ],
      [
        "li",
        "Teaching duʿāʾs, dhikr, charity, and basic Islamic beliefs (Īmān, angels, Jannah, Jahannam).",
      ],
      ["li", "How the Prophet trained His Family"],
      ["li", "Emphasized sincerity in worshipping (no showing off)."],
      ["li", "Preferred small but consistent good deeds over big but irregular ones."],
      ["li", "Chose easy and sustainable acts of worship, not hardship."],
      ["li", "Encouraged charity, good character, and helping others."],
      ["li", "Corrected mistakes gently and discouraged harshness."],
      ["p", "2. Core Character Traits to Build at Home"],
      ["li", "Tolerance (Ṣabr): Accepting what cannot be changed."],
      ["li", "Kindness: In speech, service, and daily interactions."],
      ["li", "Forbearance: Staying calm, positive, and dignified even in difficulty."],
      ["li", "Good speech: No shouting, abuse, or foul language."],
      ["li", "Balanced worship: Avoiding extremism and burnout."],
      ["p", "Key Reminder"],
      [
        "li",
        "Children and family members learn more from what we do than from what we say.",
      ],
      ["li", "A leader must first learn and practice before teaching others."],
      ["p", "Final Message"],
      [
        "p",
        "A true leader is not just a provider, but a mentor, role model, and protector—someone who safeguards the family from harm, nurtures faith and character, and prepares them for success in both this life and the Hereafter.",
      ],
    ],
  },
  {
    id: "mental-models-for-markets-technology-life",
    title: "Mental Models for Markets, Technology & life",
    programme: "/iwan-youth",
    date: "2025-11-29",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-01-at-14.44.01_fc4d96b4.jpg?w=1200&ssl=1",
    excerpt:
      "We are living through a transition most people can sense but cannot quite describe. For decades, the people who knew more, read more, and analysed more had an advantage. That advantage disappeared the moment AI turned knowledge into a commodity. When a model can learn a discipline over a weekend, “being informed” stops being a differentiator.",
    body: [
      ["h", "Mental Models for Markets, Technology & life By Muhammad Yusuf"],
      [
        "p",
        "We are living through a transition most people can sense but cannot quite describe. For decades, the people who knew more, read more, and analysed more had an advantage. That advantage disappeared the moment AI turned knowledge into a commodity. When a model can learn a discipline over a weekend, “being informed” stops being a differentiator.",
      ],
      [
        "p",
        "This shift has created anxiety for many, but it also opens an opportunity. The cost of learning, building, and experimenting has collapsed. Execution is becoming the new scarcity. The rules for operating in markets, technology, and careers are changing. What follows is a clearer set of principles for navigating this environment.",
      ],
      ["h", "1. Your Edge Isn’t Knowing, It’s Doing"],
      [
        "p",
        "AI removed the premium on knowledge. Skills that once set people apart, like synthesising information or researching a sector, can now be replicated within minutes. The advantage has moved to judgment, speed, and ownership.",
      ],
      [
        "p",
        "Judgment is the ability to decide what deserves your attention. Speed is the ability to move from idea to action without hesitation. Ownership is what ensures your efforts compound instead of being captured by someone else.",
      ],
      [
        "p",
        "In my own research work, AI can generate drafts and analyse patterns, but it cannot replace trust, instinct, or the human parts of the job. The edge is shifting from finding information to using it in ways that machines cannot replicate.",
      ],
      ["h", "2. The Biggest Rewards Hide in Uncertainty"],
      [
        "p",
        "Every major cycle rewards people who act before the story is fully formed. Humans naturally move toward consensus because it feels safe. The problem is that consensus is expensive. By the time something feels obvious, most of the upside has been captured.",
      ],
      [
        "p",
        "A decade ago, Bitcoin at ten dollars looked ridiculous. Every major asymmetric opportunity looks like that at the beginning. The better question is not “What should we have bought then?” but “Which ideas today look unclear or unpopular but have real structural momentum behind them?”",
      ],
      [
        "p",
        "Operating in uncertain spaces is no longer optional. It is a strategy with the highest payoff.",
      ],
      ["h", "3. Treat Your Attention Like Capital"],
      [
        "p",
        "Content is now infinite. Attention is not. With AI generating text, images, and ideas at scale, the competition for your focus has reached an extreme.",
      ],
      [
        "p",
        "Your attention behaves like an investment. Imam al-Ghazali’s idea that each hour is a vault of gold feels especially relevant now. The cost of distraction is not just lost time. It is lost compounding. Modern feeds and AI content farms exist to drain attention from anyone who is not careful. Blind spots around focus are no longer harmless. They are expensive.",
      ],
      ["h", "4. Actionable Ideas Have a Half-Life"],
      [
        "p",
        "Every useful insight decays once enough people discover it. Arbitrage opportunities in markets, careers, and information shrink the moment they become widely understood. Consider a simple example. If apples cost ten rupees in one village and thirteen in another, the advantage lasts only until more traders notice it. Eventually, the prices meet in the middle.",
      ],
      [
        "p",
        "Bitcoin at ten dollars was powerful not because the idea was complex, but because few people recognised it. As awareness grew, the edge faded. AI accelerates this decay curve across everything we do. The time between spotting an opportunity and losing it is shrinking. Acting early is the only reliable protection.",
      ],
      ["h", "5. Shift From Participant to Owner"],
      [
        "p",
        "Participation is interchangeable. Ownership is not. As AI automates larger portions of labour, the safest position to be in is one where you own the outcome rather than renting out your time.",
      ],
      [
        "p",
        "Consider Truebill. Three brothers built a simple consumer finance app, grew it, and sold it for more than a billion dollars. That type of outcome is only possible when you own a part of what you build. It does not happen through salaries or hours worked.",
      ],
      ["h", "Conclusion: What Will You Build"],
      [
        "p",
        "We are leaving the information age and entering an execution age. AI equalises access to knowledge but widens the gap between people who act and people who hesitate. The edge now lies in choosing what to focus on, acting before consensus forms, recognising how quickly opportunities expire, and building things you can own.",
      ],
      [
        "p",
        "The cost of creation has never been this low. The available tools have never been this powerful. The only meaningful question left is simple:",
      ],
      ["p", "Now that knowledge is free, what will you do with it?"],
    ],
  },
  {
    id: "kids-cooking-session",
    title: "Kid’s Cooking Session",
    programme: "/iwan-kids",
    date: "2025-11-01",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/11/DSC06096.jpg?w=1200&ssl=1",
    excerpt:
      "The IWAN Kids Cooking Session was a beautiful and engaging experience filled with learning, creativity, and joy. Children arrived with their own ingredients and stepped into a lively cooking space, excited to try something new.",
    body: [
      [
        "p",
        "The IWAN Kids Cooking Session was a beautiful and engaging experience filled with learning, creativity, and joy. Children arrived with their own ingredients and stepped into a lively cooking space, excited to try something new.",
      ],
      [
        "p",
        "We began by helping the kids wash, peel, and chop their vegetables safely. For many of them, it was their first time handling simple kitchen tasks, and they enjoyed the confidence it gave them. One of the highlights of the session was teaching the children how to make fresh homemade mayonnaise from scratch. They whisked and mixed the ingredients and watched the texture change in real time, which felt magical to them.",
      ],
      [
        "p",
        "Once the mayonnaise was ready, the kids assembled their sandwiches with the fillings they brought. They also learned how to toast the sandwiches using a toaster while understanding both safety and technique. The happiness on their faces when they tasted something they made themselves was truly priceless.",
      ],
      [
        "p",
        "Overall, the session was a wonderful blend of hands-on learning, teamwork, and fun. It was inspiring to see the children take pride in their creations, help one another, and walk away with a new life skill.",
      ],
      [
        "p",
        "At IWAN Kids, we believe in nurturing confidence through real experiences. This cooking workshop reflected that mission beautifully.",
      ],
    ],
  },
  {
    id: "building-habits-by-ashik-hameed",
    title: "Building Habits",
    programme: "/iwan-youth",
    date: "2025-11-22",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/11/DSC06064.jpg?w=1200&ssl=1",
    excerpt:
      "Executive Summary This document synthesizes the core principles of habit formation, drawing from neuroscience, behavioral psychology, and practical life examples. The central argument posits a fundamental shift away from outcome-oriented goals towards the development of identity-based, daily habits. Lasting change is achieved not by focusing on a distant target, but by consistently executing small, repeatable actions that reinforce a desired identity.",
    body: [
      ["h", "Building Habits By Ashik Hameed"],
      [
        "p",
        "Executive Summary This document synthesizes the core principles of habit formation, drawing from neuroscience, behavioral psychology, and practical life examples. The central argument posits a fundamental shift away from outcome-oriented goals towards the development of identity-based, daily habits. Lasting change is achieved not by focusing on a distant target, but by consistently executing small, repeatable actions that reinforce a desired identity.",
      ],
      [
        "p",
        "The most critical principle is Identity-Based Habit Formation , which involves changing one’s self-perception (e.g., from “I want to read” to “I am a reader”) as the primary driver of behavior. This internal shift precedes and facilitates the process and the eventual outcome.",
      ],
      [
        "p",
        "Key strategies for implementation include the 2-Minute Rule , which advocates for breaking down any new habit into an action that can be completed in under two minutes to reduce initial friction. This is complemented by the Four Laws of Behavior Change : to build a good habit, one must make it Obvious, Attractive, Easy, and Satisfying . Conversely, to break a bad habit, one must make it Invisible, Unattractive, Difficult, and Dissatisfying . The power of these small, consistent actions is amplified over time through compounding, eventually surpassing the results of intermittent, high-intensity efforts. Environment, patience, and consistency are paramount to navigating the initial “valley of disappointment” before significant results become visible.",
      ],
      ["h", "1. The Fundamental Shift: From Goals to Habits"],
      [
        "p",
        "The primary thesis presented is a re-evaluation of how personal and professional achievements are approached. It argues for a move away from a singular focus on long-term goals and toward the cultivation of daily systems and habits.",
      ],
      [
        "li",
        "Core Idea: The most significant factor in achieving any long-term objective is not the goal itself, but the small, consistent daily actions that lead to it.",
      ],
      [
        "li",
        "Quote: “A lot of people talk about goals… but the most important thing that is going to factor in is not focusing on your goals… you have to focus on a daily basis on your habits that’s the most important shift that we have to do.”",
      ],
      [
        "li",
        "Supporting Principle: A connection is made to a hadith where Allah values small, regularly performed actions more than large, infrequent ones, underscoring the power of consistency.",
      ],
      ["h", "2. The Core Principle: Identity-Based Habit Formation"],
      [
        "p",
        "The most profound and effective approach to behavioral change is to start with identity. This framework suggests that true transformation begins from the inside out, rather than the outside in.",
      ],
      ["h", "The Three Layers of Behavioral Change"],
      ["p", "Behavioral change can be understood as occurring on three levels:"],
      ["li", "Outcomes: The results (e.g., losing weight, writing a book)."],
      [
        "li",
        "Processes: The systems and actions (e.g., going to the gym, writing a page a day).",
      ],
      [
        "li",
        "Identity: One’s beliefs, self-image, and worldview (e.g., “I am an athletic person,” “I am a writer”).",
      ],
      [
        "p",
        "The conventional approach is to start with the desired outcome and work inward. The more effective, identity-based approach starts with the desired identity and works outward.",
      ],
      [
        "li",
        "Quote: “If you have plans and goals and everything but you have not changed who you are you won’t be able to like build that habit.”",
      ],
      [
        "h",
        "Practical Application of Identity Shift Instead of an Outcome-Based Goal… Adopt an Identity-Based Belief… “I want to run a marathon.” “I am a runner.” “I want to write a book.” “I am a writer.” “I want to learn AI.” “I am a learner.” “I want to go to the gym.” “I am athletic.” “I want to cook more.” “I am a cook.”",
      ],
      [
        "p",
        "This principle is equally powerful for breaking negative habits. Rather than stating “I’m trying to quit smoking,” which reinforces the identity of a smoker attempting to change, one should adopt the identity of a non-smoker: “I am not a smoker.” This shift in self-perception fundamentally alters decision-making when confronted with triggers.",
      ],
      ["h", "3. A Practical Framework: The Four Laws of Behavior Change"],
      [
        "p",
        "Habits operate on a neurological feedback loop: Cue → Craving → Response → Reward . To successfully build or break a habit, one must manipulate the four levers that correspond to this loop.",
      ],
      [
        "h",
        "Building Good Habits vs. Breaking Bad Habits Law To Build a Good Habit Example To Break a Bad Habit (The Inversion) Example 1st Law Make it Obvious Place running shoes by the door to cue a morning jog. Make it Invisible If you want to stop smoking, ensure no cigarettes are visible in your home or car. 2nd Law Make it Attractive Pair a habit you want to build (running) with one you enjoy (listening to a podcast). Make it Unattractive Focus on the negative consequences of the bad habit (e.g., the health risks of smoking). 3rd Law Make it Easy Use the 2-Minute Rule: break the habit down to its simplest form (e.g., just put on gym clothes). Make it Difficult Increase friction. To reduce phone use, give it to someone else for a set period. 4th Law Make it Satisfying Create an immediate reward. Feeling good after a workout is a natural reward; creating another can also work. Make it Unsatisfying Associate the bad habit with a negative feeling. If your identity is “non-smoker,” smoking would create cognitive dissonance.",
      ],
      ["h", "4. Key Strategies and Tactics for Implementation"],
      ["h", "The 2-Minute Rule"],
      [
        "p",
        "To overcome the initial inertia of starting a new habit, break it down into a “gateway” action that takes less than two minutes to complete.",
      ],
      [
        "li",
        "Reading: The goal is not to read a book, but to read one page. If that’s too hard, the goal is to open the book. If that’s too hard, the goal is to place the book on the table.",
      ],
      [
        "li",
        "Gym: The goal is not a full workout, but simply to put on your gym clothes.",
      ],
      [
        "li",
        "Brushing Teeth at Night: The goal is not a full brush, but to just go to the bathroom and rinse your mouth with water.",
      ],
      ["h", "Habit Stacking"],
      ["p", "Anchor a new desired habit to an existing, firmly established one."],
      [
        "li",
        "Example: “After I pray Fajr (existing habit), I will open my learning website for two minutes (new habit).”",
      ],
      ["h", "The Power of Compounding & The Valley of Disappointment"],
      [
        "p",
        "Small, consistent habits build upon themselves, leading to exponential growth over time. However, in the initial stages, progress can be imperceptibly slow, leading to a “valley of disappointment” where motivation wanes.",
      ],
      [
        "li",
        "It is crucial to show patience and maintain consistency through this period, understanding that the most significant results appear later.",
      ],
      [
        "li",
        "The example of Warren Buffett’s wealth, which grew exponentially late in his life, is cited as an illustration of long-term compounding.",
      ],
      ["h", "Environment Design"],
      [
        "p",
        "The context in which a behavior occurs is a powerful driver. Modifying one’s environment can make desired habits easier and undesired habits harder.",
      ],
      [
        "li",
        "Physical Space: To encourage reading, go to a library. To encourage prayer, go to a mosque.",
      ],
      [
        "li",
        "Social Circle: To become an entrepreneur, surround yourself with entrepreneurs.",
      ],
      [
        "li",
        "Case Study: During the Vietnam War, many U.S. soldiers used heroin. Upon returning to the U.S., a new environment devoid of the war’s triggers, 9 out of 10 quit almost immediately. This demonstrates the powerful influence of context on habits.",
      ],
      ["h", "5. High-Performance Habits for Growth"],
      [
        "p",
        "Beyond specific actions like reading or exercising, it is beneficial to cultivate broader, foundational habits that enable high performance in any field. These are presented as competencies to build.",
      ],
      [
        "li",
        "Seeking Clarity: The habit of actively working to understand oneself, a problem, or the next steps. This can be achieved through reading, research, networking with experts, or data analysis.",
      ],
      [
        "li",
        "Generating Energy: The habit of maintaining physical and mental vitality. This is not limited to one activity but includes whatever works for the individual, such as proper sleep, nutrition, exercise (gym, running, push-ups), prayer, or meditation.",
      ],
      [
        "li",
        "Creating Necessity: The habit of engineering circumstances where high performance is required. This raises the stakes and creates an external pressure to improve. Examples include joining Toastmasters to become a better speaker or having a family to support.",
      ],
      [
        "li",
        "Developing Influence: The habit of building trust, credibility, and positive relationships. This is achieved by helping others and demonstrating expertise, creating a network of support and reciprocity.",
      ],
      ["h", "6. Perspective on “Hustle Culture”"],
      [
        "p",
        "The concept of “hustle culture”—characterized by constant productivity and guilt during periods of rest—is discussed as a potentially toxic and unsustainable model for long-term success.",
      ],
      [
        "li",
        "Critique: Sustainable achievement requires balance. A lack of rest and recovery will inevitably lead to burnout, undermining long-term goals. It can lead to “horizontal” knowledge (knowing buzzwords) without the “vertical” depth of true expertise.",
      ],
      [
        "li",
        "Long-Term View: The emphasis should be on building systems and habits that are sustainable for the long run.",
      ],
      [
        "li",
        "Future Trend: The re-emergence of the “polymath” (an expert in multiple fields, like Leonardo da Vinci) is predicted, as AI tools will enable individuals to develop deep competencies across various domains, challenging the modern trend of hyper-specialization.",
      ],
    ],
  },
  {
    id: "financial-literacy-for-muslims-building-confidence-and-long-term-stability",
    title: "Financial Literacy for Muslims: Building Confidence and Long-Term Stability",
    programme: "/iwan-youth",
    date: "2025-11-15",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-15-at-01.48.55_9feb00fc.jpg?w=1200&ssl=1",
    excerpt:
      "This session introduced the community to why financial literacy matters—especially for Muslims who want to manage their money in a halal, responsible way. The discussion covered how understanding basic financial concepts can make day-to-day decisions easier and help everyone feel more confident about their financial future.",
    body: [
      [
        "h",
        "Financial Literacy for Muslims: Building Confidence and Long-Term Stability By Mohammed Ashhar",
      ],
      [
        "p",
        "This session introduced the community to why financial literacy matters—especially for Muslims who want to manage their money in a halal, responsible way. The discussion covered how understanding basic financial concepts can make day-to-day decisions easier and help everyone feel more confident about their financial future.",
      ],
      [
        "p",
        "A big part of the session focused on long-term investing and how the stock market can be a practical tool for building wealth over time. Participants learned about halal investing, the power of compounding, and simple strategies for starting their investment journey with patience and consistency.",
      ],
      [
        "p",
        "By the end, attendees walked away with a clearer picture of how smart, values-aligned financial choices can support one’s personal goals in the long term.",
      ],
    ],
  },
  {
    id: "glass-painting-workshop",
    title: "Glass Painting Workshop",
    programme: "/iwan-kids",
    date: "2025-11-01",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/11/DSC05966.jpg?w=1200&ssl=1",
    excerpt:
      "Our Glass Painting Workshop at IWAN Kids was a vibrant and joy-filled experience, where children explored creativity through the beautiful art of glass painting. The session was facilitated by Laiba Fathima , a passionate artist with a deep love for crafts, painting, and creative expression. Her gentle guidance and enthusiasm made the workshop engaging, inspiring the kids to learn with confidence and curiosity. During the session, children discovered how colours blend on glass, experimented with patterns, and created unique artworks that reflected their imagination. From choosing their designs to completing their masterpieces, every step was met with excitement and pride.",
    body: [
      ["h", "Glass Painting"],
      [
        "p",
        "Our Glass Painting Workshop at IWAN Kids was a vibrant and joy-filled experience, where children explored creativity through the beautiful art of glass painting. The session was facilitated by Laiba Fathima , a passionate artist with a deep love for crafts, painting, and creative expression. Her gentle guidance and enthusiasm made the workshop engaging, inspiring the kids to learn with confidence and curiosity. During the session, children discovered how colours blend on glass, experimented with patterns, and created unique artworks that reflected their imagination. From choosing their designs to completing their masterpieces, every step was met with excitement and pride.",
      ],
      [
        "p",
        "This workshop not only introduced a new skill but also helped the kids develop patience, focus, and artistic confidence. Moments like these reflect IWAN’s commitment to nurturing young minds through meaningful, hands-on learning experiences.",
      ],
      [
        "p",
        "We look forward to bringing many more creative sessions to our community and helping children explore the joy of learning through art.",
      ],
    ],
  },
  {
    id: "educational-visit-to-param-science-center-jayanagar",
    title: "Educational Visit to Param Science Center, Jayanagar",
    programme: "/iwan-kids",
    date: "2025-11-05",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-05-at-15.15.51_9739df76.jpg?w=1200&ssl=1",
    excerpt:
      "The visit to Param Science Center (PARSEC) in Jayanagar was an enriching educational experience designed to spark curiosity and scientific thinking among young learners. Spanning various interactive zones, the center offers an immersive journey through science, technology, and innovation.",
    body: [
      [
        "p",
        "The visit to Param Science Center (PARSEC) in Jayanagar was an enriching educational experience designed to spark curiosity and scientific thinking among young learners. Spanning various interactive zones, the center offers an immersive journey through science, technology, and innovation.",
      ],
      [
        "p",
        "During the session, children actively engaged with hands-on exhibits that demonstrated key scientific principles in an enjoyable and accessible way. The visit included exploring Physics and Energy galleries , where participants experimented with forces, motion, and light; the Innovation Zone , which showcased models of sustainable technologies; and the Space Exploration Section , igniting interest in astronomy and planetary science.",
      ],
      [
        "p",
        "Each activity encouraged observation, collaboration, and inquiry-based learning. The facilitators guided participants through practical demonstrations, making abstract scientific concepts tangible. The interactive format promoted teamwork, creativity, and deeper understanding aligning with Iwan’s mission of holistic learning and curiosity-driven education.",
      ],
      [
        "p",
        "The session concluded with a reflection segment, where children shared their favorite discoveries, reinforcing the joy of learning through exploration. Overall, the visit to PARSEC provided a memorable blend of education, excitement, and inspiration cultivating a lifelong love for science.",
      ],
    ],
  },
  {
    id: "emotional-granularity",
    title: "Emotional Granularity",
    programme: "/iwan-youth",
    date: "2025-11-01",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/11/DSC05944-1.jpg?w=1200&ssl=1",
    excerpt:
      "This is a summary of the session on Emotional Granularity, which aims to help participants precisely label their feelings to better manage them. The speaker, introduced as Brother Zayan, explains the neuroscientific basis of emotions, introducing concepts such as the prefrontal cortex (logic brain), the amygdala (emotional brain), and the role of hormones like cortisol and dopamine in stress and motivation. A significant portion of the discussion addresses the addictive nature of social media scrolling, linking it to the unpredictable release of dopamine and drawing parallels to gambling and drug addiction. Furthermore, the session touches upon the importance of parenting and early childhood safety for developing emotional regulation skills, with an emphasis on the vital role of motherhood and strong family structures in fostering emotional stability within children and the broader community, linking these ideas to a local group initiative called Iwan.",
    body: [
      ["p", "Emotional Granularity Session By Zayan Riyaz Summary:"],
      [
        "p",
        "This is a summary of the session on Emotional Granularity, which aims to help participants precisely label their feelings to better manage them. The speaker, introduced as Brother Zayan, explains the neuroscientific basis of emotions, introducing concepts such as the prefrontal cortex (logic brain), the amygdala (emotional brain), and the role of hormones like cortisol and dopamine in stress and motivation. A significant portion of the discussion addresses the addictive nature of social media scrolling, linking it to the unpredictable release of dopamine and drawing parallels to gambling and drug addiction. Furthermore, the session touches upon the importance of parenting and early childhood safety for developing emotional regulation skills, with an emphasis on the vital role of motherhood and strong family structures in fostering emotional stability within children and the broader community, linking these ideas to a local group initiative called Iwan.",
      ],
      ["h", "Briefing Document: Emotional Granularity and Regulation Executive Summary"],
      [
        "p",
        "This document synthesizes the key themes from a presentation on the neuroscience of emotional management. The central thesis posits that effective emotional control is a two-step process: Emotional Granularity (the awareness and precise labeling of one’s feelings) and Emotional Regulation (the subsequent action of processing those feelings). The ability to articulate emotions with specificity is presented as a prerequisite for the brain’s logical centers to effectively manage signals from its emotional centers, thereby reducing stress. Furthermore, it analyzes modern challenges, such as the addictiveness of social media, which are engineered to exploit the brain’s dopamine-driven reward systems and disrupt natural emotional baselines. The session concludes by outlining practical, biology-based techniques for calming the nervous system and emphasizes the critical role of community in fostering emotional well-being.",
      ],
      ["h", "1.0 Core Concepts: Granularity and Regulation"],
      [
        "p",
        "The presentation establishes a foundational framework for understanding emotional intelligence through two distinct but interconnected concepts: granularity and regulation.",
      ],
      ["h", "1.1 Emotional Granularity: The Awareness Phase"],
      [
        "p",
        "Emotional Granularity is defined as the ability to identify and label feelings with precision and articulation, moving beyond vague, generalized terms. It is framed as the “awareness part” of emotional management.",
      ],
      [
        "li",
        "Vague vs. Specific Language: Using a general term like “I’m upset” confuses the brain. In contrast, a specific statement like, “I am anxious because I feel unprepared for the session, and I’m embarrassed,” provides the brain with clear, actionable information.",
      ],
      [
        "li",
        "The “Vague Bucket” Problem: Without specific labels, emotions are thrown into a metaphorical “vague bucket.” The brain cannot effectively process an undefined feeling like “sad” because it lacks context regarding its specific nature and intensity.",
      ],
      [
        "li",
        "The Importance of Vocabulary: Having a rich “emotional vocabulary” is critical. The brain can only begin to process what it can name. Understanding the nuances between words like “rage” and “annoyed,” or “loathing” and “boredom,” allows for a more accurate diagnosis of one’s internal state, which is the first step toward regulation.",
      ],
      ["h", "1.2 Emotional Regulation: The Action Phase"],
      [
        "p",
        "Emotional Regulation is the “action part” that follows awareness. It is the biological process by which the logical part of the brain processes and calms the signals sent by the emotional part.",
      ],
      [
        "li",
        "The Processing Analogy: The process is compared to an engine processing fuel. If emotions (fuel) are constantly supplied without being processed, it leads to an overflow or burnout (chronic stress). Regulation is the engine’s work of processing that fuel.",
      ],
      [
        "li",
        "The Outcome: Successful regulation leads to a tangible sense of calm. It is described as the logical brain telling the emotional brain to “chill out,” resulting in the dissipation of physical stress symptoms like tightness in the chest.",
      ],
      ["h", "2.0 The Neuroscience of Emotion"],
      [
        "p",
        "The presentation simplifies complex neurobiology to explain the mechanics behind emotional responses and regulation.",
      ],
      ["h", "2.1 The Brain’s Key Players"],
      [
        "p",
        "The brain is described as having distinct parts with specialized roles, personified to enhance understanding. Brain Part Simplified Name Nickname(s) Function Prefrontal Cortex Logic Brain “Logical Sister” The rational decision-maker. Responsible for thinking, evaluating, and processing information. Amygdala Emotional Brain “Smoke Detector,” “Bodyguard,” “Emotional Ba(i)” The center for survival instincts and threat detection (real or imaginary). It acts quickly, often before the logic brain, releasing stress hormones. Hippocampus Memory Brain “The Library” Stores and retrieves memories, which can inform the amygdala’s threat assessment (“Is this threat happening again?”).",
      ],
      ["h", "2.2 The Chemical Messengers"],
      [
        "p",
        "Three key hormones are identified as central to mood and motivation. Hormone Primary Function Description Cortisol The Stress Hormone Released by the amygdala when a threat is perceived, signaling the body to be on alert. Dopamine The Motivation/Anticipation Hormone Drives the pursuit of rewards. It is often confused with being a “happy hormone,” but its primary role is motivation. Serotonin The Satisfaction/Contentment Hormone Associated with feelings of well-being and contentment after a goal is achieved or a need is met.",
      ],
      ["h", "2.3 The Threat Response Mechanism"],
      [
        "p",
        "When an individual perceives a threat—from seeing a police car to being called on by a speaker—the following sequence occurs:",
      ],
      [
        "li",
        "Detection: The amygdala (Emotional Brain) detects the threat, acting as a “smoke detector.”",
      ],
      [
        "li",
        "Alarm: It immediately releases cortisol, the stress hormone, into the body.",
      ],
      [
        "li",
        "Signal: It sends a distress signal to the prefrontal cortex (Logic Brain).",
      ],
      [
        "li",
        "Dysregulation: A problem arises when the Logic Brain cannot understand or process the signal because it is too vague (e.g., “I’m sad”). This leads to a state of prolonged stress as the alarm continues without resolution.",
      ],
      ["h", "3.0 Practical Techniques for Emotional Regulation"],
      [
        "p",
        "The session outlines several biologically-grounded methods to manually calm the nervous system and aid the regulation process.",
      ],
      ["h", "3.1 Activating the Vagus Nerve: The Body’s “Chill Button”"],
      [
        "p",
        "The vagus nerve, which runs from the brainstem to the gut, is identified as a key component of the body’s calming system. Activating it helps reduce anxiety.",
      ],
      [
        "li",
        "Double Inhale: A breathing exercise that involves a long inhalation, followed by a short secondary inhalation, and then a slow, extended exhalation. This technique forces small air sacs (alveoli) in the lungs to expel trapped carbon dioxide and maximize oxygen intake, which calms the nervous system. The slow exhale is particularly important for activating the parasympathetic nervous system.",
      ],
      [
        "li",
        "Humming and Recitation: The vibrations created by humming or reciting text (e.g., during Salah) stimulate the vagus nerve where it passes through the throat and chest, inducing a state of calm.",
      ],
      [
        "li",
        "Social Connection (Co-regulation): Humans are wired to mirror the emotional states of others. Being in the presence of a calm individual can literally calm one’s own nervous system. This is observed in how a calm mother can soothe a crying baby.",
      ],
      [
        "li",
        "Grounding Touch and Posture: Physically touching nearby objects serves as a distraction and reminds the prefrontal cortex that the body is safe in the present moment, countering the amygdala’s threat signal.",
      ],
      ["h", "4.0 Modern Challenges to Emotional Regulation"],
      [
        "p",
        "The presentation highlights how modern technology, particularly social media, is engineered to hijack the brain’s neurochemical systems, making emotional regulation more difficult.",
      ],
      ["h", "4.1 The Dopamine Loop of Social Media"],
      [
        "li",
        "Engineered for Addiction: Platforms like TikTok and Instagram Reels are built on the same principles as gambling slot machines. They leverage “operant conditioning” by providing intermittent, unpredictable rewards.",
      ],
      [
        "li",
        "Uncertainty and Anticipation: The user does not know what the next scroll will bring—it could be humorous, sad, interesting, or new (“novelty”). This uncertainty keeps the dopamine system in a constant state of anticipation, creating an addictive loop that is difficult to break.",
      ],
      [
        "li",
        "Elevated Baseline: Constant dopamine spikes from scrolling raise an individual’s baseline dopamine level. Consequently, normal life feels less stimulating and more “boring,” creating a craving to return to the high-stimulation environment of the app.",
      ],
      [
        "li",
        "The “Breadcrumbing” Effect: This is a manipulation tactic where positive reinforcement (e.g., a highly engaging video, attention from someone) is given just enough, and at random intervals, to keep the individual hooked and waiting for the next “breadcrumb.”",
      ],
      ["h", "4.2 Proposed Countermeasures"],
      [
        "p",
        "To combat the addictive nature of these platforms, the following strategies were suggested:",
      ],
      [
        "li",
        "Mindful Usage: Before opening an app, ask, “What exactly am I looking for?” This engages the prefrontal cortex and can prevent mindless scrolling.",
      ],
      [
        "li",
        "Change the Medium: Using social media on a laptop is less accessible and makes scrolling less seamless than on a phone.",
      ],
      [
        "li",
        "Deletion: The most effective method is to delete the applications entirely.",
      ],
      ["h", "5.0 Foundational Influences on Emotional Development"],
      [
        "p",
        "A significant portion of the session focused on the profound and lasting impact of early childhood experiences on an individual’s capacity for emotional regulation.",
      ],
      ["h", "6.0 Gender, Community, and Broader Perspectives"],
      [
        "p",
        "The presentation concludes by touching on gender differences, the importance of community, and the limitations of a purely psychological framework.",
      ],
      ["h", "6.1 Gender-Specific Regulation Strategies"],
      [
        "p",
        "Based on observed data, a distinction is made in how men and women typically regulate emotions:",
      ],
      [
        "li",
        "Men: Tend to regulate better in silence and solitude, preferring to think through issues internally.",
      ],
      [
        "li",
        "Women: Tend to regulate better by “venting” or talking through their feelings. This verbal processing allows them to articulate and name their emotions, initiating the granularity-to-regulation process.",
      ],
      ["h", "6.2 The “Iwan” Community Initiative"],
      [
        "p",
        "An initiative named “Iwan” was introduced with the goal of fostering “collective transformation.”",
      ],
      [
        "li",
        "Core Mission: To bring people together to find purpose, build character, and develop knowledge and ethical wealth.",
      ],
      [
        "li",
        "Structure: Separate groups for men (“center”) and women are being formed to create supportive communities, aligning with the idea that social connection is vital for co-regulation.",
      ],
      ["h", "6.3 Acknowledged Limitations"],
      ["p", "The speaker provided two important disclaimers:"],
      [
        "li",
        "Incompleteness of Psychology: A purely psychological or neuroscientific view is considered incomplete without the spiritual framework of Islam, including concepts of Allah, the soul ( kalb ), and intellect ( aqal ).",
      ],
    ],
  },
  {
    id: "cursor-workshop",
    title: "Cursor Workshop",
    programme: "/iwan-youth",
    date: "2025-10-25",
    img: "https://i0.wp.com/www.iwan.community/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-25-at-11.04.24_b1d6663b.jpg?w=1200&ssl=1",
    excerpt:
      "This is a summary of the session on Cursor Workshop by Shaikh Siraj, Senior Software Developer at LinkedIn , which explores the functionalities and usage of an AI-powered coding agent , likely within a development environment like VS Code. Key topics covered include the request-based pricing model for the service, which charges per interaction, and the concept of tokens and context windows in large language models. The speaker discusses different agent models (e.g., GPT-4, Flaw) and operating modes (Agent, Plan, Ask), explaining how the agent can directly interact with codebases, perform complex tasks like building web pages, and even integrate with external services via an MCP (Model Context Protocol) to access repositories and documentation. The conversation also emphasises the importance of being efficient and precise with prompts and highlights best practices and rules that can be set within the Cursor environment to streamline workflow and improve productivity.",
    body: [
      ["p", "Cursor Workshop By Shaikh Siraj Summary :"],
      [
        "p",
        "This is a summary of the session on Cursor Workshop by Shaikh Siraj, Senior Software Developer at LinkedIn , which explores the functionalities and usage of an AI-powered coding agent , likely within a development environment like VS Code. Key topics covered include the request-based pricing model for the service, which charges per interaction, and the concept of tokens and context windows in large language models. The speaker discusses different agent models (e.g., GPT-4, Flaw) and operating modes (Agent, Plan, Ask), explaining how the agent can directly interact with codebases, perform complex tasks like building web pages, and even integrate with external services via an MCP (Model Context Protocol) to access repositories and documentation. The conversation also emphasises the importance of being efficient and precise with prompts and highlights best practices and rules that can be set within the Cursor environment to streamline workflow and improve productivity.",
      ],
      ["h", "Briefing Document: An Analysis of the Cursor AI Development Environment"],
      ["h", "Executive Summary"],
      [
        "p",
        "This document synthesizes an in-depth analysis of Cursor, an AI-powered code editor designed to augment developer productivity. Built as a “wrapper over VS Code,” Cursor integrates advanced AI agents directly into the integrated development environment (IDE), enabling them to read, write, and understand entire codebases.",
      ],
      [
        "p",
        "The platform’s business model is a critical factor, operating on a request-based subscription where each interaction with the AI consumes a finite monthly allotment. This places a premium on user efficiency and strategic prompting. Key functionalities include a selection of powerful AI models (e.g., GPT-4.5, Claude), distinct interaction modes (Agent, Plan, Ask), and sophisticated context management features.",
      ],
      [
        "p",
        "A standout innovation is the Model-Context Protocol (MCP), which empowers the AI agent to interact with external data sources and services like GitHub, Jira, and Figma, vastly expanding its operational scope beyond the local repository. While Cursor can deliver significant productivity gains—estimated by the speaker to be as high as 3x—it is not a replacement for foundational engineering skills. The speaker emphasizes that human oversight and active code review are essential to prevent subtle, agent-induced errors from reaching production. The tool is best understood as a powerful assistant for skilled developers, not a fully autonomous programmer.",
      ],
      ["h", "1. Core Concepts of the Cursor Platform"],
      ["h", "1.1. Architectural Overview"],
      [
        "p",
        "Cursor is an AI-native code editor that functions as a sophisticated layer on top of the familiar Visual Studio (VS) Code interface. Its primary innovation is the direct integration of an AI “Agent” within the IDE, accessible through a dedicated chat panel. This allows the AI to have full access to the project’s file structure and codebase, eliminating the need for manual copy-pasting of code into an external chatbot. The speaker describes it as a “rapper over VS code” that has “invented this particular chat and they integrated the AI.”",
      ],
      ["h", "1.2. The Request-Based Economic Model"],
      [
        "p",
        "A central theme is Cursor’s usage-based pricing, which differs from typical flat-rate subscriptions. This model has significant implications for how the tool is used.",
      ],
      [
        "li",
        "Request Allotment: Enterprise-level subscriptions provide a fixed number of requests per month (e.g., 500).",
      ],
      [
        "li",
        "Cost Per Interaction: Every message sent to the agent, from a simple “hello” to a complex build command, consumes at least one request. As the speaker notes, quoting Sam Altman, “every high you do or every hello you do it’s going to cost a lot of activity.”",
      ],
      [
        "li",
        "Variable Cost: More powerful AI models, particularly those designed for complex reasoning (“thinking models”), can consume more requests per interaction (e.g., 2x the base cost).",
      ],
      [
        "li",
        "Overage: Once the monthly allotment is exhausted, users can continue making requests up to a specified dollar limit (e.g., 25-35), which provides an additional pool of requests.",
      ],
      [
        "p",
        "This economic model forces users to be highly efficient and deliberate in their interactions with the AI.",
      ],
      ["h", "1.3. AI Models and Context Windows"],
      [
        "p",
        "Cursor provides access to a variety of AI models, each with distinct capabilities, costs, and context limits.",
      ],
      [
        "li",
        "Available Models: The platform includes models from major providers, such as GPT-4.5 (OpenAI), various Claude models (Anthropic), and Gemini (Google).",
      ],
      [
        "li",
        "Specialized Use Cases: The speaker has developed a personal preference based on performance:",
      ],
      ["li", "GPT Models: Best for high-level “thinking,” system design, and planning."],
      ["li", "Claude Models: Excel at code implementation."],
      [
        "li",
        "Context Window: This refers to the amount of information an AI model can hold in its “memory” at one time. It is measured in tokens, which roughly correspond to words.",
      ],
      ["li", "A 100k token context window can process approximately 70,000 words."],
      ["li", "A 1 million token context window can process approximately 700,000 words."],
      [
        "li",
        "Context Management: As a conversation progresses, the context window fills up. Once the limit is reached, the agent can no longer process new information in that thread. To manage this, the agent continuously summarizes the conversation to retain key information more efficiently.",
      ],
      ["h", "2. Key Features and Functionality"],
      ["h", "2.1. Interaction Modes"],
      [
        "p",
        "Cursor offers several modes to control how the user interacts with the AI agent, tailoring its behavior to specific tasks. Mode Functionality Use Case Agent Mode The default mode where the AI directly understands prompts and makes changes to the codebase. General-purpose coding, refactoring, and feature implementation. Plan Mode The AI first generates a detailed, step-by-step plan of action before executing any code changes. The user can review and edit this plan. Complex tasks requiring oversight. Described as “handholding” for the agent, who is likened to a “junior engineer.” Ask Mode The AI functions as an explanatory chatbot. It will answer questions and explain code but will not make any changes to the files. Code comprehension, learning, and asking general programming questions.",
      ],
      ["h", "2.2. Model-Context Protocol (MCP)"],
      [
        "p",
        "MCP is a pivotal feature that allows the Cursor agent to “talk to other outside people,” breaking free from the confines of the local repository. It acts as an integration layer for external services.",
      ],
      [
        "li",
        "Purpose: To provide the agent with context and data from external platforms and tools.",
      ],
      [
        "li",
        "Supported Integrations: The platform has pre-built MCPs for services like:",
      ],
      ["li", "Jira (project management)"],
      ["li", "Figma (UI/UX design)"],
      ["li", "Notion (documentation)"],
      ["li", "GitHub (code hosting and collaboration)"],
      [
        "li",
        "Custom MCPs: Companies can build their own MCPs for internal services, allowing the agent to interact with proprietary code repositories and documentation.",
      ],
      [
        "li",
        "Practical Example: A user can provide the agent a link to a Jira ticket. The agent uses the Jira MCP to access the ticket, understand the bug report or feature request, and then formulate a solution within the codebase.",
      ],
      ["h", "2.3. Context and History Management"],
      [
        "p",
        "Cursor includes several features to manage the conversational context, which is crucial given the limitations of context windows.",
      ],
      [
        "li",
        "@past chats Feature: When a new chat is started (losing the previous context), this feature allows a user to explicitly import the summarized context from a prior conversation. The agent automatically processes this summary to regain knowledge of previous work.",
      ],
      [
        "li",
        "File and Folder Scoping: Users can direct the agent to focus its attention exclusively on specific files or folders, preventing it from reading the entire repository and thereby conserving context window space.",
      ],
      [
        "li",
        "Image and Screenshot Analysis: The agent can analyze images and screenshots. A user can provide a screenshot of a desired UI, and the agent will attempt to generate the corresponding code.",
      ],
      ["h", "2.4. .cursor Rules Engine"],
      [
        "p",
        "To ensure consistency and enforce repository-specific standards, users can define a set of rules in a special .cursor package within their project.",
      ],
      ["li", "Configuration File: Rules are defined in a file with an .mdc extension."],
      ["li", "Rule Application: Rules can be configured to:"],
      ["li", "Always Apply: The rule is executed with every agent interaction."],
      ["li", "Apply Intelligently: The agent decides when the rule is relevant."],
      [
        "li",
        "Apply to Specific Files: The rule only triggers when changes are made to specified frontend or backend files.",
      ],
      [
        "li",
        "Example Workflow: A common rule is to mandate that after writing new code, the agent must also write corresponding unit tests, run the entire test suite, and automatically fix any failures before finishing its task.",
      ],
      ["h", "3. Workflow, Best Practices, and Limitations"],
      ["h", "3.1. Productivity Enhancements"],
      [
        "p",
        "The speaker asserts that Cursor dramatically accelerates the development lifecycle.",
      ],
      [
        "li",
        "Rapid Onboarding: A developer new to a project can ask the agent to “go over the entire repository and make me understand everything,” reducing onboarding time from days to half a day.",
      ],
      [
        "li",
        "Accelerated Development: Simple UI components or features can be generated in minutes. For example, the agent can take a screenshot of a fundraiser display and replicate its functionality.",
      ],
      [
        "li",
        "Efficient Debugging: Instead of manually searching for the cause of an error, a developer can provide the agent with the error message or a link to a failed build, and the agent can trace the issue through the codebase.",
      ],
      [
        "li",
        "Overall Impact: The speaker estimates a personal productivity increase of at least 3x .",
      ],
      ["h", "3.2. Best Practices for Effective Use"],
      [
        "p",
        "To maximize value and manage costs, the speaker recommends several best practices:",
      ],
      [
        "li",
        "Be an Efficient Prompter: Avoid conversational filler. Prompts should be direct and information-dense, as every message has a cost. The speaker advises, “we have to be very efficient in how we use this one request.”",
      ],
      [
        "li",
        "Provide Clear Context (“Handholding”): Treat the agent like a knowledgeable but inexperienced junior engineer. Point it to the right files and explain the specific requirements and constraints of the task.",
      ],
      [
        "li",
        "Use Plan Mode for Complexity: For any non-trivial task, use Plan Mode to review the agent’s proposed approach before it begins coding, preventing wasted requests on an incorrect implementation.",
      ],
      [
        "li",
        "Leverage External Knowledge: Use MCP and provide links to documentation, design files, or repositories to give the agent the richest possible context.",
      ],
      ["h", "3.3. Critical Limitations and Required Oversight"],
      [
        "p",
        "Despite its power, the speaker offers strong cautions against over-reliance on the agent.",
      ],
      [
        "p",
        "Requires Foundational Knowledge: The tool is an amplifier of skill, not a substitute for it. A user must possess fundamental programming knowledge to guide the agent effectively, validate its output, and debug problems. The speaker states, “…we should be at a stage that we should be able to do our stuff as well and we just taking help of agent that it should not be the case that agent is doing everything for us.”",
      ],
      [
        "p",
        "Risk of Subtle Errors: The agent is not infallible and can introduce bugs that are difficult to spot. The speaker recounts a personal experience where agent-generated code passed peer review but caused a production deployment to fail.",
      ],
      [
        "p",
        "Human Review is Non-Negotiable: “We cannot be entire dependent on agent.” Active, critical review of all AI-generated code by a skilled human developer is essential to ensure quality and correctness.",
      ],
    ],
  },
  {
    id: "painting-blog",
    title:
      "Kids’ painting is a delightful activity that fosters creativity, imagination, and self-expression.",
    programme: "/iwan-kids",
    date: null,
    img: null,
    excerpt:
      "Kids’ painting is a joyful and creative activity that plays a crucial role in a child’s overall development. It allows children to express their emotions, thoughts, and imagination through colors, shapes, and patterns. Painting not only nurtures artistic abilities but also enhances fine motor skills, hand-eye coordination, and focus.",
    body: [
      [
        "p",
        "Kids’ painting is a joyful and creative activity that plays a crucial role in a child’s overall development. It allows children to express their emotions, thoughts, and imagination through colors, shapes, and patterns. Painting not only nurtures artistic abilities but also enhances fine motor skills, hand-eye coordination, and focus.",
      ],
      [
        "p",
        "Through painting, children learn to explore and combine different colors, experiment with textures, and bring their ideas to life on paper or canvas. It provides a safe and enjoyable way for kids to communicate feelings they might not yet be able to put into words.",
      ],
      [
        "p",
        "Moreover, painting fosters problem-solving and decision-making skills as children decide what to draw, which colors to use, and how to bring their vision to life. It also builds patience and perseverance, as children learn to complete their artwork step by step.",
      ],
      [
        "p",
        "Participating in painting activities encourages self-confidence and pride in their creations, boosting their sense of achievement. Whether painting with fingers, brushes, or sponges, this activity",
      ],
    ],
  },
];

export default BLOGS;
