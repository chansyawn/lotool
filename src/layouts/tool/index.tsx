"use client";

import RelatedLink, { RelatedLinkInfo } from "./RelatedLink";
import useHasMounted from "@/hooks/useHasMounted";
import cn from "@/utils/cn";

type ToolProps = {
  name: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  relativeLink?: RelatedLinkInfo[];
  developing?: boolean;
};

const Tool = ({ name, icon, children, relativeLink, developing }: ToolProps) => {
  const hasMounted = useHasMounted();

  return (
    <div className="lg:flex">
      <main className="flex-grow">
        <h1 className="mb-4 text-3xl font-semibold">
          {developing ? "🚧" : icon}
          <span className="ml-1">{name}</span>
        </h1>
        {children}
      </main>
      <aside
        className={cn(
          "mt-4 lg:ml-2 lg:mt-0 lg:w-[18rem]",
          // when in vertical layout,
          // render axillary content after children mounted to avoid flicker
          !hasMounted && "hidden lg:block",
        )}
      >
        {relativeLink && <RelatedLink links={relativeLink} />}
      </aside>
    </div>
  );
};

export default Tool;
