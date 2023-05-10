import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test/config';
import ModalEditItem from '../ModalEditItem';

const mockedItem = {
  id: '1',
  name: 'test-item',
  year: '2022',
  price: 12.12,
  icon: <div />,
};

describe('ModalEditItem', () => {
  it('should display correct item values', () => {
    render(<ModalEditItem item={mockedItem} setItemToEdit={jest.fn} />);

    expect(screen.getByDisplayValue(/test-item/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2022/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12.12/i)).toBeInTheDocument();
  });

  it('should display correct name after changing it', () => {
    render(<ModalEditItem item={mockedItem} setItemToEdit={jest.fn} />);

    const nameInput = screen.getByDisplayValue(/test-item/i);
    fireEvent.change(nameInput, { target: { value: 'test-item-2' } });
    expect(nameInput).toHaveValue('test-item-2');
  });

  it('should display initial name after reset btn click', () => {
    render(<ModalEditItem item={mockedItem} setItemToEdit={jest.fn} />);

    const nameInput = screen.getByDisplayValue(/test-item/i);
    const resetBtn = screen.getByText(/Resetuj/i);
    fireEvent.change(nameInput, { target: { value: 'changed' } });
    fireEvent.click(resetBtn);
    expect(nameInput).toHaveValue('test-item');
  });
});
