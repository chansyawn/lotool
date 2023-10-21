import RelatedLinkIcon from "./RelatedLinkIcon";
import Button from "@/components/Button";

export type RelatedLinkType = "wiki";

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
              className="inline-flex items-center space-x-1"
              variant="ghost"
              size="sm"
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
