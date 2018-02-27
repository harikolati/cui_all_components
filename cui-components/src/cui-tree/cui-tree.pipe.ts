import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'treeShowFilter',
	pure: false,
})
export class CuiTreePipe implements PipeTransform {
	transform (items: any[]): any {
		return items.filter(item => item.show);
	}
}
