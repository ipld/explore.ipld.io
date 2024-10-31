/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { HeliaProvider, ExploreProvider, useHelia } from 'ipld-explorer-components/providers'
import pDefer from 'p-defer'
import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { expect, test } from 'vitest'
import App from './App'
import i18n from './i18n'
import registerServiceWorker from './registerServiceWorker'

test('renders headline', async () => {
  const heliaIsReady = pDefer()
  const FunctionalComponent = () => {
    const { helia } = useHelia()

    useEffect(() => {
      if (helia == null) return

      heliaIsReady.resolve()
    }, [helia])

    return null
  }
  render(
    <HeliaProvider>
      <ExploreProvider>
        <I18nextProvider i18n={i18n}>
          <App registerServiceWorker={registerServiceWorker} />
          <FunctionalComponent />
        </I18nextProvider>
      </ExploreProvider>
    </HeliaProvider>
  )

  await heliaIsReady.promise

  expect(screen.getByTestId('app')).toHaveTextContent('Paste in a CID or IPFS path')
})
