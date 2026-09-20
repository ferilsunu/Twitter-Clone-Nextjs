import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { BiSearch } from "react-icons/bi";

import Header from "@/components/Header";
import usePosts from "@/hooks/usePosts";
import useUsers from "@/hooks/useUsers";
import PostItem from "@/components/posts/PostItem";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: posts = [] } = usePosts();
  const { data: users = [] } = useUsers();

  useEffect(() => {
    if (router.query.q && typeof router.query.q === "string") {
      setSearchTerm(router.query.q);
    }
  }, [router.query.q]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return posts.filter((post: any) => 
      post.body?.toLowerCase().includes(q) || 
      post.user?.name?.toLowerCase().includes(q) || 
      post.user?.username?.toLowerCase().includes(q)
    );
  }, [searchTerm, posts]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return users.filter((user: any) => 
      user.name?.toLowerCase().includes(q) || 
      user.username?.toLowerCase().includes(q) ||
      user.bio?.toLowerCase().includes(q)
    );
  }, [searchTerm, users]);

  const trendingCards = [
    { category: "Technology · Trending", tag: "#Nextjs15", posts: "128.4K posts", desc: "Developers discussing Next.js Server Actions, Partial Prerendering, and Turbopack speed." },
    { category: "Artificial Intelligence · Trending", tag: "#AI", posts: "245.9K posts", desc: "Autonomous AI agents, reasoning models, and agentic pair programming workflows." },
    { category: "Web Development · Trending", tag: "#TypeScript", posts: "98.2K posts", desc: "TypeScript 5.5 type narrowing, satisfies operator, and developer tooling." },
    { category: "Frontend · Trending", tag: "#TailwindCSS", posts: "74.6K posts", desc: "Modern utility-first CSS, dark mode design systems, and responsive layouts." },
    { category: "Open Source · Trending", tag: "#OpenSource", posts: "162.1K posts", desc: "GitHub trending repositories, indie hackers, and community contributions." },
    { category: "Systems & Backend · Trending", tag: "#RustLang", posts: "47.9K posts", desc: "High performance microservices, memory safety, and web server benchmarks." },
  ];

  return ( 
    <>
      <Head>
        <title>{searchTerm ? `${searchTerm} - Search / Twitter` : 'Explore / Twitter'}</title>
      </Head>
      <Header showBackArrow label="Search" />

      {/* Search Input */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-full border border-transparent focus-within:border-sky-500 focus-within:bg-white dark:focus-within:bg-black focus-within:ring-1 focus-within:ring-sky-500 transition">
          <BiSearch size={20} className="absolute left-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts, hashtags (#Nextjs) or people..."
            className="w-full bg-transparent pl-12 pr-4 py-3 text-base text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                router.push('/search', undefined, { shallow: true });
              }}
              className="mr-3 px-2 py-0.5 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full bg-neutral-200 dark:bg-neutral-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {searchTerm.trim() ? (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {/* People matches */}
          {filteredUsers.length > 0 && (
            <div className="p-4 space-y-3">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">People</h3>
              <div className="space-y-2">
                {filteredUsers.slice(0, 8).map((user: any) => (
                  <div
                    key={user.id}
                    onClick={() => router.push(`/users/${user.id}`)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 cursor-pointer transition"
                  >
                    <Avatar userId={user.id} />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-neutral-900 dark:text-white text-sm truncate">
                        {user.name}
                      </span>
                      <span className="text-neutral-500 text-xs truncate">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts matches */}
          {filteredPosts.length > 0 ? (
            <div>
              <div className="p-4 pb-2">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Posts ({filteredPosts.length})
                </h3>
              </div>
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredPosts.map((post: any) => (
                  <PostItem key={post.id} data={post} />
                ))}
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-2">
              <p className="text-lg font-bold text-neutral-800 dark:text-neutral-200">No results found for &ldquo;{searchTerm}&rdquo;</p>
              <p className="text-sm">Try searching for other keywords, hashtags like #Nextjs15 or #AI</p>
            </div>
          ) : null}
        </div>
      ) : (
        /* Default Trending view */
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Trends for you</h3>
          <div className="space-y-2 text-sm">
            {trendingCards.map((item) => (
              <div
                key={item.tag}
                onClick={() => setSearchTerm(item.tag)}
                className="p-3.5 -mx-2 rounded-2xl hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60 transition cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500">{item.category}</p>
                  <span className="text-xs text-neutral-400">{item.posts}</span>
                </div>
                <p className="font-bold text-neutral-900 dark:text-white text-base mt-0.5">{item.tag}</p>
                <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;