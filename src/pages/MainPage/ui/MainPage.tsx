import { Button, ThemeButton } from "@/shared/ui/Button/Button";

const MainPage = () => {
    return (
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
            <Button>Button</Button>
            <Button theme={ThemeButton.SECONDARY}>Secondary</Button>
            <Button theme={ThemeButton.OUTLINE}>Button</Button>
            <Button disabled={true}>Disabled</Button>
            <Button loading={true}>Loading</Button>
        </div>
    )
}

export default MainPage;