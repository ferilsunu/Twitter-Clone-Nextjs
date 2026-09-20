# Twitter Clone (Next.js & Tailwind CSS)

A fullstack, production-ready Twitter/X clone built with Next.js, React, Tailwind CSS, Prisma, MongoDB, and NextAuth. Features modern responsive design, light and dark themes, real-time interactions, deep hashtag navigation, and skeleton loaders.

---

## Live Demo & Links

- Live Application: [twitter.ferilsunu.com](https://twitter.ferilsunu.com)
- Portfolio: [ferilsunu.com](https://ferilsunu.com)
- GitHub Repository: [github.com/ferilsunu/Twitter-Clone-Nextjs](https://github.com/ferilsunu/Twitter-Clone-Nextjs)

---

## Key Features

- **Modern Responsive Design**: Industry-standard 3-column desktop layout (Sidebar navigation, Feed, and Widgets) with a glassmorphic bottom navigation bar for mobile devices.
- **Light & Dark Mode**: Persistent theme switcher with light mode as default and zero-flash theme persistence via local storage.
- **Authentication & Security**: Secure credential authentication via NextAuth.js, bcrypt password hashing, IDOR protection, and HTTP security headers.
- **Tweets & Interactive Feeds**: Post tweets with auto-expanding textarea, like animations with heart pop effects, repost indicators, and clipboard share toasts.
- **Conversations & Comment Threads**: Full multi-user reply threads with relative timestamps and author details.
- **User Profiles & Customization**: Customizable profile photos, verified cover banners, bio editing with drag-and-drop image uploads, follower/following metrics, and tabbed post history.
- **Live Search & Trending Topics**: Explore feed with interactive hashtag filtering (`#Nextjs15`, `#AI`, `#TypeScript`), search query auto-sync, and trending volume statistics.
- **Interactive Hashtags**: Clickable `#hashtags` inside tweets and comments that route instantly to search results.
- **High Performance Skeleton Loading**: Smooth pulse skeleton placeholders for the home feed, user profile transitions, and post view pages.
- **Real-Time Notifications**: In-app activity notifications triggered on likes, follows, and replies.
- **Database Seeding Suite**: Built-in seeding script to populate 135+ realistic developer/creator users, 380+ tweets with likes, and 600+ comments.

---

## Tech Stack

- **Framework**: Next.js 13 (Pages Router)
- **Frontend**: React 18, Tailwind CSS, SWR (State & Caching)
- **Database & ORM**: MongoDB, Prisma ORM
- **Authentication**: NextAuth.js, Bcrypt
- **Icons & UI Utilities**: React Icons, React Hot Toast, React Dropzone, Date-fns, Zustand
- **Typography**: Inter & JetBrains Mono Google Fonts
- **Deployment**: Ubuntu Linux VPS, PM2, Nginx, Cloudflare SSL

---

## Project Structure

```text
Twitter-Clone-Nextjs/
├── components/
│   ├── layout/
│   │   ├── FollowBar.tsx         # Trending topics, search widget, who to follow
│   │   ├── MobileNav.tsx         # Mobile bottom glassmorphic bar
│   │   ├── Sidebar.tsx           # Desktop sidebar navigation
│   │   └── SidebarItem.tsx       # Sidebar navigation link items
│   ├── modals/
│   │   ├── EditModal.tsx         # Profile edit modal with image upload
│   │   ├── LoginModal.tsx        # Sign in modal
│   │   └── RegisterModal.tsx     # Registration modal
│   ├── posts/
│   │   ├── CommentFeed.tsx       # List of comment items
│   │   ├── CommentItem.tsx       # Individual reply item with formatted text
│   │   ├── PostFeed.tsx          # Dynamic feed with skeleton states
│   │   └── PostItem.tsx          # Tweet card with like, reply, share actions
│   ├── skeletons/
│   │   ├── PostSkeleton.tsx      # Shimmer placeholder for tweets
│   │   ├── PostViewSkeleton.tsx  # Shimmer placeholder for post details
│   │   └── ProfileSkeleton.tsx   # Shimmer placeholder for user profiles
│   ├── users/
│   │   ├── UserBio.tsx           # User bio, stats, and profile tabs
│   │   └── UserHero.tsx          # Cover banner and overlapping avatar
│   ├── Avatar.tsx                # Dynamic avatar with fallback support
│   ├── Header.tsx                # Header bar with back navigation
│   ├── ImageUpload.tsx           # Base64 image dropzone uploader
│   ├── Input.tsx                 # Form text input
│   ├── Layout.tsx                # 3-column responsive shell
│   └── Modal.tsx                 # Accessible modal dialog wrapper
├── hooks/                        # SWR hooks (useCurrentUser, usePosts, useUser, etc.)
├── libs/
│   ├── fetcher.ts                # Axios SWR data fetcher
│   ├── formatText.tsx            # Clickable hashtag and mention parser
│   ├── prismadb.ts               # Global Prisma client singleton
│   └── serverAuth.ts             # Server-side authentication guard
├── pages/
│   ├── api/                      # Next.js API route handlers
│   ├── posts/[postId].tsx        # Single tweet discussion page
│   ├── users/[userId].tsx        # User profile page
│   ├── notifications.tsx         # Activity notifications page
│   ├── search.tsx                # Search and explore page
│   ├── _app.tsx                  # Next.js app wrapper with modal providers
│   ├── _document.tsx             # Document shell with theme script and favicons
│   └── index.tsx                 # Main feed home page
├── prisma/
│   ├── schema.prisma             # MongoDB database schema definition
│   └── seed.ts                   # Comprehensive database population script
├── public/                       # Static favicons, touch icons, and images
├── styles/globals.css            # Tailwind directives and custom animations
├── next.config.js                # Next.js configuration and image security
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Database (Local instance or MongoDB Atlas)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ferilsunu/Twitter-Clone-Nextjs.git
   cd Twitter-Clone-Nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mongodb://username:password@127.0.0.1:27017/twitterclone?authSource=admin"
   NEXTAUTH_JWT_SECRET="your_custom_jwt_secret"
   NEXTAUTH_SECRET="your_custom_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Push the Prisma schema to MongoDB:
   ```bash
   npx prisma db push
   ```

5. (Optional) Populate dummy users, tweets, likes, and comments:
   ```bash
   npm run seed
   ```

6. Start the local development server:
   ```bash
   npm run dev
   ```

7. Open your browser at:
   ```text
   http://localhost:3000
   ```

---

## Database Seeding

To quickly populate the application with a vibrant feed:

```bash
npm run seed
```

This generates:
- 135+ diverse developer and creator accounts with lightweight SVG and portrait avatars.
- 380+ tweets across trending categories (`#Nextjs15`, `#AI`, `#TypeScript`, `#TailwindCSS`, `#OpenSource`, `#RustLang`, `#Postgres`, `#IndieHacker`).
- Realistic follow relationships and like distributions.
- 600+ interactive comments and replies.

---

## License

This project is open source and available under the ISC License.

Developed by [Feril Sunu](https://ferilsunu.com).
