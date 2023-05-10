import { screen } from '@testing-library/react';
import { render } from '@/test/config';
import { MobileDrawer } from '@/components/customer';

describe('SummaryModal', () => {
  it('should correctly render children', () => {
    render(
      <MobileDrawer open={true} setOpen={jest.fn} indicatorValue={0}>
        <div data-testid="test-child">test-child</div>
      </MobileDrawer>
    );

    expect(screen.getByTestId('test-child')).toHaveTextContent('test-child');
  });
});
