import { describe, it, expect, vi } from 'vitest';
import { shuffleArray } from '../function';
import type { definition } from '../types';

describe('shuffleArray', () => {
  it('returns an array of the same length', () => {
    const mockData: definition[] = [
      { content: 'Test 1', footnotes: [] },
      { content: 'Test 2', footnotes: [] },
      { content: 'Test 3', footnotes: [] },
    ];
    
    const result = shuffleArray(mockData);
    expect(result.length).toBe(mockData.length);
  });

  it('returns a new array instance', () => {
    const mockData: definition[] = [
      { content: 'Test 1', footnotes: [] },
      { content: 'Test 2', footnotes: [] },
    ];
    
    const result = shuffleArray(mockData);
    expect(result).not.toBe(mockData); // Check it's a new array reference
  });

  it('contains all the same elements', () => {
    const mockData: definition[] = [
      { content: 'Test 1', footnotes: [] },
      { content: 'Test 2', footnotes: [] },
      { content: 'Test 3', footnotes: [] },
    ];
    
    const result = shuffleArray(mockData);
    
    // Check that every original item exists in the result
    mockData.forEach(item => {
      expect(result).toContainEqual(item);
    });
  });

  it('randomizes the order of elements', () => {
    // Mock Math.random to control the shuffle behavior
    const mockRandom = vi.spyOn(Math, 'random');
    
    // Set up mock values that would cause a predictable shuffle
    mockRandom.mockReturnValueOnce(0.5) // Will swap
              .mockReturnValueOnce(0) // No swap
              .mockReturnValueOnce(0.9); // Will swap
    
    const mockData: definition[] = [
      { content: 'A', footnotes: [] },
      { content: 'B', footnotes: [] },
      { content: 'C', footnotes: [] },
      { content: 'D', footnotes: [] },
    ];
    
    const result = shuffleArray([...mockData]);
    
    // With our mocked random values, the order should be different
    expect(result).not.toEqual(mockData);
    
    // Clean up
    mockRandom.mockRestore();
  });
});