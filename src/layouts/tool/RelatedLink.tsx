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
              href={href}
              target="_blank"
              className="-ml-1 inline-flex items-center space-x-1"
              variant="text"
              size="sm"
            >
              <RelatedLinkIcon type={type} />
              <span>{label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedLink;
