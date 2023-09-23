import RelatedLink, { RelatedLinkInfo } from "./RelatedLink";

type ToolProps = {
  name: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  relativeLink?: RelatedLinkInfo[];
};

export default function Tool({ name, icon, children, relativeLink }: ToolProps) {
  return (
    <div className="lg:flex">
      <main className="flex-grow">
        <h1 className="text-3xl font-semibold">
          {icon}
          <span className="ml-1">{name}</span>
        </h1>
        {children}
      </main>
      <aside className="mt-4 lg:ml-2 lg:mt-0 lg:w-[18rem]">
        {relativeLink && <RelatedLink links={relativeLink} />}
      </aside>
    </div>
  );
}
