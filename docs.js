

import {
	styles,
	getWorkbook,
} from './utils/sheet.js';

import {
	setup,
	docs,
} from './utils/puppet.js';

const {
	getNamesDMO,
	makeUrlDMO,
	getObjectName,
	getFields,
	getNamesDMO_test,
} = docs;

const skips = [
	'Case DMO',
]

const initUrl = 'https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360dm_account_dmo.htm'

const { browser, page } = await setup(initUrl);

const names = await getNamesDMO(page);

const workbook = getWorkbook()
const heading = workbook.createStyle( styles.heading );


for (let i = 0; i < names.length; i++) {

	const name = names[i];

	if(skips.includes(name)) {
		console.log(`Skipping ${name}...`)
		continue;
	};
	console.log(`Processing ${name}...`)
	
	const sheet = workbook.addWorksheet(name, styles.largeCells);

	const url = makeUrlDMO(name);

	await page.goto(url, {
		waitUntil: ['networkidle0', 'load'],
	});

	const object = await getObjectName(page);
	const fields = await getFields(page);
	
	sheet.column(1).setWidth(30);
	sheet.column(2).setWidth(45);

	sheet.cell(1, 1, 1, 10)
		.style(heading)
	
	sheet.cell(1, 1)
		.string('Object API')
	
	sheet.cell(1, 2)
		.string('Field API')

	let colIndex = 0;
	fields.map((field, i) => {
		colIndex = i + 2;
		sheet.cell(colIndex, 2)
			.string(field)
	})

	sheet.cell(2, 1, colIndex, 1)
		.string(object)
}

workbook.write('DMO-Objects.xlsx');

await browser.close();