import { TestBed, inject } from '@angular/core/testing';

import { StaticPagerService } from './static-pager.service';
import { SortableField } from './sortable-field';
import { TableData } from '../../test-data/table-data';

class Column implements SortableField {
	constructor(public sortKey: string, public render: Function = () => {},
	public sortable: boolean = true, public sorting: boolean = false,
	public sortDirection: string = 'desc') {}
}

describe('StaticPagerService', () => {
	const tableData = TableData.data;
	const columns: Column[] = [
		new Column('company'),
		new Column('isActive', item => {
			if (item.isActive) {
				return `<span class="icon-check text-success"></span>`;
			}

			return `<span class="icon-close text-muted"></span>`;
		}),
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [StaticPagerService],
		});
	});

	it('should ...', inject([StaticPagerService], (service: StaticPagerService) => {
		expect(service).toBeTruthy();
	}));

	it('should page data', inject([StaticPagerService], (service: StaticPagerService) => {
		const pagedData: any[] = service.getPagedData(tableData, 0, 10);
		expect(pagedData.length).toEqual(10);
	}));

	it('should sort table data', inject([StaticPagerService], (service: StaticPagerService) => {
		let sortedData: any[] = service.sort(columns[0], columns, tableData);
		expect(sortedData[0]['company']).toEqual('ACCUPRINT');

		sortedData = service.sort(columns[0], columns, tableData);
		expect(sortedData[0]['company']).toEqual('ZYTRAX');

		sortedData = service.sort(columns[1], columns, tableData);
		expect(sortedData[0]['isActive']).toEqual(true);

		sortedData = service.sort(columns[1], columns, tableData);
		expect(sortedData[0]['isActive']).toEqual(false);
	}));
});
