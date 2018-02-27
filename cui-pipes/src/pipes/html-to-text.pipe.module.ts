/**
 * @angular
 */
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'htmlToText',
})
export class HtmlToTextPipe implements PipeTransform {
	/**
	 * Removes HTML markup from a string
	 * @param   text The HTML text
	 * @returns The stripped text
	 */
	transform (text: string): string {
		return text.replace(/<[^>]+>/gm, '');
	}
}

@NgModule({
	declarations: [HtmlToTextPipe],
	exports: [HtmlToTextPipe],
	providers: [HtmlToTextPipe],
})

export class HtmlToTextPipeModule {}
