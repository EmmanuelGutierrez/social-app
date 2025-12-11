import FullLoaderPager from "./full-loader-pager";
import { useAppStore } from "@/zustand/useAppStore";

export const GlobalLoader = () => {
    const { isLoading } = useAppStore()
    if (!isLoading) return null
    return (
        <>
            {isLoading && <FullLoaderPager />}
        </>
    )
}