import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('[data-testid=app]')
})

test('should resolve a dag-pb cid with a path', async ({ page }) => {
  await page.goto('/')
  const waitForTitle = async (title) => {
    await page.waitForFunction(`document.title === '${title}'`, { timeout: 5000 })
  }

  await waitForTitle('Explore - IPLD')

  // Focus the explore form, type a path, hit enter to submit
  await page.click('#ipfs-path')
  await page.fill('#ipfs-path', 'QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme')
  await page.keyboard.press('Enter')

  // Expect the CID for the path target to have resolved
  await page.waitForSelector('[data-id=ObjectInfo-cid]')
  const resolvedCid = await page.$eval('[data-id=ObjectInfo-cid]', el => el.innerText)
  expect(resolvedCid).toEqual('QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB')
  expect(await page.title()).toBe('Exploring - IPLD')
})
