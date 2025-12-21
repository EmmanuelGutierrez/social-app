
import { Header } from "@/components/layout/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            <main className="min-h-[calc(100dvh-(--spacing(18)))] w-full">

                {children}

            </main>
            {/* <Footer /> */}
        </div>
    );
}