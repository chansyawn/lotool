import RelatedLinkIcon from "./related-link-icon";
import { Button } from "@/components/ui/button";

export type RelatedLinkType = "wikipedia" | "github";

export type RelatedLinkInfo = {
  type?: RelatedLinkType;
  label: string;
  href: string;
};

type RelatedLinkProps = {
  links: RelatedLinkInfo[];
};

const RelatedLink = ({ links }: RelatedLinkProps) => {
  return (
    <div>
      <h2 className="mb-1 text-xl font-medium">Related Links</h2>
      <ul className="space-y-2">
        {links.map(({ label, href, type }) => (
          <li key={label}>
            <Button size="sm" className="space-x-1 text-sm" variant="secondary" asChild>
              <a href={href} target="_blank">
                <RelatedLinkIcon type={type} />
                <span>{label}</span>
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedLink;
