"use client";
import {
  Send,
  Settings2,
  LifeBuoyIcon,
  BookOpen,
  Bot,
  SquareTerminal,
  Frame,
  ChartPie,
  Map,
  Ellipsis,
  ChevronsUpDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import Image from "next/image";

const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
    icon: ChevronsUpDown,
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      title: "Sales & Marketing",
      url: "#",
      icon: ChartPie,
    },
    {
      title: "Travel",
      url: "#",
      icon: Map,
    },
    {
      title: "More",
      url: "#",
      icon: Ellipsis,
    },
  ],
  navFooter: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoyIcon,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 md:h-10 lg:h-16 flex items-center justify-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={130}
          height={42}
          priority
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} title={"Platform"} />
        <NavMain items={sidebarData.navSecondary} title={"Projects"} />
      </SidebarContent>
      <SidebarFooter>
        <NavMain items={sidebarData.navFooter} user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
