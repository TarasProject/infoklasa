import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Use these instead of next/link and next/navigation: they add the language prefix themselves.
export const { Link, usePathname, useRouter } = createNavigation(routing);
