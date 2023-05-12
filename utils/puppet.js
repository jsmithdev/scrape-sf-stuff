
import Puppeteer from 'puppeteer';

import * as doc from './puppet-docs.js';
import * as partner from './puppet-partners.js';

export const docs = doc;
export const partners = partner;

export async function setup(initUrl){

	const browser = await Puppeteer.launch({
		headless: 'new',
		//headless: false,
	});
	
	const page = await browser.newPage();
	page.setDefaultTimeout(30000);
	await page.setViewport({ width: 1080, height: 1024 });
	await page.goto(initUrl, {
		waitUntil: ['networkidle0', 'load'],
	});

	return {
		browser,
		page,
	};
}

export function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
}

export async function pauseScroll(page, runs = 4, pgDownClicks = 10, delayTime = 4000){

	for (let i = 0; i < runs; i++) {
		console.log('Scrolling and pausing to load more partners...')
		await Promise.all(Array(pgDownClicks).fill().map(() => page.keyboard.press("PageDown")));
		await delay(delayTime)
	}
}