import { Story, StoryContext } from '@storybook/react';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n/i18n';

export const I18nDecorator = (story: () => Story, context: StoryContext) => {
  const { globals } = context;

  useEffect(() => {
    i18n.changeLanguage(globals.locale);
  }, [globals]);

  return (
    <Suspense fallback="">
      <I18nextProvider i18n={i18n}>
        {story()}
      </I18nextProvider>
    </Suspense>
  );
};
