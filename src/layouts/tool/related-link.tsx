import RelatedLinkIcon from "./related-link-icon";
import { Button } from "@/components/ui/button";

export type RelatedLinkType = "wiki" | "github";

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
      <h2 className="text-lg font-medium">Related Links</h2>
      <ul>
        {links.map(({ label, href, type }) => (
          <li key={label}>
            <Button
              className="inline-flex h-auto items-center space-x-1 p-0"
              variant="link"
              asChild
            >
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
