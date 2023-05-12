
import Puppeteer from 'puppeteer';

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

export async function getObjectName(page){
	const values = await page.waitForSelector(">>> samp");
	const object = await values.evaluate(el => {
		return new Promise(res => {
			res(el.textContent)
		})
	});
	return object;
}

export async function getFields(page){
	const fields = await page.$$eval('>>> td > samp.codeph', els => {
		return els.map(el => el.textContent);
	});
	return fields;
}

export function makeUrlDMO(name){
	const format = name.replace(/ /g, '_').toLowerCase()
	return `https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360dm_${format}.htm`
}

export async function getNamesDMO(page){
	const names = await page.$$eval('>>> dx-tree-item >>> span.tile-label', els => {
		return els
		.filter(el => el.textContent.includes('DMO'))
		.map(el => el.textContent);
	});
	return names;
}
export async function getNamesDMO_test(page){
	const names = await page.$$eval('>>> dx-tree-item >>> span.tile-label', els => {
		return els
		.filter(el => el.textContent.includes('DMO'))
		.map(el => el.textContent);
	});
	return names.slice(0, 1);
}

export function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
}