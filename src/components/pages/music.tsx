import { SpotifyLogo } from "@phosphor-icons/react";
import Button from "../button";
import Link from "next/link";
import { WebPlayback } from "../playback";

interface IMusicProps {
  token: string;
}

export function Music({ token }: IMusicProps) {
  return !token ? (
    <section className="flex flex-col gap-12 my-8 pb-12">
      <Link href="/api/auth/login">
        <Button className="bg-[#81b71a]">
          <SpotifyLogo size={24} weight="fill" />
          Logar com o spotify
        </Button>
      </Link>
    </section>
  ) : (
    <WebPlayback token={token} />
  );
}
