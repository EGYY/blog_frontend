import '@/app/styles/index.scss';
import { Story, StoryContext } from '@storybook/react';

export const ThemeDecorator = (StoryComponent: Story, context: StoryContext) => {
  const { globals } = context;
  return (
    <div className={`app ${globals.theme}`}>
      <StoryComponent />
    </div>
  );
};
