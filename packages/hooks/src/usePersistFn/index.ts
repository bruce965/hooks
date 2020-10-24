import { useRef } from 'react';

export type noop = (...args: any[]) => any;

interface PersistFn<T> {
  persistFn: T;
  fn?: T;
}

function usePersistFn<T extends noop>(fn: T) {
  const ref = useRef<PersistFn<T>>();

  if (!ref.current) {
    const x: PersistFn<T> = {
      persistFn: function () {
        return x.fn!.apply(this, arguments);
      } as T,
    };

    ref.current = x;
  }

  ref.current!.fn = fn;

  return ref.current!.persistFn;
}

export default usePersistFn;
