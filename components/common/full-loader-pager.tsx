import { Spinner } from "../ui/spinner";

export default function FullLoaderPager() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-background backdrop-blur-sm">
            <Spinner className="size-18 text-primary" />
        </div>
    )
}