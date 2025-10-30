// import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100dvh-(--spacing(18)))] w-screen">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
