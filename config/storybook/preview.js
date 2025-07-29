import { addDecorator } from '@storybook/react';

import i18n from '../../src/shared/config/i18n/i18n';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { I18nDecorator } from '../../src/shared/config/storybook/i18nDecorator';
import { testArticle, testProfile, testUser } from '../../src/shared/lib/tests/const/testContstants';

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
addDecorator(StoreDecorator({
  user: { userData: { user: testUser } },
  profile_detail: { profile: testProfile },
  article: { article: testArticle, recommendations: [testArticle], articles: [testArticle] },
}));
addDecorator(SuspenseDecorator);

const originalSrcDescriptor = Object.getOwnPropertyDescriptor(Image.prototype, 'src');

Object.defineProperty(Image.prototype, 'src', {
  set(src) {
    if (!src.includes('data:image')) {
      this.setAttribute('src', 'https://placehold.co/150');
    } else {
      originalSrcDescriptor?.set?.call(this, src);
    }
  },
});
