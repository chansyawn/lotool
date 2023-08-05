import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleMediaChange = () => {
      setMatches(matchMedia.matches);
    };
    handleMediaChange();

    matchMedia.addEventListener("change", handleMediaChange);
    return () => matchMedia.removeEventListener("change", handleMediaChange);
  }, [query]);

  return matches;
}
