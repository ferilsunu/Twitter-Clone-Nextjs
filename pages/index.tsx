import { useState } from "react";
import Head from "next/head";
import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import Form from "@/components/Form";

export default function Home() {
  const [feedTab, setFeedTab] = useState<'forYou' | 'following'>('forYou');

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Header label="Home" />
      
      {/* Home Feed Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 sticky top-[53px] z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors">
        <button
          onClick={() => setFeedTab('forYou')}
          className="flex-1 py-3.5 text-center text-sm font-bold transition hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 relative cursor-pointer"
        >
          <span className={feedTab === 'forYou' ? 'text-neutral-900 dark:text-white font-bold' : 'text-neutral-500 font-medium'}>
            For you
          </span>
          {feedTab === 'forYou' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-sky-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setFeedTab('following')}
          className="flex-1 py-3.5 text-center text-sm font-bold transition hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 relative cursor-pointer"
        >
          <span className={feedTab === 'following' ? 'text-neutral-900 dark:text-white font-bold' : 'text-neutral-500 font-medium'}>
            Following
          </span>
          {feedTab === 'following' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-500 rounded-full" />
          )}
        </button>
      </div>

      <Form placeholder="What is happening?!" />
      <PostFeed />
    </>
  );
}
