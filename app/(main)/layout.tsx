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
      <main className="min-h-[calc(100dvh-(--spacing(18)))] w-full grid grid-cols-14 ">
        <div
          className="w-full col-start-1 col-end-15 md:col-start-2 md:col-end-14 
      lg:col-start-5 lg:col-end-11 xl:col-start-5 xl:col-end-11 h-full border-x border-border/20
      *:py-6 *:px-4
      "
        >
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
