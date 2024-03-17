import { Button } from "@lotool/ui";
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
      <h2 className="mb-1 text-xl font-medium">Related Links</h2>
      <ul className="space-y-2">
        {links.map(({ label, href, type }) => (
          <li key={label}>
            <Button
              size="sm"
              className="space-x-1 text-sm"
              variant="secondary"
              asChild
            >
              <a href={href} target="_blank" rel="noopener">
                <RelatedLinkIcon type={type} />
                <span>{label}</span>
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
