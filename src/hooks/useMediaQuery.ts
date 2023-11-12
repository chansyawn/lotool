import { useSyncExternalStore } from "react";

const useMediaQuery = (query: string) => {
  return useSyncExternalStore(
    (callback) => {
      matchMedia(query).addEventListener("change", callback);
      return () => {
        matchMedia(query).removeEventListener("change", callback);
      };
    },
    () => matchMedia(query).matches,
    () => true,
  );
};

export default useMediaQuery;
