import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ComponentType } from "react";

export type Social = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; size?: number }>;
};

import { siteConfig } from "@/lib/site";

export const socials: Social[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Twitter", href: siteConfig.links.twitter, icon: Twitter },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];
