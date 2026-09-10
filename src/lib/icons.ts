/**
 * Icon registry.
 *
 * Content files reference icons by name (a plain string) so that
 * src/content/** stays free of React imports and can be handed to a
 * non-developer. Add an entry here to make a new icon available to content.
 */

import {
  Building2,
  Clock,
  ClipboardCheck,
  Compass,
  Cpu,
  FileSignature,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Landmark,
  Linkedin,
  Rocket,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Target,
  Twitter,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  building: Building2,
  clipboardCheck: ClipboardCheck,
  clock: Clock,
  compass: Compass,
  cpu: Cpu,
  fileSignature: FileSignature,
  graduationCap: GraduationCap,
  handshake: Handshake,
  heartPulse: HeartPulse,
  hotel: Hotel,
  landmark: Landmark,
  linkedin: Linkedin,
  rocket: Rocket,
  scale: Scale,
  search: Search,
  shield: Shield,
  shieldCheck: ShieldCheck,
  shoppingCart: ShoppingCart,
  target: Target,
  twitter: Twitter,
  users: Users,
  utensils: Utensils,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export const getIcon = (name: IconName): LucideIcon => icons[name];
