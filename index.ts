/*
 * Thanks!
 * https://github.com/thmsgbrt/thmsgbrt
 */

import * as Mustache from 'mustache';
// import fetch from 'node-fetch';
import * as fs from 'fs';
import puppeteerService from './services/puppeteer.service';

// mustache のテンプレートファイル
const MUSTACHE_MAIN_DIR = './main.mustache';

// mustache のリテラルに渡すデータの型
type DATA_TYPE = {
  img1: string;
  img2: string;
  img3: string;
}

// mustache のリテラルに渡すデータ
const DATA: DATA_TYPE = {
  img1: '',
  img2: '',
  img3: '',
};

// instagram のポストを取得する
async function setInstagramPosts(count: number) {
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('hisasann', count);
  DATA.img1 = instagramImages[0];
  DATA.img2 = instagramImages[1];
  DATA.img3 = instagramImages[2];
}

// README をジェネレートする
async function generateReadMe() {
  await new Promise<void>((resolve) => {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
      if (err) throw err;

      const output = Mustache.render(data.toString(), DATA);
      fs.writeFileSync('README.md', output);
      resolve();
    });
  });
}

async function action() {
  /**
   * Get pictures
   */
  await setInstagramPosts(3);

  /**
   * Generate README
   */
  await generateReadMe();

  /**
   * Fermeture de la boutique 👋
   */
  await puppeteerService.close();
}

action();
