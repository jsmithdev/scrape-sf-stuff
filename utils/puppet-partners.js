
import {
	styles,
} from './sheet.js';


export async function clickLocation(page){
	const values = await page.waitForSelector(`>>> div.slds-button_reset[title="Location"]`);
	return values.evaluate(el => {
		return new Promise(res => {
			res(el.querySelector('lightning-button-icon').click())
		})
	});
}

export async function inputLocation(page){
	const values = await page.waitForSelector(`>>> input.slds-input[placeholder="Country name"]`);
	return values.evaluate(el => {
		return new Promise(res => {
			el.value = 'United States of America';
			el.focus();
			res(el.value)
		})
	});
}

export async function selectLocation(page){
	const values = await page.waitForSelector(`>>> span.slds-truncate[title="United States of America"]`);
	return values.evaluate(el => {
		return new Promise(res => {
			el.click();
			res(el.value)
		})
	});
}

export async function getPartnerInfo(page){
	
	return page.$$eval('>>> c-partner-card > div.pf-partner-card', els => {
		console.log('els', els);
		const infos = els.map(el => {
			console.log('el', el);
			const name = el.querySelector('h3.pf-partner-card__name')?.textContent;
			const location = el.querySelector('h4.slds-m-top_small')?.title;
			const rating = el.querySelector('div.pf-rating')?.title;
			// Expert Distinctions, Total Specializations
			const stats = el.querySelectorAll('p.pf-partner-card__stat');
			const statsArray = Array.from(stats).map(stat => stat?.textContent);
			const numbers = el.querySelectorAll('p:not([class])');
			const numbersArray = Array.from(numbers)
				.filter(x => !x.textContent.includes(':'))
				.map(x => x.textContent)
				.flatMap(dirt => {
					return dirt.split('(')
					.map(r => {
						r = r.replace(/out of/, '')
						r = r.replace('globally)', '')
						r = r.trim()
						return r;
					})
				})
			
			console.log(Number(rating.replace(/Average Rating: /, '').split(' out')[0]))

			return {
				name,
				rating: Number(rating.replace(/Average Rating: /, '').split(' out')[0]),
				location,
				expert: Number(statsArray[0]),
				special: Number(statsArray[1]),
				recent: Number(numbersArray[0]),
				recentGlobal: Number(numbersArray[1]),
				creds: Number(numbersArray[2]),
				credsGlobal: Number(numbersArray[3]),
			}
		});
		
		return infos;
		//return infos.sort((a, b) => {
		//	return b.rating - a.rating;
		//});
	});
}

export function getPartnerSheet(workbook, heading){
	const sheet = workbook.addWorksheet('Partner Info', styles.mediumCells);

	sheet.cell(1, 1, 1, 10).style(heading)

	sheet.cell(1, 1).string('Company Name')
	sheet.cell(1, 2).string('Rating (out of 5)')
	sheet.cell(1, 3).string('HQ Location')
	sheet.cell(1, 4).string('Experts')
	sheet.cell(1, 5).string('Specializations')
	sheet.cell(1, 6).string('Recent Projects')
	sheet.cell(1, 7).string('Recent Projects (Global)')
	sheet.cell(1, 8).string('Credentials')
	sheet.cell(1, 9).string('Credentials (Global)')

	return sheet;
}
