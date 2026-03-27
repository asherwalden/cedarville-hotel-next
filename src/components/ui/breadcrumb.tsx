import Link from "next/link";
import { ChevronRightIcon } from "@/lib/icons";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ch-gray">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="hover:text-ch-primary transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRightIcon className="w-3.5 h-3.5" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-ch-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ch-dark">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
