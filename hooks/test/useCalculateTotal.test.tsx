import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { SummaryModal } from '@/components/customer';

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
    render(<SummaryModal cart={cartMock} open={true} setOpen={jest.fn} />);

    expect(screen.getByText(/300.00/i)).toBeInTheDocument();
    expect(screen.queryByText(/301.00/i)).not.toBeInTheDocument();
  });

  it('should apply the discount', () => {
    render(<SummaryModal cart={cartMock2} open={true} setOpen={jest.fn} />);

    expect(screen.getByText(/79.00/i)).toBeInTheDocument();
    expect(screen.getByText('Internet + Telewizja')).toBeInTheDocument();
  });

  it('should apply the highest discount', () => {
    render(<SummaryModal cart={cartMock3} open={true} setOpen={jest.fn} />);

    expect(screen.getByText('Internet + Telewizja')).toBeInTheDocument();
    expect(screen.queryByText('Internet + Abonament telefoniczny')).not.toBeInTheDocument();
  });

  it('should not apply discount when items from different year', () => {
    render(<SummaryModal cart={cartMock4} open={true} setOpen={jest.fn} />);

    expect(screen.queryByText('Internet + Telewizja')).not.toBeInTheDocument();
  });
});
