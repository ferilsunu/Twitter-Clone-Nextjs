import { useState, useMemo } from "react";
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

  return ( 
    <>
      <Head>
        <title>Explore / Twitter</title>
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
            placeholder="Search posts or people..."
            className="w-full bg-transparent pl-12 pr-4 py-3 text-base text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
            autoFocus
          />
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
                {filteredUsers.map((user: any) => (
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
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Posts</h3>
              </div>
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredPosts.map((post: any) => (
                  <PostItem key={post.id} data={post} />
                ))}
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              No results found for &ldquo;{searchTerm}&rdquo;
            </div>
          ) : null}
        </div>
      ) : (
        /* Default Trending view */
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Trends for you</h3>
          <div className="space-y-3 text-sm">
            <div 
              onClick={() => setSearchTerm("Nextjs")}
              className="p-3 -mx-2 rounded-xl hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition cursor-pointer"
            >
              <p className="text-xs text-neutral-500">Technology · Trending</p>
              <p className="font-bold text-neutral-900 dark:text-white">#Nextjs</p>
              <p className="text-xs text-neutral-500">52.4K posts</p>
            </div>
            <div 
              onClick={() => setSearchTerm("Tailwind")}
              className="p-3 -mx-2 rounded-xl hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition cursor-pointer"
            >
              <p className="text-xs text-neutral-500">Frontend Development · Trending</p>
              <p className="font-bold text-neutral-900 dark:text-white">Tailwind CSS</p>
              <p className="text-xs text-neutral-500">98.1K posts</p>
            </div>
            <div 
              onClick={() => setSearchTerm("AI")}
              className="p-3 -mx-2 rounded-xl hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition cursor-pointer"
            >
              <p className="text-xs text-neutral-500">Artificial Intelligence · Trending</p>
              <p className="font-bold text-neutral-900 dark:text-white">#AI & Agents</p>
              <p className="text-xs text-neutral-500">142.8K posts</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;