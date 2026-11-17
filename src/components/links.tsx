import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/** Link para uma seção da home: âncora simples na home, rota com hash nas outras páginas. */
export function SectionLink({ id, className = "", children, onClick, ...rest }: { id: string; className?: string; children: ReactNode; onClick?: () => void; [k: string]: any }) {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <a href={`#${id}`} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={`/#${id}`} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
