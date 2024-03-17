import { useState, useCallback } from "react";

export interface UseClipboardOptions {
  timeout?: number;
}

export const useClipboard = ({ timeout = 1000 }: UseClipboardOptions = {}) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (value: string) => {
      void navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, timeout);
      });
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
