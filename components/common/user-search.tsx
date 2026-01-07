"use client";

import { useState, useEffect, useRef, useEffectEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { useFindUser } from "@/hooks/useFindUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  const { findUser, findUserData } = useFindUser();
  // Debounced search effect

  const handleSearch = useEffectEvent((query: string) => {
    setIsSearching(true);
    setIsOpen(true);
    const idTimeout = setTimeout(async () => {
      await findUser(query);
      setIsSearching(false);
    }, 1500);

    return idTimeout;
  });

  useEffect(() => {
    const idTimeout = handleSearch(searchQuery);

    return () => {
      clearTimeout(idTimeout);
    };
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = (username: string) => {
    router.push(`/profile/${username}`);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className="my-auto relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-card border-0 
                    border-b border-transparent focus-visible:border-primary 
                    rounded-none focus-visible:ring-0 ring-offset-0 transition-colors"
        />
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && searchQuery.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2  w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {/* Loading State */}
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
            )}

            {/* No Results */}
            {!isSearching && findUserData?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <p className="text-sm">No se encontraron usuarios</p>
              </div>
            )}

            {/* Results List */}
            {!isSearching &&
              searchQuery.trim() !== "" &&
              findUserData &&
              findUserData?.length > 0 && (
                <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                  {findUserData?.map((user, index) => (
                    <motion.button
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleUserClick(user.username)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition-colors text-left"
                    >
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user.profileImg?.secure_url}
                          alt={user.name}
                        />
                        <AvatarFallback>{`${user.name
                          .charAt(0)
                          .toUpperCase()}${user.lastname
                          .charAt(0)
                          .toUpperCase()}`}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-foreground truncate">
                            {user.name}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          @{user.username}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
