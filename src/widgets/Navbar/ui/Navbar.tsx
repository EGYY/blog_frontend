import { FC } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './Navbar.module.scss'
import { AppLink } from "@/shared/ui/AppLink/AppLink"
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher"

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <AppLink to={'/'}>Главная</AppLink>
            <AppLink to={'/about'}>О нас</AppLink>
            <ThemeSwitcher />
        </div>
    )
}
