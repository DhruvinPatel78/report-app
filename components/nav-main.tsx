"use client";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  CreditCard,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
};
export type User = {
  name: string;
  email: string;
  avatar?: string;
  icon?: LucideIcon;
};
export const getFallbackName = (name: string): string => {
  const initials: string | undefined = name
    ?.split(" ")
    ?.map((word) => word.charAt(0))
    .join("");

  return initials?.toUpperCase() as string;
};
export function NavMain({
  items,
  user,
  title,
}: {
  items: NavItem[];
  user?: User;
  title?: string;
}) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const currentPath = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const isItemActive = (item: NavItem): boolean =>
    currentPath === item.url ||
    (item.items && item.items.some(isItemActive)) ||
    false;

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const renderNavItems = (items: NavItem[], depth = 0) =>
    items.map((item) => {
      const isActive: boolean = isItemActive(item);
      const isExpanded: boolean = expandedSections.includes(item.title);
      const hasSubItems: boolean | undefined =
        item.items && item.items.length > 0;
      const isExpandable: boolean =
        hasSubItems || item.url === "#" || item.url === "";
      const fontSizeClass: string = cn({
        "text-sm": depth === 0 || depth === 1,
        "text-[0.80rem]": depth > 1,
      });

      const handleButtonClick = (e: React.MouseEvent) => {
        if (isExpandable) {
          e.preventDefault();
          toggleSection(item.title);
        }
      };

      return (
        <SidebarMenuItem
          key={item.title}
          className={cn("my-0.5", depth > 0 && "ml-4")}
        >
          <Collapsible
            open={isExpanded}
            onOpenChange={() => isExpandable && toggleSection(item.title)}
          >
            <div className="flex items-center group">
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn(
                  "flex w-full items-center justify-between gap-2 size-10 rounded-md px-2 py-1.5 font-medium transition-colors",
                  fontSizeClass,
                  depth === 0 && "mb-2",
                  depth > 0 && "size-8 px-2",
                  isActive &&
                    depth === 0 &&
                    "bg-foreground text-background hover:bg-foreground",
                  isActive &&
                    depth === 1 &&
                    "bg-primary/30 px-2 text-black size-8 dark:bg-primary/30 dark:text-foreground/80",
                  isActive &&
                    isExpanded &&
                    depth === 1 &&
                    "bg-foreground/40 text-accent-foreground",
                  !isActive &&
                    "hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-primary",
                )}
              >
                {!isExpandable ? (
                  <Link href={item.url} className="flex flex-1 items-center">
                    {item.icon && <item.icon className="mr-2 h-4 w-7" />}
                    <span className="flex-1">{item.title}</span>
                  </Link>
                ) : (
                  <button
                    onClick={handleButtonClick}
                    className="flex flex-1 items-center"
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-7" />}
                    <span className="flex-1">{item.title}</span>
                  </button>
                )}
              </SidebarMenuButton>
              {isExpandable && (
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className={cn(
                      depth === 1 ? "h-6 w-6" : "h-7 w-7",
                      "hover:bg-accent/50 hover:bg-transparent",
                    )}
                  >
                    {hasSubItems && (
                      <ChevronRight
                        className={cn(
                          "transition-transform",
                          isExpanded && "rotate-90",
                          isActive
                            ? "text-background"
                            : "text-foreground/60 dark:text-foreground/60",
                          "dark:group-hover:text-background",
                        )}
                      />
                    )}
                    <span className="sr-only">Toggle {item.title} submenu</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
              )}
            </div>
            {hasSubItems && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderNavItems(item.items!, depth + 1)}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </Collapsible>
        </SidebarMenuItem>
      );
    });
  const renderUser:(user: User) => (null | React.JSX.Element) = (user:User) => {
    if (!user) return null;
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {getFallbackName(user?.name as string)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              {user.icon && <user.icon className="mr-2 h-4 w-7" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="px-2 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">RC</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-1 items-center justify-start">
                <BadgeCheck className="text-foreground/60" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-1 items-center justify-start">
                <CreditCard className="text-foreground/60" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-1 items-center justify-start">
                <Bell className="text-foreground/60" />
                Notification
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex gap-1 items-center justify-start"
                onClick={() => router.push("/")}
              >
                <LogOut className="text-foreground/60" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
        {renderNavItems(items)}
        {renderUser(user)}
      </SidebarMenu>
    </SidebarGroup>
  );
}
