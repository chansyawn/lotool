import RelatedLinkIcon from "./RelatedLinkIcon";

export type RelatedLinkType = "wiki";

export type RelatedLinkInfo = {
  type?: RelatedLinkType;
  label: string;
  href: string;
};

type RelatedLinkProps = {
  links: RelatedLinkInfo[];
};

export default function RelatedLink({ links }: RelatedLinkProps) {
  return (
    <div>
      <h2 className="text-lg font-medium">Related Links</h2>
      <ul>
        {links.map(({ label, href, type }) => (
          <li key={label}>
            <a href={href} className="inline-flex items-center space-x-1" target="_blank">
              <RelatedLinkIcon type={type} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
