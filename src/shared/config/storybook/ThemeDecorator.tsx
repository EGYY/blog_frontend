import { Story, StoryContext } from '@storybook/react';
import { useEffect } from 'react';

export const ThemeDecorator = (StoryComponent: Story, context: StoryContext) => {
  const { globals } = context;

  useEffect(() => {
    document.body.className = globals.theme || 'light';
  }, [globals.theme]);

  return (
    <div id="app" className="app">
      <StoryComponent />
    </div>
  );
};
