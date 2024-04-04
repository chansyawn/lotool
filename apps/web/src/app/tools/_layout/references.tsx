import { ReferencesIcon } from "./references-icon";

export type ReferencesType = "wikipedia" | "github";

export interface RelatedLinkInfo {
  type?: ReferencesType;
  label: string;
  href: string;
}

interface ReferencesProps {
  links: RelatedLinkInfo[];
}

export function References({ links }: ReferencesProps) {
  return (
    <div>
      <h2 className="mb-1 font-medium">References</h2>
      <ul>
        {links.map(({ label, href, type }) => (
          <li key={label}>
            <a
              href={href}
              className="border-primary inline-flex items-center space-x-1 text-sm hover:border-b"
              target="_blank"
              rel="noopener"
            >
              <ReferencesIcon type={type} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
