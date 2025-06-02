import './styles/index.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/config/theme/useTheme';
import { Router } from './providers/router/ui/Router';
import { Navbar } from '@/widgets/Navbar';

export const App = () => {
    const { theme } = useTheme();
    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <Router />
        </div>
    )
}
