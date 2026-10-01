import { describe, expect, test } from "vitest";
import { createSort, stepSort } from "./bubble-sort";

// Spec: docs/spec/home-page.md · HP-8
describe("bubble sort, one comparison per step", () => {
  test("walks [3, 1, 2] exactly as the spec describes", () => {
    const start = createSort([3, 1, 2]);
    expect(start).toMatchObject({ values: [3, 1, 2], active: null, sorted: 0, done: false });

    const s1 = stepSort(start);
    expect(s1).toMatchObject({ values: [1, 3, 2], active: [0, 1], sorted: 0, done: false });

    const s2 = stepSort(s1);
    expect(s2).toMatchObject({ values: [1, 2, 3], active: [1, 2], sorted: 1, done: false });

    const s3 = stepSort(s2);
    expect(s3).toMatchObject({ values: [1, 2, 3], active: [0, 1], sorted: 3, done: true });
  });

  test("does not change the input array or the previous state", () => {
    const input = [3, 1, 2];
    const start = createSort(input);
    stepSort(start);
    expect(input).toEqual([3, 1, 2]);
    expect(start.values).toEqual([3, 1, 2]);
  });

  test("a finished state stays the same", () => {
    let state = createSort([2, 1]);
    state = stepSort(state);
    expect(state.done).toBe(true);
    expect(stepSort(state)).toEqual(state);
  });

  test("an array with fewer than two values is already sorted", () => {
    expect(createSort([]).done).toBe(true);
    expect(createSort([5])).toMatchObject({ values: [5], sorted: 1, done: true });
  });

  test("sorts any array within n·(n−1)/2 steps", () => {
    const values = [9, 4, 7, 1, 8, 2, 6, 3, 5];
    let state = createSort(values);
    let steps = 0;
    while (!state.done) {
      state = stepSort(state);
      steps++;
    }
    expect(state.values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(steps).toBeLessThanOrEqual((values.length * (values.length - 1)) / 2);
  });
});
