// @flow

export function rangeScale(
  value: number,
  a: [number, number],
  b: [number, number]
): number {
  return ((value - a[0]) * (b[1] - b[0])) / (a[1] - a[0]) + b[0];
}
