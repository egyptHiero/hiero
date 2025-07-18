export interface TFuture {
  promise: Promise<void>;
  resolve: () => void;
  reject: () => void;
}

export const createFuture = () => {
  const result: Partial<TFuture> = {};

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result as TFuture;
};
