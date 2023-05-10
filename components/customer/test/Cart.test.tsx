import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { Cart } from '@/components/customer';

const cartMock = [
  {
    id: '1',
    name: 'test-item',
    year: '2021',
    price: 100,
  },
  {
    id: '2',
    name: 'test-item2',
    year: '2021',
    price: 200,
  },
];

describe('Cart', () => {
  it('should display that cart is empty', () => {
    render(<Cart cart={[]} deleteFromCart={jest.fn} emptyCart={jest.fn} onSummary={jest.fn} />);

    expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument();
  });

  it('should display cart elements', () => {
    render(<Cart cart={cartMock} deleteFromCart={jest.fn} emptyCart={jest.fn} onSummary={jest.fn} />);

    expect(screen.getByText(/test-item, 2021/i)).toBeInTheDocument();
    expect(screen.getByText(/test-item2, 2021/i)).toBeInTheDocument();
  });
});
