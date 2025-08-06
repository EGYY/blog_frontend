import { fireEvent, screen } from '@testing-library/react';

import { Sidebar } from '../Sidebar';

import { componentRender } from '@/shared/lib/tests/componentRender';

describe('Sidebar Component', () => {
    test('Render Sidebar', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toggle Sidebar', () => {
        componentRender(<Sidebar />);
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
