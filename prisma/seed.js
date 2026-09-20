"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
// Helper to pick random items
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomSample(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Subsets of avatar styles for variety
const AVATAR_STYLES = ['avataaars', 'bottts', 'personas', 'lorelei', 'micah', 'thumbs'];
const RAW_USERS_DATA = [
    {
        name: "Elena Rostova",
        username: "elena_dev",
        bio: "Staff Frontend Engineer @ CloudScale. Passionate about #React19, Web Performance & Accessibility 🚀",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Marcus Vance",
        username: "marcus_ai",
        bio: "AI Research Scientist working on Agentic Systems & Multi-Modal LLMs. Exploring the boundary of machine cognition. #AI #GenAI",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Sarah Chen",
        username: "sarahcodes",
        bio: "Next.js core contributor enthusiast. Building design systems & fullstack apps. #Nextjs15 #TypeScript",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Alex Rivera",
        username: "alex_rivera",
        bio: "Founder @ IndieShip. Bootstrapping SaaS to $50k MRR in public. TypeScript, Postgres, Tailwind lover. #IndieHacker #BuildInPublic",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Priya Sharma",
        username: "priya_design",
        bio: "Product Designer & Design Systems lead. Making pixels crisp and UI/UX delightful. #TailwindCSS #DesignSystems",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "David Kim",
        username: "david_rust",
        bio: "Systems Programmer | Rust & Go backend engineer. Writing zero-cost abstractions and ultra-fast APIs. #RustLang #Backend",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Zoe Bennett",
        username: "zoe_fullstack",
        bio: "Building distributed cloud architectures. Open source believer & conference speaker. ☕️ Turning coffee into PRs.",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Lucas Moreira",
        username: "lucas_devops",
        bio: "DevOps & Kubernetes wrangler. Terraform, Docker, AWS & CI/CD automation. #DevOps #Cloud",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Maya Lin",
        username: "maya_ai",
        bio: "LLM Agentic Developer. Fine-tuning open models and building autonomous pair programmers. #AI #OpenSource",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Liam O'Connor",
        username: "liam_tech",
        bio: "Senior Architect @ Nova Labs. Writing about clean architecture, micro frontends & TypeScript patterns.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Chloe Dubois",
        username: "chloe_ui",
        bio: "UI engineer obsessed with micro-interactions and smooth animations. Framer Motion + Tailwind wizard.",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Hassan Al-Mansoor",
        username: "hassan_cloud",
        bio: "Cloud & Security Engineer. Zero-trust architecture, OAuth2, and scalable cloud infra. 🛡️",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Sophie Taylor",
        username: "sophie_codes",
        bio: "Frontend Dev & Tech Blogger. Exploring React Server Components, Astro, and Edge runtimes. #WebDev",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Ethan Wright",
        username: "ethan_oss",
        bio: "Full-time Open Source Maintainer. Creator of developer tools & CLI utilities. Sponsor me on GitHub! 🌟 #OpenSource",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Amina Yusuf",
        username: "amina_data",
        bio: "Data Engineer & Pythonista. Building real-time data streaming pipelines with Kafka and Spark. 📊",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Kenji Sato",
        username: "kenji_js",
        bio: "TypeScript artisan from Tokyo. Deep diving into JavaScript engines, V8 optimizations and Bun runtime. #TypeScript",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Isabella Rossi",
        username: "bella_code",
        bio: "Software Engineer @ Milan. React, GraphQL, and modern web apps. Coffee & clean code enthusiast ☕️",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Noah Patel",
        username: "noah_pg",
        bio: "Database Architect. Mastering Postgres indexes, query optimization, and sharding strategies. #Postgres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Grace Hopper Fan",
        username: "grace_h",
        bio: "Compiler enthusiast, debugging queen. If debugging is the process of removing bugs, programming must be putting them in! #CodingLife",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces&q=80",
        cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=260&fit=crop&q=80",
    },
    {
        name: "Dev Meme Hub",
        username: "dev_memes",
        bio: "Daily programming memes, relatable coding struggles, and tech humor. Git push --force your problems away. 🚀",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=dev_memes",
        cover: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=260&fit=crop&q=80",
    }
];
// Generate additional 100+ programmatically generated realistic users
const FIRST_NAMES = [
    "Aaron", "Abigail", "Adam", "Adrian", "Aiden", "Alan", "Albert", "Alice", "Alicia", "Amelia",
    "Andre", "Andrew", "Angela", "Anthony", "Arthur", "Austin", "Benjamin", "Brandon", "Brian", "Bruce",
    "Caleb", "Cameron", "Carlos", "Catherine", "Charles", "Charlotte", "Christian", "Claire", "Colin", "Daniel",
    "Derek", "Diana", "Dominic", "Dylan", "Edward", "Eli", "Elizabeth", "Emily", "Eric", "Evan",
    "Felix", "Fiona", "Gabriel", "Gavin", "George", "Hannah", "Harry", "Henry", "Ian", "Isaac",
    "Jack", "Jacob", "James", "Jasmine", "Jason", "Jeffrey", "Jeremy", "Jessica", "Joel", "Jonathan",
    "Jordan", "Joseph", "Joshua", "Julia", "Justin", "Kai", "Karen", "Kevin", "Kyle", "Lauren",
    "Leo", "Leonard", "Logan", "Louis", "Lucas", "Luke", "Malcolm", "Marcus", "Martin", "Matthew",
    "Max", "Megan", "Michael", "Nathan", "Nicholas", "Nico", "Noah", "Oliver", "Oscar", "Patrick",
    "Paul", "Peter", "Philip", "Rachel", "Raymond", "Richard", "Robert", "Robin", "Ryan", "Sam",
    "Samuel", "Sean", "Sebastian", "Simon", "Steven", "Thomas", "Timothy", "Tristan", "Tyler", "Victor",
    "Vincent", "Walter", "William", "Zachary", "Zack"
];
const LAST_NAMES = [
    "Adams", "Anderson", "Baker", "Barnes", "Bell", "Bennett", "Brooks", "Brown", "Butler", "Campbell",
    "Carter", "Clark", "Collins", "Cooper", "Cox", "Cruz", "Davis", "Diaz", "Edwards", "Evans",
    "Fisher", "Flores", "Foster", "Garcia", "Gomez", "Gonzalez", "Gray", "Green", "Hall", "Harris",
    "Hayes", "Henderson", "Hernandez", "Hill", "Howard", "Hughes", "Jackson", "James", "Jenkins", "Johnson",
    "Jones", "Kelly", "King", "Lee", "Lewis", "Long", "Lopez", "Martin", "Martinez", "Miller",
    "Mitchell", "Moore", "Morgan", "Morris", "Murphy", "Myers", "Nelson", "Nguyen", "Ortiz", "Parker",
    "Perez", "Perry", "Peterson", "Phillips", "Powell", "Price", "Ramirez", "Reed", "Reyes", "Richardson",
    "Rivera", "Roberts", "Robinson", "Rodriguez", "Rogers", "Ross", "Russell", "Sanchez", "Sanders", "Scott",
    "Simmons", "Smith", "Stewart", "Sullivan", "Taylor", "Thomas", "Thompson", "Torres", "Turner", "Walker",
    "Ward", "Watson", "White", "Williams", "Wilson", "Wood", "Wright", "Young"
];
const ROLES = [
    "Frontend Engineer", "Fullstack Developer", "Software Architect", "AI Engineer",
    "Backend Specialist", "UI/UX Designer", "DevOps Consultant", "Open Source Builder",
    "Indie Hacker", "Tech Lead", "Data Scientist", "Mobile App Developer",
    "Cloud Engineer", "Product Manager", "Security Researcher", "Developer Advocate"
];
const INTERESTS = [
    "Building fast web apps with #Nextjs15 & #TypeScript.",
    "Exploring generative agents, prompt routing, and LLMs. #AI",
    "Obsessed with clean CSS, micro-interactions, and #TailwindCSS.",
    "Writing memory-efficient microservices in #RustLang and Go.",
    "Deep diving into #Postgres indexing, latency, and Prisma schema.",
    "Shipping SaaS in public. From 0 to $10K MRR. #IndieHacker",
    "Contributing to OSS tools and developer ergonomics. #OpenSource",
    "Making web performance instant. Core Web Vitals enthusiast. #WebDev",
    "Turning bugs into features and coffee into clean code. #CodingLife",
    "Experimenting with #React19 actions, server functions, and compilers."
];
// Rich Posts dataset matching trending hashtags
const POST_TEMPLATES = [
    // #Nextjs15
    "Just migrated our entire enterprise frontend to #Nextjs15. The cold start improvement with Turbopack is astonishing—sub-50ms HMR on a 200k LOC codebase! ⚡️ #WebDev",
    "Server Actions in #Nextjs15 combined with optimistic UI updates make web forms feel completely instantaneous. No more boilerplate redux or complex state synchronization. 🚀",
    "Partial Prerendering (PPR) in #Nextjs15 is genuinely the best architecture for e-commerce. Instant static shells with streaming dynamic personalized carts. Game changer! 🔥",
    "Pro tip for #Nextjs15: Use `useOptimistic` for instant feed interactions. The perceived latency drops to zero and your users will love the snappy feel. #Frontend",
    "Next.js App Router has matured so much. Nested layouts, parallel routes, and intercepting modals make building complex Twitter-style dashboards a breeze. #Nextjs15",
    // #AI & Agents
    "The shift from simple LLM chatbots to autonomous agent workflows with structured outputs is the biggest paradigm shift in software since cloud computing. #AI #GenAI",
    "Running local open-weights models on consumer hardware at 80 tokens/second is mind-blowing. The future of software is local-first AI paired with fast edge APIs. #AI",
    "Agentic pair programming is not about replacing developers—it is about removing 90% of repetitive boilerplate so engineers can focus purely on architecture and UX. #AI",
    "Just hooked our vector database with pgvector to an embedding agent pipeline. Query latency is under 15ms across 2 million documents. The power of #Postgres & #AI! 🧠",
    "Prompt engineering is evolving into prompt compilation and typed schema evaluation. Structured JSON validation is mandatory for production AI agents. #GenAI",
    // #TypeScript
    "TypeScript 5.5's inferred type predicates are such an understated feature. Filtering arrays no longer requires ugly type assertions: `arr.filter(Boolean)` just works! 💎 #TypeScript",
    "The `satisfies` operator in #TypeScript is one of those features that once you start using, you can never go back to `as Type`. Preserves literal types while enforcing contract! 👌",
    "Clean code tip: Avoid `any` at all costs. Use `unknown` with type narrowing or generic constraints. Your future self debugging at 2 AM will thank you. #TypeScript #WebDev",
    "Mapped types and template literal types in #TypeScript allow you to build completely type-safe API clients where endpoints and payload types are autocomplete-driven! 🚀",
    // #TailwindCSS
    "Tailwind CSS v4's CSS-first configuration and lightning-fast compiler is pure joy. No more massive js configs, just pure modern CSS variables and container queries. #TailwindCSS",
    "Dark mode design tip: Don't just invert colors to pure `#000000`. Use subtle layered dark neutrals (`#0f172a`, `#18181b`) and lower opacity borders for high-end polish! #TailwindCSS #UI",
    "Glassmorphism with `backdrop-blur-md bg-white/80 dark:bg-black/80 border border-neutral-200/50` instantly elevates any modern web application UI. #TailwindCSS #DesignSystems",
    "Mobile-first responsive design in Tailwind: Start at base classes without breakpoint prefixes, then scale gracefully with `sm:`, `md:`, and `lg:`. Keeps CSS payload tiny! #WebDev",
    // #OpenSource
    "Just hit 1,000 stars on our open source developer utility! Thank you so much to everyone who contributed issues, PRs, and stars. Open source community is incredible! 🌟 #OpenSource",
    "Maintaining open source teaches you more about software engineering, empathy, and code reviews than any corporate tutorial ever could. Proud of our contributors! #OpenSource #DevCommunity",
    "Always remember to sponsor the open-source libraries that power your production stack. Sustainable OSS benefits the entire tech ecosystem. 💖 #OpenSource",
    "Clean pull request checklist:\n1. Atomic commits\n2. Clear description with before/after screenshots\n3. Comprehensive test coverage\n4. Zero lint warnings. #OpenSource #CodingLife",
    // #RustLang
    "Rewrote our high-throughput analytics ingestion microservice in #RustLang. CPU usage dropped by 78% and memory consumption went from 4GB down to 120MB. Incredible efficiency! 🦀",
    "The Rust compiler is the strictest code reviewer you will ever have, but once your code compiles, it just runs flawlessly in production. Zero memory leaks, fearless concurrency. #RustLang",
    "Tokio runtime and async streams in #RustLang are unmatched for WebSocket gateways and distributed consensus engines. #Backend #Systems",
    // #Postgres
    "Postgres continues to prove why it is the default database for 99% of web apps. JSONB columns, pgvector for semantic search, CTEs, and row-level security in one battle-tested engine! #Postgres",
    "Database optimization tip: Always check your `EXPLAIN ANALYZE` output. Adding a composite index on `(userId, createdAt DESC)` reduced our query time from 420ms to 2.1ms! ⚡️ #Postgres",
    "Connection pooling with PgBouncer is mandatory for serverless environments. Don't let 500 cold lambdas exhaust your database connection pool! #Postgres #Backend",
    // #IndieHacker & BuildInPublic
    "Milestone unlocked: $5,000 MRR on our developer analytics SaaS! Built in public over the last 6 months with Next.js, Stripe, and Tailwind. Next stop: $10k MRR! 🚀 #IndieHacker #BuildInPublic",
    "The fastest way to validate a SaaS idea: Build a landing page, launch a clean interactive demo, talk to 20 potential customers, and see if they enter a credit card before writing 50k lines of backend. #IndieHacker",
    "Don't build in secret for 6 months. Ship a minimal viable version in 2 weeks, put it in front of real users, gather feedback, and iterate relentlessly. Speed is your only moat! #BuildInPublic",
    // #CodingLife & Tech Humor
    "There are only two hard problems in computer science: cache invalidation, naming things, and off-by-one errors. 😅 #CodingLife",
    "Nothing brings more dopamine than seeing a CI pipeline turn green on the first try after a complex refactor! ✅ #CodingLife #WebDev",
    "Senior developer: 'I wrote 3 lines of code today.'\nJunior developer: 'That took all day?'\nSenior developer: 'It took 6 hours of reading code to know WHICH 3 lines to change.' 🧠 #DevCommunity",
    "Remember to drink water, stretch your back, and commit your working branch before going to sleep. ☕️ Happy coding everyone!",
    "CSS: 'I can center a div in 3 different ways in 2026.'\nBrowser: 'Are you sure about that?' 😂 #WebDev #TailwindCSS",
    "A bug in production is just an unplanned real-world stress test. 🐛🛠️ #CodingLife"
];
// Conversational comments for posts
const COMMENT_TEMPLATES = [
    "Couldn't agree more with this! Experienced the exact same improvement on our stack.",
    "What is the performance overhead when scaling this to tens of thousands of concurrent users?",
    "This saved our team hours of debugging today. Thank you for sharing this gem! 🔥",
    "Do you have a GitHub example repo or gist for this implementation? Would love to study the architecture.",
    "100% accurate. We implemented this last month and our Core Web Vitals score shot up to 99!",
    "Great breakdown! How do you handle edge cases when the network drops temporarily?",
    "Bookmarked! One of the most concise and practical explanations on my feed today.",
    "Awesome work! Excited to see how this evolves in the next major release.",
    "Have you benchmarked this against the standard approach? Curious about memory metrics.",
    "This is why I love the developer community on Twitter. Continuous learning everyday! 🚀",
    "Super crisp UI! The attention to micro-interactions and dark mode palette really shines here.",
    "Spot on! Adding this to our team's engineering guidelines right away."
];
async function main() {
    console.log('🚀 Starting comprehensive database population...');
    // 1. Check existing users
    const existingUsers = await prisma.user.findMany();
    console.log(`Found ${existingUsers.length} existing users in the database.`);
    const defaultPasswordHash = await bcrypt.hash('password123', 10);
    // 2. Prepare 130+ distinct user profiles
    const usersToCreate = [...RAW_USERS_DATA];
    for (let i = 0; i < 115; i++) {
        const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
        const lastName = LAST_NAMES[(i * 3 + 7) % LAST_NAMES.length];
        const role = ROLES[i % ROLES.length];
        const interest = INTERESTS[i % INTERESTS.length];
        const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${i > 40 ? i : ''}`;
        const avatarStyle = AVATAR_STYLES[i % AVATAR_STYLES.length];
        usersToCreate.push({
            name: `${firstName} ${lastName}`,
            username: username,
            bio: `${role}. ${interest}`,
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${username}`,
            cover: i % 3 === 0 ? `https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=800&h=260&fit=crop&q=80` : undefined,
        });
    }
    console.log(`Prepared ${usersToCreate.length} user definitions.`);
    // 3. Upsert / Create users in DB
    const createdUsers = [];
    for (const u of usersToCreate) {
        try {
            const email = `${u.username}@example.com`;
            const user = await prisma.user.upsert({
                where: { username: u.username },
                update: {
                    name: u.name,
                    bio: u.bio,
                    profileImage: u.avatar,
                    coverImage: u.cover || null,
                },
                create: {
                    name: u.name,
                    username: u.username,
                    email: email,
                    emailVerified: new Date(Date.now() - randomInt(1, 90) * 86400000),
                    profileImage: u.avatar,
                    coverImage: u.cover || null,
                    hashedPassword: defaultPasswordHash,
                    createdAt: new Date(Date.now() - randomInt(30, 365) * 86400000),
                    followingIds: [],
                }
            });
            createdUsers.push(user);
        }
        catch (err) {
            // Ignore duplicates or minor validation errors
        }
    }
    // Include any pre-existing users (like Feril Sunu)
    for (const existing of existingUsers) {
        if (!createdUsers.some(u => u.id === existing.id)) {
            createdUsers.push(existing);
        }
    }
    console.log(`✅ Successfully seeded/updated ${createdUsers.length} users in database.`);
    // 4. Create Inter-User Follow Relationships
    console.log('🔗 Creating realistic follow relationships between users...');
    const userIds = createdUsers.map(u => u.id);
    for (const user of createdUsers) {
        const followCount = randomInt(8, 30);
        const targetUsers = randomSample(userIds.filter(id => id !== user.id), followCount);
        // Also make 20-30% of users follow Feril Sunu if present
        const ferilUser = createdUsers.find(u => u.username === 'feril');
        if (ferilUser && user.id !== ferilUser.id && Math.random() > 0.6) {
            if (!targetUsers.includes(ferilUser.id)) {
                targetUsers.push(ferilUser.id);
            }
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                followingIds: targetUsers
            }
        });
    }
    console.log('✅ Follow relationships established.');
    // 5. Populate Posts (350+ posts with realistic engagement & timestamps)
    console.log('📝 Generating 350+ realistic tweets and discussions...');
    const postsToCreate = [];
    const now = Date.now();
    // Distribute posts across users
    for (let i = 0; i < 380; i++) {
        const author = randomChoice(createdUsers);
        const template = POST_TEMPLATES[i % POST_TEMPLATES.length];
        // Spread timestamps across the last 7 days (newer posts in recent hours)
        let minutesAgo;
        if (i < 30) {
            minutesAgo = randomInt(2, 60); // Last hour
        }
        else if (i < 100) {
            minutesAgo = randomInt(60, 720); // 1-12 hours ago
        }
        else if (i < 200) {
            minutesAgo = randomInt(720, 2880); // 1-2 days ago
        }
        else {
            minutesAgo = randomInt(2880, 10080); // 2-7 days ago
        }
        const postDate = new Date(now - minutesAgo * 60 * 1000);
        // Pick random likes from user pool
        const isViral = i % 15 === 0;
        const isPopular = i % 4 === 0;
        const likeCount = isViral ? randomInt(45, 95) : isPopular ? randomInt(15, 40) : randomInt(2, 12);
        const likers = randomSample(userIds, Math.min(likeCount, userIds.length));
        postsToCreate.push({
            body: template,
            userId: author.id,
            likedIds: likers,
            createdAt: postDate,
            updatedAt: postDate,
        });
    }
    // Insert posts in batches
    const insertedPosts = [];
    for (const postData of postsToCreate) {
        try {
            const p = await prisma.post.create({
                data: postData
            });
            insertedPosts.push(p);
        }
        catch (e) {
            // Ignore individual insert failure
        }
    }
    console.log(`✅ Successfully created ${insertedPosts.length} posts.`);
    // 6. Populate Comments / Replies (250+ comments)
    console.log('💬 Generating comments & discussions on posts...');
    let commentCount = 0;
    for (const post of insertedPosts) {
        // 60% of posts have 1 to 5 comments
        if (Math.random() > 0.4) {
            const numComments = randomInt(1, 4);
            for (let c = 0; c < numComments; c++) {
                const commenter = randomChoice(createdUsers);
                const commentText = randomChoice(COMMENT_TEMPLATES);
                const commentDate = new Date(new Date(post.createdAt).getTime() + randomInt(5, 120) * 60 * 1000);
                try {
                    await prisma.comment.create({
                        data: {
                            body: commentText,
                            userId: commenter.id,
                            postId: post.id,
                            createdAt: commentDate,
                            updatedAt: commentDate,
                        }
                    });
                    commentCount++;
                }
                catch (e) {
                    // Ignore
                }
            }
        }
    }
    console.log(`✅ Successfully created ${commentCount} interactive comments.`);
    console.log('🎉 Population completed successfully!');
}
exports.main = main;
if (require.main === module) {
    main()
        .catch((e) => {
        console.error('❌ Error during population:', e);
        process.exit(1);
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
