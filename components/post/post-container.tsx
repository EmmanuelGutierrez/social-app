"use client";
import { usePost } from "@/hooks/usePost";
import PostDisplay from "./post-display";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react"

export const PostContainer = () => {
  const { useMyFeed } = usePost();
  const loaderRef = useRef<HTMLDivElement>(null)
  const { myFeed, loadMore, loading } = useMyFeed();

  // useEffect(() => {
  //   console.log(myFeed)
  // }, [myFeed]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderRef.current, myFeed?.myFeed.nextCursor])
  return (
    <>
      {myFeed ? (
        myFeed?.myFeed.data.map(({ post, iLiked }, i) => {
          return (
            <motion.div key={post._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0.95 }} transition={{ duration: 0.4, delay: i * 1 }}>
              <div key={post._id}>
                <PostDisplay
                  key={post._id}
                  iLiked={iLiked}
                  post={post}
                />
              </div>
            </motion.div>
          );
        })
      ) : (
        <></>
      )} <div ref={loaderRef} className="flex justify-center py-8">
        {(!myFeed || (myFeed?.myFeed.hasMore && loading)) && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Cargando más posts...</span>
          </div>
        )}

        {
          !loading && (!myFeed || !myFeed?.myFeed.hasMore && myFeed?.myFeed.data.length > 0) && (
            <div className="text-center text-muted-foreground">No hay más posts para mostrar</div>
          )}
      </div>
    </>
  );
};

// "use client";
// import { usePost } from "@/hooks/usePost";
// import PostDisplay from "./post-display";
// import { useEffect, useRef } from "react";
// import { Loader2 } from "lucide-react";

// export const PostContainer = () => {
//   const { useMyFeed } = usePost();
//   const loaderRef = useRef<HTMLDivElement>(null)
//   const { myFeed, loadMore, loading } = useMyFeed();

//   useEffect(() => {
//     console.log(myFeed)
//   }, [myFeed]);
//   console.log(myFeed?.myFeed.nextCursor)

//   useEffect(() => {
//     const element = loaderRef.current
//     if (!element) {
//       return
//     }
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         loadMore()
//       }
//     })
//     observer.observe(element)
//     return () => {
//       observer.unobserve(element)
//     }
//   }, [loadMore,])
//   return (
//     <>
//       {myFeed ? (
//         myFeed?.myFeed.data.map(({ post, iLiked }, i) => {
//           return (
//             <div key={post._id}>
//               <PostDisplay
//                 key={post._id}
//                 iLiked={iLiked}
//                 post={post}
//               />
//             </div>
//           );
//         })
//       ) : (
//         <></>
//       )}
//       {/* <div ref={loaderRef} className="h-10 flex justify-center items-center" > */}
//       {!myFeed || myFeed?.myFeed.hasMore && <div ref={loaderRef} className="flex justify-center py-8">
//         {loading && (
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <Loader2 className="h-6 w-6 animate-spin" />
//             <span>Cargando más posts...</span>
//           </div>
//         )}
//       </div>}
//       {
//         !loading && (!myFeed || !myFeed?.myFeed.hasMore && myFeed?.myFeed.data.length > 0) && (
//           <div className="flex justify-center py-8">
//             <div className="text-center text-muted-foreground">No hay más posts para mostrar</div>
//           </div>

//         )}
//       {/* </div> */}
//     </>
//   );
// };
