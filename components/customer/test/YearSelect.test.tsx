import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { YearSelect } from '@/components/customer';

const dataMock = [
  {
    id: 'testid',
    name: 'test-item',
    price: 10,
    year: '2024',
    icon: <div />,
  },
];

describe('YearSelect', () => {
  it('should display 2024 year in select', () => {
    render(<YearSelect year="2024" setYear={jest.fn} appData={dataMock} />);

    expect(screen.getByRole('searchbox')).toHaveValue('2024');
  });
});
