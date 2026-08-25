export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavbarProps {
  logo?: {
    src: string;
    alt: string;
    href?: string;
  };
  navItems?: NavItem[];
  loginText?: string;
  loginHref?: string;
  registerText?: string;
  registerHref?: string;
  className?: string;
}
