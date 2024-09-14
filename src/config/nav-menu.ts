import type { NavMenuConfig } from "@/types";
import { siteConfig } from "@/config/site";

export const navMenuConfig: NavMenuConfig = {
  pagesNav: [
    {
      title: "Menu",
      items: [
        {
          title: "Blog",
          href: "/blog",
          description: "",
          image: "",
        },
        {
          title: "Documentacion",
          href: siteConfig.links.docs,
          description: "",
          image: "",
        },
        {
          title: "Comunidad",
          href: siteConfig.links.discord,
          description: "",
          image: "",
        },
        {
          title: "Precio",
          href: "/pricing",
          description: "",
          image: "",
        },
      ],
    },
  ],
  examplesNav: [],
  links: [],
};
