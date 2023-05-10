import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { Card } from '@/components/customer';

describe('Cart', () => {
  it('should display card elements', () => {
    render(<Card label="test-label" price={101.2} icon="icon" addToCart={jest.fn} />);

    expect(screen.getByText(/test-label/i)).toBeInTheDocument();
    expect(screen.getByText(/101.20/i)).toBeInTheDocument();
  });
});
