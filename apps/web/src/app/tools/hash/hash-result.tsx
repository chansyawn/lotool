import { Badge, Progress } from "@lotool/ui";
import { Hash } from "@lotool/lib/hash";
import { HashResultItem } from "./hash-result-item";
import { useHash } from "./use-hash";
import { type HashOptions } from "./hash-worker";

interface HashResultProps {
  input: Blob;
  algorithms: Hash[];
  options?: HashOptions;
}

export function HashResult({ input, algorithms, options }: HashResultProps) {
  const { progress, calculating, output } = useHash(input, algorithms, options);

  return (
    <>
      {calculating ? (
        <div className="flex items-center gap-2">
          <Badge variant="outline">{(progress * 100).toFixed(2)}%</Badge>
          <Progress className="h-2" value={progress * 100} />
        </div>
      ) : null}
      {Object.values(Hash)
        .filter((algorithm) => algorithms.includes(algorithm))
        .map((algorithm) => {
          const content = output.find((o) => o.algorithm === algorithm)?.output ?? " ";
          return (
            <HashResultItem
              key={algorithm}
              calculating={calculating}
              content={content}
              algorithm={algorithm}
            />
          );
        })}
    </>
  );
}
