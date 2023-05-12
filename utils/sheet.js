import XL from 'excel4node';

export const styles = {
	heading: {
		font: {
		  bold: true,
		  underline: true,
		  color: '#FFFFFF',
		},
		alignment: {
		  wrapText: true,
		  horizontal: 'center',
		},
		fill: {
		  type: 'pattern',
		  patternType: 'solid',
		  bgColor: '#1c75bc',
		  fgColor: '#1c75bc',
		},
	},
	largeCells: {
		sheetFormat: {
			baseColWidth: 100,
		},
	}
}

export function getWorkbook(){
	return new XL.Workbook();
}