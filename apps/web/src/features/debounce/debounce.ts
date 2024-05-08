export const debounce = <T extends unknown[], U>(
  fn: (...args: T) => PromiseLike<U> | U,
  delay = 300,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return {
    run: (...args: T): Promise<U> => {
      clearTimeout(timer);
      return new Promise((resolve) => {
        timer = setTimeout(() => {
          resolve(fn(...args));
        }, delay);
      });
    },
    cancel: () => {
      clearTimeout(timer);
    },
  };
};
