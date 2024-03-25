// import { User } from "@prisma/client"

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
export type MenuItem = NavItem & {
  image?: string;
  description?: string;
  launched?: boolean;
  external?: boolean;
  forceReload?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: MenuItem[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  contact: string;
  links: {
    github: string;
    docs: string;
    sdkJs: string;
    sdkPhp: string;
    sdkPython: string;
    sdkRuby: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type NavMenuConfig = {
  pagesNav: SidebarNavItem[];
  examplesNav: SidebarNavItem[];
  links: MenuItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

// export type UserSubscriptionPlan = SubscriptionPlan &
//   Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
//     stripeCurrentPeriodEnd: number
//     isPro: boolean
//   }
