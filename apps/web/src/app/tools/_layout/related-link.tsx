import { RelatedLinkIcon } from "./related-link-icon";

export type RelatedLinkType = "wikipedia" | "github";

export interface RelatedLinkInfo {
  type?: RelatedLinkType;
  label: string;
  href: string;
}

interface RelatedLinkProps {
  links: RelatedLinkInfo[];
}

export function RelatedLink({ links }: RelatedLinkProps) {
  return (
    <div>
      <h2 className="mb-1 font-medium">Related Links</h2>
      <ul>
        {links.map(({ label, href, type }) => (
          <li key={label}>
            <a
              href={href}
              className="space-x-1 text-sm inline-flex items-center hover:border-b border-primary"
              target="_blank"
              rel="noopener"
            >
              <RelatedLinkIcon type={type} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
