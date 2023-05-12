

import {
	styles,
	getWorkbook,
} from './utils/sheet.js';

import {
	setup,
	partners,
	pauseScroll,
} from './utils/puppet.js';

const {
	clickLocation,
	inputLocation,
	selectLocation,
	getPartnerInfo,
	getPartnerSheet,
} = partners;

const workbookName = 'Partner-Info.xlsx'

const initUrl = 'https://findpartners.salesforce.com'

const { browser, page } = await setup(initUrl);

const workbook = getWorkbook()
const heading = workbook.createStyle( styles.heading );

await clickLocation(page);
await inputLocation(page);
await selectLocation(page);

await page.waitForSelector('>>> h3.pf-partner-card__name');

await pauseScroll(page, 4, 10, 4000)

const infos = await getPartnerInfo(page);

const sheet = getPartnerSheet(workbook, heading);

for (const info of infos) {
	const index = infos.indexOf(info) + 2;
	for(const key in info){
		const colIndex = Object.keys(info).indexOf(key) + 1;
		const value = info[key];
		if(typeof value === 'number'){
			if(key === 'rating'){
				sheet.cell(index, colIndex).number(value).style(styles.alignCenter)
			}
			else {
				sheet.cell(index, colIndex).number(value).style(styles.alignRight)
			}
		}
		else {
			sheet.cell(index, colIndex).string(info[key])
		}
	}
}

workbook.write(workbookName);

console.log(`Wrote ${infos.length} partners to ${workbookName}`)

await browser.close();