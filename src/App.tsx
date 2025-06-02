import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}

export const App = () => {
    const { theme, switchTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={switchTheme}>{theme === Theme.LIGHT ? 'Светлая' : 'Темная'}</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О нас</Link>
            <Suspense fallback={'Loading...'}>
                <Routes>
                    <Route path='/' element={<MainPageAsync />} />
                    <Route path='/about' element={<AboutPageAsync />} />
                </Routes>
            </Suspense>
        </div>
    )
}
