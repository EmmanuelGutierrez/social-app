"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight,} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
interface ImageLightboxProps {
    images: {
        public_id: string;
        secure_url: string;
    }[]
    initialIndex: number
    isOpen: boolean
    onClose: () => void
}

export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    useEffect(() => {
        setCurrentIndex(initialIndex)
    }, [initialIndex])
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            if (e.key === "Escape") {
                onClose()
            } else if (e.key === "ArrowLeft") {
                handlePrevious()
            } else if (e.key === "ArrowRight") {
                handleNext()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, currentIndex])



    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center bg-black/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <div className="relative flex-1">
                            {/* Close Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onClose()
                                }}
                            >
                                <X className="h-6 w-6" />
                            </Button>

                            {/* Counter */}
                            {images.length > 1 && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                                    {currentIndex + 1} / {images.length}
                                </div>
                            )}

                            {/* Previous Button */}
                            {images.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 z-50 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handlePrevious()
                                    }}
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </Button>
                            )}

                            {/* Image */}
                            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-16">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        src={images[currentIndex].secure_url}
                                        alt={`Image ${currentIndex + 1}`}
                                        className="max-w-full max-h-full object-contain"
                                        onClick={(e) => e.stopPropagation()}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Next Button */}
                            {images.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 z-50 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleNext()
                                    }}
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </Button>
                            )}

                            {/* Thumbnail Navigation */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-4 py-2 rounded-full bg-black/50">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                                ? "border-accent scale-110"
                                                : "border-transparent opacity-60 hover:opacity-100"
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrentIndex(index)
                                            }}
                                        >
                                            <Image
                                                src={image.secure_url || "/placeholder.svg"}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* <div className="bg-red-400 w-full h-20 ">
                            <div className={`px-4 py-4 flex items-center justify-start gap-4 relative hover:none`}>
             
                                <div className="relative group">
                                    <Button
                                        variant={"normal"}
                                        size="sm"
                                        className={`gap-2  hover:text-pink-600 hover:bg-pink-800/20 ${userReaction ? " text-pink-600" : ""}`}
                                        onClick={(e) => { e.stopPropagation(); return handleReaction() }}
                                    >
                                        <Heart
                                            className={`size-5 ${userReaction ? "fill-current" : ""
                                                }`}
                                        />
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <SlidingCounter value={likeCount || 0} />

                                        </span>
                                    </Button>

                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 text-sm"
                                    onClick={(e) => { e.stopPropagation(); }}
                                >
                                    <MessageCircle className="size-5" />
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        {replyCount || 0}
                                    </span>
                                </Button>
                            </div>
                        </div> */}
                    </motion.div></>
            )}
        </AnimatePresence>
    )
}
