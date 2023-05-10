import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { SummaryModal } from '@/components/customer';

describe('SummaryModal', () => {
  it('should display cart item', () => {
    render(<SummaryModal open={true} setOpen={jest.fn} cart={[{ id: '1', name: 'test-item', price: 10, year: '2021' }]} />);

    expect(screen.getByText('test-item')).toBeInTheDocument();
  });
});
