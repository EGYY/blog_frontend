// eslint-disable-next-line egyy-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouteDecorator = (StoryComponent: Story) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
