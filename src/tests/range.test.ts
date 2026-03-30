import { describe, it, expect } from "vitest";
import { range } from "../range.js";


describe("range", () => {
	describe("ascending ranges", () => {
		it("generates an exclusive range by default", () => {
			expect(range(1, 5)).toEqual([1, 2, 3, 4]);
		});

		it("generates an inclusive range when specified", () => {
			expect(range(1, 5, true)).toEqual([1, 2, 3, 4, 5]);
		});

		it("generates a single-element range", () => {
			expect(range(3, 4)).toEqual([3]);
		});
	});

	describe("descending ranges", () => {
		it("generates an exclusive range by default", () => {
			expect(range(5, 1)).toEqual([5, 4, 3, 2]);
		});

		it("generates an inclusive range when specified", () => {
			expect(range(5, 1, true)).toEqual([5, 4, 3, 2, 1]);
		});

		it("generates a single-element range", () => {
			expect(range(4, 3)).toEqual([4]);
		});
	});

	describe("edge cases", () => {
		it("returns an empty array when start and end are equal", () => {
			expect(range(3, 3)).toEqual([]);
		});

		it("returns a single-element array when start and end are equal and inclusive", () => {
			expect(range(3, 3, true)).toEqual([3]);
		});

		it("handles negative numbers", () => {
			expect(range(-3, 2)).toEqual([-3, -2, -1, 0, 1]);
		});

		it("handles a negative descending range", () => {
			expect(range(2, -3)).toEqual([2, 1, 0, -1, -2]);
		});

		it("handles zero as a boundary", () => {
			expect(range(0, 3)).toEqual([0, 1, 2]);
		});
	});
});
