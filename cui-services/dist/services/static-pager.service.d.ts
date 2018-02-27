import { SortableField } from './sortable-field';
export declare class StaticPagerService {
    /**
     * Returns a single page's objects
     * @param  data   The data to page
     * @param  offset The page index
     * @param  limit  The number of items per page
     * @return The paged data
     */
    getPagedData(data: any[], offset: number, limit: number): any[];
    /**
     * Sorts a data set by a field
     * @param  sortField    The field to sort by
     * @param  allFields    All sortable fields
     * @param  data         The data to sort
     * @return The sorted data
     */
    sort(sortField: SortableField, allFields: SortableField[], data: any[]): any[];
    private sortDataByField(sortField, data);
}
