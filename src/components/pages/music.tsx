import { SpotifyLogo } from "@phosphor-icons/react";
import Button from "../Button";

export function Music() {
  return (
    <section className="flex flex-col gap-12 my-8 pb-12">
      <Button className="bg-[#81b71a]">
        <SpotifyLogo size={24} weight="fill" />
        Logar com o spotify
      </Button>
    </section>
  );
}
