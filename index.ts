/*
 * Thanks!
 * https://github.com/thmsgbrt/thmsgbrt
 */

import * as Mustache from 'mustache';
import fetch from 'node-fetch';
import * as fs from 'fs';
import puppeteerService from './services/puppeteer.service';

const MUSTACHE_MAIN_DIR = './main.mustache';

type DATA_TYPE = {
  img1: string;
  img2: string;
  img3: string;
}

let DATA: DATA_TYPE = {
  img1: '',
  img2: '',
  img3: '',
};

async function setInstagramPosts() {
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('hisasann', 3);
  DATA.img1 = instagramImages[0];
  DATA.img2 = instagramImages[1];
  DATA.img3 = instagramImages[2];
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  /**
   * Get pictures
   */
  await setInstagramPosts();

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
