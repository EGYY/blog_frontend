import { Button, ThemeButton } from "@/shared/ui/Button/Button";

const MainPage = () => {
    return (
        <div style={{display: 'flex', gap: 20, justifyContent: 'center', marginTop: 100}}>
            <Button>Button</Button>
            <Button theme={ThemeButton.SECONDARY}>Secondary</Button>
            <Button theme={ThemeButton.OUTLINE}>Button</Button>
        </div>
    )
}

export default MainPage;