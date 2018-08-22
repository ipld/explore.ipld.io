/* global it expect beforeAll afterAll */
import ms from 'milliseconds'
import { launch, appUrl } from './puppeteer'

let browser

beforeAll(async () => { browser = await launch() })
afterAll(() => browser.close())

it('should resolve a dag-pb cid with a path', async () => {
  // Save 3s per run by using the initial page rather than creating a new one!
  // const page = await browser.newPage()
  const page = (await browser.pages())[0]

  const waitForTitle = title => page.waitForFunction(`document.title === '${title}'`, {timeout: 5000})

  await page.goto(appUrl)
  await waitForTitle('Explore - IPLD')

  // focus the exlore form, type a path, hit enter to submit
  await page.click('#ipfs-path')
  await page.type('#ipfs-path', 'QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme')
  await page.keyboard.press('Enter')

  // expect the cid for the path target to have resolved
  await page.waitForSelector('[data-id=ObjectInfo-cid]')
  const resolvedCid = await page.$eval('[data-id=ObjectInfo-cid]', el => el.innerText)
  expect(resolvedCid).toEqual('QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB')
}, ms.minutes(1))
