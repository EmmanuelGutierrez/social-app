// import { Footer } from "@/components/layout/footer";
import SuggestedUsers from "@/components/common/suggestions-users";
import UserCard from "@/components/common/user-card";
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
        <div className="hidden lg:block lg:col-start-1 lg:col-end-5 p-10 ">
          <UserCard />
          <div>
            
          </div>
        </div>
        <div
          className="w-full col-start-1 col-end-15 md:col-start-2 md:col-end-14 
      lg:col-start-5 lg:col-end-11 xl:col-start-5 xl:col-end-11 h-full border-x border-border/20
      
      "
        >
          {children}
        </div>
        <div className="hidden xl:block xl:col-start-11 xl:col-end-15 p-10 ">
          <SuggestedUsers />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
