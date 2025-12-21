"use client";
import PostDisplay from "./post-display";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react"
import { MyFeedQuery } from "@/graphql/types/graphql";

export const PostContainer = ({ postsData, loadMore, loading }: { loadMore: () => void, loading: boolean, postsData?: MyFeedQuery['myFeed'] }) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  // const { postsData, loadMore, loading } = useMyFeed();

  console.log("MY FEED", postsData)
  useEffect(() => {
    const element = loaderRef.current
    if (!element) {
      return
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    })
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [loadMore, postsData?.nextCursor])
  return (
    <>
      {postsData ? (
        postsData?.data.map((postData,) => {
          return (
            <motion.div key={postData.post._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0.95 }} transition={{ duration: 0.4, delay: 1.5 }}>
              <div key={postData.post._id}>
                <PostDisplay
                  key={postData.post._id}
                  postData={postData}
                />
              </div>
            </motion.div>
          );
        })
      ) : (
        <></>
      )} <div ref={loaderRef} className="flex justify-center py-8">
        {(!postsData || (postsData?.hasMore && loading)) && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Cargando más posts...</span>
          </div>
        )}

        {
          !loading && (!postsData || !postsData?.hasMore && postsData?.data.length > 0) && (
            <div className="text-center text-muted-foreground">No hay más posts para mostrar</div>
          )}
      </div>
    </>
  );
};