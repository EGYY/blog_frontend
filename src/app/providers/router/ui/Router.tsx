import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '../config/routeConfig'
import { Navbar } from '@/widgets/Navbar'

export const Router = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <Routes>
                {Object.values(routeConfig).map(({ element, path }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <main>
                                <Navbar />
                                <div className='content'>
                                    {element}
                                </div>
                            </main>
                        }
                    />
                ))}
            </Routes>
        </Suspense>
    )
}
