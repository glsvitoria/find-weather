import { Header } from "@/components/Header";
import { Poppins } from "next/font/google";

import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Weather } from "@/components/pages/Weather";
import { Search } from "@/components/pages/Search";
import { Contact } from "@/components/pages/Contact";
import { Wind } from "@/components/pages/Wind";
import { Music } from "@/components/pages/Music";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
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
        <TabsContent value="music" className="xs:h-[calc(100%-4rem)] h-full">
          <Music />
        </TabsContent>
      </Tabs>
    </main>
  );
}
