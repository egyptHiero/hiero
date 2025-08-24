import React from 'react';
import { useDebounce } from 'use-debounce';

type TPropsFn<T, P> = (value: T, e: React.MouseEvent<P>) => void;
interface TProps<T, P> {
  onClick: TPropsFn<T, P>;
  onDoubleClick: TPropsFn<T, P>;
}

type TResultFn<P> = (e: React.MouseEvent<P>) => void;
interface TResult<P> {
  onClick: TResultFn<P>;
  onDoubleClick: TResultFn<P>;
  onAuxClick: TResultFn<P>;
}

export const useDoubleClick = <T, P>(props: TProps<T, P>) => {
  const { onClick, onDoubleClick } = props;

  const [clickArgs, setClickArgs] = React.useState<[T, React.MouseEvent<P>]>();
  const [debouncedClickType] = useDebounce(clickArgs, 300);

  React.useEffect(() => {
    if (debouncedClickType) {
      const [value, e] = debouncedClickType;
      if (e.type === 'auxclick' || e.detail > 1) {
        onDoubleClick(value, e);
      } else {
        onClick(value, e);
      }
      setClickArgs(undefined);
    }
  }, [debouncedClickType, onClick, onDoubleClick]);

  return React.useCallback<(args: T) => TResult<P>>(
    (args: T) => ({
      onClick: (e) => setClickArgs([args, e]),
      onDoubleClick: (e) => setClickArgs([args, e]),
      onAuxClick: (e) => setClickArgs([args, e]),
    }),
    [],
  );
};
