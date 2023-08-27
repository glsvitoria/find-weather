import {
  House,
  MagnifyingGlass,
  Wind,
  MusicNotes,
  PersonSimpleRun,
  Envelope,
} from "@phosphor-icons/react";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export function Header() {
  return (
    <TabsList className="flex items-center justify-between pb-12 border-b border-primary">
      <TabsTrigger value="home">
        <House size={24} weight="fill" className="text-primary" />
      </TabsTrigger>
      <TabsTrigger value="search">
        <MagnifyingGlass size={24} weight="fill" className="text-primary" />
      </TabsTrigger>
      <TabsTrigger value="wind">
        <Wind size={24} weight="fill" className="text-primary" />
      </TabsTrigger>
      <TabsTrigger value="music">
        <MusicNotes size={24} weight="fill" className="text-primary" />
      </TabsTrigger>
      <TabsTrigger value="contact">
        <Envelope size={24} weight="fill" className="text-primary" />
      </TabsTrigger>
    </TabsList>
  );
}
