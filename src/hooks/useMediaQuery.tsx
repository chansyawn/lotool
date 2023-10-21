import { useSyncExternalStore } from "react";

const useMediaQuery = (query: string) => {
  const isOnline = useSyncExternalStore(
    (callback) => {
      matchMedia(query).addEventListener("change", callback);
      return () => {
        matchMedia(query).removeEventListener("change", callback);
      };
    },
    () => matchMedia(query).matches,
    () => true,
  );
  return isOnline;
};

export default useMediaQuery;
