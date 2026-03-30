import { describe, expect, it } from 'vitest';
import { ordinalSuffix } from '../index.js';

describe('ordinalSuffix', () => {
	it('handles numbers ending in 1 (except 11)', () => {
		expect(ordinalSuffix(1)).toBe('1st');
		expect(ordinalSuffix(21)).toBe('21st');
		expect(ordinalSuffix(31)).toBe('31st');
		expect(ordinalSuffix(101)).toBe('101st');
		expect(ordinalSuffix(121)).toBe('121st');
	});

	it('handles numbers ending in 2 (except 12)', () => {
		expect(ordinalSuffix(2)).toBe('2nd');
		expect(ordinalSuffix(22)).toBe('22nd');
		expect(ordinalSuffix(32)).toBe('32nd');
		expect(ordinalSuffix(102)).toBe('102nd');
		expect(ordinalSuffix(122)).toBe('122nd');
	});

	it('handles numbers ending in 3 (except 13)', () => {
		expect(ordinalSuffix(3)).toBe('3rd');
		expect(ordinalSuffix(23)).toBe('23rd');
		expect(ordinalSuffix(33)).toBe('33rd');
		expect(ordinalSuffix(103)).toBe('103rd');
		expect(ordinalSuffix(123)).toBe('123rd');
	});

	it('handles special cases 11, 12, 13', () => {
		expect(ordinalSuffix(11)).toBe('11th');
		expect(ordinalSuffix(12)).toBe('12th');
		expect(ordinalSuffix(13)).toBe('13th');
		expect(ordinalSuffix(111)).toBe('111th');
		expect(ordinalSuffix(112)).toBe('112th');
		expect(ordinalSuffix(113)).toBe('113th');
	});

	it('handles numbers ending in 0, 4-9', () => {
		expect(ordinalSuffix(0)).toBe('0th');
		expect(ordinalSuffix(4)).toBe('4th');
		expect(ordinalSuffix(5)).toBe('5th');
		expect(ordinalSuffix(6)).toBe('6th');
		expect(ordinalSuffix(7)).toBe('7th');
		expect(ordinalSuffix(8)).toBe('8th');
		expect(ordinalSuffix(9)).toBe('9th');
		expect(ordinalSuffix(10)).toBe('10th');
		expect(ordinalSuffix(14)).toBe('14th');
		expect(ordinalSuffix(15)).toBe('15th');
	});

	it('handles negative numbers', () => {
		expect(ordinalSuffix(-1)).toBe('-1st');
		expect(ordinalSuffix(-2)).toBe('-2nd');
		expect(ordinalSuffix(-3)).toBe('-3rd');
		expect(ordinalSuffix(-11)).toBe('-11th');
		expect(ordinalSuffix(-12)).toBe('-12th');
		expect(ordinalSuffix(-13)).toBe('-13th');
		expect(ordinalSuffix(-21)).toBe('-21st');
		expect(ordinalSuffix(-42)).toBe('-42nd');
		expect(ordinalSuffix(-100)).toBe('-100th');
	});

	it('handles larger numbers', () => {
		expect(ordinalSuffix(100)).toBe('100th');
		expect(ordinalSuffix(1000)).toBe('1000th');
		expect(ordinalSuffix(1001)).toBe('1001st');
		expect(ordinalSuffix(10000)).toBe('10000th');
	});

	it('handles zero', () => {
		expect(ordinalSuffix(0)).toBe('0th');
	});
});
