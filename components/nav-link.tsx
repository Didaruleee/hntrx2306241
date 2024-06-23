import Link, {LinkProps} from "next/link";
import {usePathname} from "next/navigation";
import {ReactNode} from "react";

interface NavLinkProps extends LinkProps {
  href: string;
  exact?: boolean;
  children: ReactNode;
  className?: string;
}

const NavLink = ({href, exact = false, children, className = ""}: NavLinkProps) => {
  const pathname = usePathname();
  const active = "text-dark font-bold transition-colors duration-500 ease-in-out active nav-link";
  const isActive  = pathname && (exact ? pathname === href : pathname.startsWith(href));

  if (isActive) {
    className += active;
  }

  return (
    <Link href={href}>
      <button
        className={` ${className}`}
        style={{
          fontFamily: 'Courier New, Courier, monospace',
          fontSize: '20px',
        }}>
        {children}
      </button>
    </Link>
  );
};

export default NavLink;
