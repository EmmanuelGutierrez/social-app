"use client";
import PostDisplay from "./post-display";
import { useEffect, useRef } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { PostMyFeedQuery } from "@/graphql/types/graphql";
import { ErrorLike } from "@apollo/client";

export const PostContainer = ({
  postsData,
  loadMore,
  loading,
  error,
}: {
  loadMore: () => void;
  loading: boolean;
  postsData?: PostMyFeedQuery["PostMyFeed"];
  error?: ErrorLike;
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  // const { postsData, loadMore, loading } = useMyFeed();

  useEffect(() => {
    const element = loaderRef.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && postsData?.hasMore) {
        loadMore();
      }
    });
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [loadMore, postsData?.hasMore]);

  if (error) {
    return (
      <div className="flex justify-center py-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Error al cargar los posts</span>
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
      </div>
    );
  }
  return (
    <>
      {postsData ? (
        postsData?.data.map((postData) => {
          return (
            <motion.div
              key={postData.post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0.95 }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <div key={postData.post._id}>
                <PostDisplay key={postData.post._id} postData={postData} />
              </div>
            </motion.div>
          );
        })
      ) : (
        <></>
      )}
      <div ref={loaderRef} className="flex justify-center py-8">
        {(!postsData || (postsData?.hasMore && loading)) && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Cargando más posts...</span>
          </div>
        )}

        {!loading &&
          (!postsData ||
            (!postsData?.hasMore && postsData?.data.length > 0)) && (
            <div className="text-center text-muted-foreground">
              No hay más posts para mostrar
            </div>
          )}
      </div>
    </>
  );
};
