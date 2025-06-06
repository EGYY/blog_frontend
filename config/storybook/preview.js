import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator';
import { I18nDecorator } from '../../src/shared/config/storybook/i18nDecorator';
import i18n from '../../src/shared/config/i18n/i18n';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Язык',
    description: 'Смена языка',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ru', title: 'Русский' },
      ],
      showName: true,
    },
  },
  theme: {
    name: 'Тема',
    description: 'Смена темы',
    defaultValue: 'light',
    toolbar: {
      // The icon for the toolbar item
      icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

i18n.on('languageChanged', (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator);
addDecorator(RouteDecorator);
addDecorator(I18nDecorator);
