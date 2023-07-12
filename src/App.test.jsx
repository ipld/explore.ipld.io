/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest'

import { Provider as ReduxStoreProvider } from 'redux-bundler-react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import App from './App'
import getStore from './bundles'
import registerServiceWorker from './registerServiceWorker'
import React from 'react';

test('renders headline', async () => {
  render(
    <ReduxStoreProvider store={getStore()}>
      <I18nextProvider i18n={i18n}>
        <App registerServiceWorker={registerServiceWorker} />
      </I18nextProvider>
    </ReduxStoreProvider>,
  );

  expect(screen.getByTestId('app')).toHaveTextContent('Paste in a CID or IPFS path')

  // screen.debug();
});
