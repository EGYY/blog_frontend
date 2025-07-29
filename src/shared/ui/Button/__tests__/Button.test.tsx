import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';

import { Button } from '../Button';

describe('Button Component', () => {
  test('Render Button with children', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('TEST');
  });

  test('Applies default theme', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByRole('button')).toHaveClass('default');
  });

  // test.each([
  //   'secondary',
  //   'ghost',
  //   'ghostIcon',
  //   'outline',
  // ])('Applies %s theme class', (theme, expectedClass) => {
  //   render(<Button theme={theme}>TEST</Button>);
  //   expect(screen.getByRole('button')).toHaveClass(expectedClass);
  // });

  test('Render loading state with spin icon', () => {
    render(<Button loading>TEST</Button>);
    expect(screen.getByRole('button')).toHaveClass('loading');
    expect(screen.getByRole('button')).toHaveClass('disabled');
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  test('Does not render SpinIcon when not loading', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByRole('button').querySelector('svg')).not.toBeInTheDocument();
  });

  test('Applies disabled class and attribute', () => {
    render(<Button disabled>TEST</Button>);
    expect(screen.getByRole('button')).toHaveClass('disabled');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  test('Passes additional HTML attributes', () => {
    render(<Button data-testid="custom-button" title="Tooltip">TEST</Button>);
    expect(screen.getByTestId('custom-button')).toHaveAttribute('title', 'Tooltip');
  });

  test('Handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>TEST</Button>);
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
