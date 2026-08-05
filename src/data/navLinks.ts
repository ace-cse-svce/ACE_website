export interface NavLink {
  name: string;
  href: string;
  type: "scroll" | "link";
  target?: string;
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/", type: "scroll", target: "#home" },
  { name: "About Us", href: "/", type: "scroll", target: "#about" },
  { name: "Teams", href: "/teams", type: "link" },
  { name: "Events", href: "/events", type: "link" },
  { name: "Gallery", href: "/gallery", type: "link" },
  { name: "Contact Us", href: "/", type: "scroll", target: "#contact" },
];
