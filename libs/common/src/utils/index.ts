export * from './console-progress';

/**
 * Returns non-empty properties combined with defaultProps
 *
 * @param props           - properties
 * @param defaultProps    - default properties
 */
export const combineWithDefaults = <T1 extends Partial<T2>, T2 extends object>(
  props: T1 = {} as T1,
  defaultProps: T2 = {} as T2
) => ({
  ...defaultProps,
  ...Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined && v !== null)
  ),
});
