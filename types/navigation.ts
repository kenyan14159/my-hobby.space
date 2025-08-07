export interface MenuItem {
  title: string;
  href: string;
  description?: string;
}

export interface SubmenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuSection {
  title: string;
  href?: string;
  submenu?: SubmenuSection[];
} 