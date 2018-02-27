/**
 * @angular
 */
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'properCase',
})
export class ProperCasePipe implements PipeTransform {
	/**
	 * Converts text to proper case (first letter of each word capitalized)
	 * @param   text The text to convert
	 * @returns The converted text
	 */
	transform (text: string): any {
		return text.replace(/\w\S*/g, txt =>
			`${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`);
	}
}

@NgModule({
	declarations: [ProperCasePipe],
	exports: [ProperCasePipe],
	providers: [ProperCasePipe],
})

export class ProperCasePipeModule {}
