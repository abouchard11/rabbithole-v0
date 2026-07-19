// End-to-end smoke test: play hole #2 (Selfie → Mona Lisa) along the editorial path.
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: 'http://127.0.0.1:40335', bypass: 'localhost' },
  args: ['--ignore-certificate-errors'],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
page.on('console', (m) => m.type() === 'error' && console.log('CONSOLE ERROR:', m.text().slice(0, 200)));

await page.goto('http://localhost:3000/?hole=2', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/tmp/shot-1-intro.png' });
console.log('intro headline:', await page.textContent('h1'));

await page.click('text=Drop in');
await page.waitForSelector('.wiki-content a[href^="./"]', { timeout: 30000, state: 'attached' });
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/shot-2-article.png' });
console.log('playing — header shows:', (await page.textContent('header')).slice(0, 120).replace(/\s+/g, ' '));

async function clickLink(href) {
  const sel = `.wiki-content a[href="./${href}"]`;
  await page.waitForSelector(sel, { timeout: 20000, state: 'attached' });
  await page.$eval(sel, (el) => el.scrollIntoView({ block: 'center' }));
  await page.click(sel);
  // wait for loading overlay to appear+disappear
  await page.waitForTimeout(500);
  await page.waitForFunction(() => !document.body.textContent.includes('tunneling to'), null, { timeout: 30000 });
  await page.waitForTimeout(400);
}

await clickLink('Self-portrait');
console.log('after click 1:', (await page.textContent('header')).slice(0, 140).replace(/\s+/g, ' '));
await clickLink('Leonardo_da_Vinci');
console.log('after click 2:', (await page.textContent('header')).slice(0, 140).replace(/\s+/g, ' '));
await clickLink('Mona_Lisa');
await page.waitForSelector('text=The roast', { timeout: 20000 });
await page.screenshot({ path: '/tmp/shot-3-win.png', fullPage: true });
const body = (await page.textContent('main')).replace(/\s+/g, ' ');
console.log('WIN SCREEN:', body.slice(0, 500));

await browser.close();
console.log('SMOKE TEST PASSED');
