import { STORAGE_THEME_KEY, Theme, ThemeContext } from "@/shared/config/theme/ThemeContext";
import { FC, useMemo, useState } from "react";

const defaultTheme = localStorage.getItem(STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

export const ThemeProvider: FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)

    const defaultProps = useMemo(() => {
        return {
            theme,
            setTheme,
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}
