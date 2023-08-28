import { Header } from "@/components/header";
import { Poppins } from "next/font/google";

import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Weather } from "@/components/pages/weather";
import { Search } from "@/components/pages/search";
import { Contact } from "@/components/pages/contact";
import { Wind } from "@/components/pages/wind";
import { GetServerSideProps } from "next";
import { Music } from "@/components/pages/music";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface IHomeProps {
  token: string;
}

export default function Home({ token }: IHomeProps) {
  return (
    <main
      className={`${poppins.className} xs:m-16 m-4 xs:h-[calc(100vh-8rem)] h-[calc(100vh-2rem)] rounded-2xl xs:p-16 p-8 overflow-y-auto`}
    >
      <Tabs
        defaultValue="home"
        className="xs:h-[calc(100vh-16rem)] h-[calc(100vh-16rem)]"
      >
        <Header />
        <TabsContent value="home" className="xs:h-[calc(100%-4rem)] h-full">
          <Weather />
        </TabsContent>
        <TabsContent value="search" className="xs:h-[calc(100%-4rem)] h-full">
          <Search />
        </TabsContent>
        <TabsContent value="contact" className="xs:h-[calc(100%-4rem)] h-full">
          <Contact />
        </TabsContent>
        <TabsContent value="wind" className="xs:h-[calc(100%-4rem)] h-full">
          <Wind />
        </TabsContent>
        <TabsContent value="music" className="h-auto">
          <Music token={token} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.req.cookies["spotify-token"]) {
    const token: string = context.req.cookies["spotify-token"];
    return {
      props: { token: token },
    };
  } else {
    return {
      props: { token: "" },
    };
  }
};
