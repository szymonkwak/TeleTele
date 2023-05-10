import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test/config';
import ModalEditPackage from '../ModalEditPackage';

const mockedPackage = {
  id: '1',
  packageItems: ['item-1', 'item-2'],
  name: 'test-item',
  year: '2022',
  discount: 12.12,
};

describe('ModalEditItem', () => {
  it('should display correct package values', () => {
    render(<ModalEditPackage pckg={mockedPackage} setPackageToEdit={jest.fn} />);

    expect(screen.getByDisplayValue(/test-item/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2022/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12.12/i)).toBeInTheDocument();
  });

  it('should display correct name after changing it', () => {
    render(<ModalEditPackage pckg={mockedPackage} setPackageToEdit={jest.fn} />);

    const nameInput = screen.getByDisplayValue(/test-item/i);
    fireEvent.change(nameInput, { target: { value: 'test-item-2' } });
    expect(nameInput).toHaveValue('test-item-2');
  });

  it('should display initial name after reset btn click', () => {
    render(<ModalEditPackage pckg={mockedPackage} setPackageToEdit={jest.fn} />);

    const nameInput = screen.getByDisplayValue(/test-item/i);
    const resetBtn = screen.getByText(/Resetuj/i);
    fireEvent.change(nameInput, { target: { value: 'changed' } });
    fireEvent.click(resetBtn);
    expect(nameInput).toHaveValue('test-item');
  });
});
