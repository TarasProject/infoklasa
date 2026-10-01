export type SortState = {
  values: number[];
  /** Index of the left element of the next comparison. */
  position: number;
  /** How many values at the end of the array are already in their final place. */
  sorted: number;
  /** The pair compared in the last step — the UI highlights it. */
  active: [number, number] | null;
  done: boolean;
};

export function createSort(values: number[]): SortState {
  const done = values.length < 2;
  return { values: [...values], position: 0, sorted: done ? values.length : 0, active: null, done };
}

/** One step = one comparison of two neighbours (and a swap when they are in the wrong order). */
export function stepSort(state: SortState): SortState {
  if (state.done) return state;

  const values = [...state.values];
  const left = state.position;
  const right = left + 1;
  if (values[left]! > values[right]!) {
    [values[left], values[right]] = [values[right]!, values[left]!];
  }

  const passEnd = values.length - 1 - state.sorted;
  if (right < passEnd) {
    return { values, position: right, sorted: state.sorted, active: [left, right], done: false };
  }

  // The pass is over: the largest unsorted value has reached its place.
  const sorted = state.sorted + 1;
  const done = sorted >= values.length - 1;
  return { values, position: 0, sorted: done ? values.length : sorted, active: [left, right], done };
}
