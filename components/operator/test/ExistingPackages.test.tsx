import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { ExistingPackages } from '@/components/operator';

describe('ExistingPackages', () => {
  it('should display existing packages', () => {
    render(<ExistingPackages />);

    expect(screen.getAllByText(/Internet \+ Telewizja/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Internet \+ Abonament telefoniczny/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Internet \+ Telewizja z darmowym dekoderem/i)[0]).toBeInTheDocument();
  });
});
