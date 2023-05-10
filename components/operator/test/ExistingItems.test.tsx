import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { ExistingItems } from '@/components/operator';

describe('ExistingItems', () => {
  it('should display existing items', () => {
    render(<ExistingItems />);

    expect(screen.getAllByText(/Internet/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Telewizja/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Abonament telefoniczny/i)[0]).toBeInTheDocument();
  });
});
