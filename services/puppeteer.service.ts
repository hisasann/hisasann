import * as puppeteer from 'puppeteer';

class PuppeteerService {
  browser: any;
  page: any;

  async init() {
    this.browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--incognito',
        '--proxy-server=http=194.67.37.90:3128',
        // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"', //
      ],
      // headless: false,
    });
  }

  /**
   *
   * @param {string} url
   */
  async goToPage(url: string) {
    if (!this.browser) {
      await this.init();
    }
    this.page = await this.browser.newPage();

    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
    });

    await this.page.goto(url, {
      waitUntil: `networkidle0`,
    });
  }

  async close() {
    await this.page && this.page.close();
    await this.browser && this.browser.close();
  }

  /**
   *
   * @param {string} acc Account to crawl
   * @param {number} n Qty of image to fetch
   */
  async getLatestInstagramPostsFromAccount(acc: string, n: number) {
    try {
      const page = `https://dumpor.com/v/${acc}`;
      await this.goToPage(page);
      await this.page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
      await this.page.waitFor(1000);

      const nodes = await this.page.evaluate(() => {
        const images = document.querySelectorAll(`.content__img`);
        return [].map.call(images, (img: any) => {
          return img.src
        });
      });

      return nodes.slice(0, n);
    } catch (error) {
      console.log('Error', error);
      process.exit();
    }
  }
}

const puppeteerService = new PuppeteerService();

export default puppeteerService;
