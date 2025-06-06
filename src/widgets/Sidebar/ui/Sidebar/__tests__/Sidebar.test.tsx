import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';
import { renderWithTranslation } from '@/shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar Component', () => {
  test('Render Sidebar', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Toggle Sidebar', () => {
    renderWithTranslation(<Sidebar />);
    const toggleBtn = screen.getByTestId('toggle-sidebar');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    // not collapsed
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
    fireEvent.click(toggleBtn);
    // collapsed
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    fireEvent.click(toggleBtn);
    // not collapsed again
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
