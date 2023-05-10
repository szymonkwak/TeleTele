import { renderHook } from '@testing-library/react';
import useCalculateTotal from '../useCalculateTotal';

const cartMock = [
  {
    id: '1',
    name: 'test',
    year: '2021',
    price: 100,
  },
  {
    id: '2',
    name: 'test2',
    year: '2021',
    price: 200,
  },
];

const cartMock2 = [
  {
    id: 'internet-2023',
    name: 'Internet',
    price: 39,
    year: '2023',
  },
  {
    id: 'telewizja-2023',
    name: 'Telewizja',
    price: 49,
    year: '2023',
  },
];

const cartMock3 = [
  {
    id: 'internet-2023',
    name: 'Internet',
    price: 39,
    year: '2023',
  },
  {
    id: 'telewizja-2023',
    name: 'Telewizja',
    price: 49,
    year: '2023',
  },
  {
    id: 'abonament-telefoniczny-2023',
    name: 'Abonament telefoniczny',
    price: 29,
    year: '2023',
  },
];

const cartMock4 = [
  {
    id: 'internet-2023',
    name: 'Internet',
    price: 39,
    year: '2023',
  },
  {
    id: 'telewizja-2024',
    name: 'Telewizja',
    price: 49,
    year: '2024',
  },
];

describe('useCalculateTotal', () => {
  it('should return the total of the items', () => {
    const { result } = renderHook(() => useCalculateTotal(cartMock));

    expect(result.current.total).toBe(300);
    expect(result.current.total).not.toBe(301);
  });

  it('should apply the discount', () => {
    const { result } = renderHook(() => useCalculateTotal(cartMock2));

    expect(result.current.total).toBe(79);
    expect(result.current.appliedPackage?.name).toBe('Internet + Telewizja');
  });

  it('should apply the highest discount', () => {
    const { result } = renderHook(() => useCalculateTotal(cartMock3));

    expect(result.current.appliedPackage?.name).toBe('Internet + Telewizja');
    expect(result.current.appliedPackage?.name).not.toBe('Internet + Abonament telefoniczny');
  });

  it('should not apply discount when items from different year', () => {
    const { result } = renderHook(() => useCalculateTotal(cartMock4));

    expect(result.current.appliedPackage?.name).not.toBe('Internet + Telewizja');
  });
});
