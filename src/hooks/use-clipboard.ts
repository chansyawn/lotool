import { useState, useCallback } from "react";

export interface UseClipboardOptions {
  timeout?: number;
}

const useClipboard = ({ timeout = 1000 }: UseClipboardOptions = {}) => {
  const [copied, setHasCopied] = useState(false);

  const copy = useCallback(
    (value: string) => {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), timeout);
        });
      }
    },
    [timeout],
  );

  const paste = useCallback(async () => {
    const value = await navigator.clipboard.readText();
    return value;
  }, []);

  return {
    paste,
    copy,
    copied,
  };
};

export default useClipboard;
