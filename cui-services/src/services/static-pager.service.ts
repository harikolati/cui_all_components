import { Injectable } from '@angular/core';
import { SortableField } from './sortable-field';

@Injectable()
/**
 * Service for the sorting and paging of a static data set
 */
export class StaticPagerService {
	/**
	 * Returns a single page's objects
	 * @param  data   The data to page
	 * @param  offset The page index
	 * @param  limit  The number of items per page
	 * @return The paged data
	 */
	public getPagedData (data: any[], offset: number, limit: number): any[] {
		if (!limit) {
			return data;
		}

		const displayedData = [...data];

		return displayedData.splice(offset * limit, limit);
	}

	/**
	 * Sorts a data set by a field
	 * @param  sortField    The field to sort by
	 * @param  allFields    All sortable fields
	 * @param  data         The data to sort
	 * @return The sorted data
	 */
	public sort (sortField: SortableField, allFields: SortableField[], data: any[]) {
		if (!sortField.sortable) {
			return data;
		}

		const sortDirection = sortField.sortDirection === 'asc' ? 'desc' : 'asc';
		for (const column of allFields) {
			column.sorting = false;
			column.sortDirection = 'desc';
		}
		sortField.sorting = true;
		sortField.sortDirection = sortDirection;

		const sortedData = [...data];

		return this.sortDataByField(sortField, sortedData);
	}

	private sortDataByField (sortField: SortableField, data: any[]) {
		return data.sort((a, b) => {
			if (sortField.sortDirection === 'asc') {
				if (sortField.sortKey) {
					const valA = typeof a[sortField.sortKey] !== 'boolean' ?
						a[sortField.sortKey] : a[sortField.sortKey] ? 0 : 1;
					const valB = typeof b[sortField.sortKey] !== 'boolean' ?
						b[sortField.sortKey] : b[sortField.sortKey] ? 0 : 1;

					return valA > valB ? 1 : valA < valB ? -1 : 0;
				}

				return sortField.render(a) > sortField.render(b) ?
					1 : sortField.render(a) < sortField.render(b) ? -1 : 0;
			}

			if (sortField.sortKey) {
				const valA = typeof a[sortField.sortKey] !== 'boolean' ?
					a[sortField.sortKey] : a[sortField.sortKey] ? 0 : 1;
				const valB = typeof b[sortField.sortKey] !== 'boolean' ?
					b[sortField.sortKey] : b[sortField.sortKey] ? 0 : 1;

				return valA < valB ? 1 : valA > valB ? -1 : 0;
			}

			return sortField.render(a) < sortField.render(b) ?
				1 : sortField.render(a) > sortField.render(b) ? -1 : 0;
		});
	}
}
