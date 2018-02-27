/**
 * @angular
 */
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'parseHref',
})
export class ParseHrefPipe implements PipeTransform {
	/**
	 * Adds or removes a target from anchor tags
	 * @param   _text     The text containing anchor tags
	 * @param   [target] The target for the anchor
	 * @returns The reformatted text
	 */
	transform (_text: string, target: string = ''): string {
		let text: string = _text;
		const urlPattern: RegExp = /(<a.*?href=)?/gi;
		const urls: string[] = text.match(urlPattern);
		for (const url of urls) {
			if (url.substring(0, 2) === '<a' && target.length) {
				text = text.replace(url, `<a target="${target}"${url.substring(2, url.length)}`);
			}
		}

		return text;
	}
}

@NgModule({
	declarations: [ParseHrefPipe],
	exports: [ParseHrefPipe],
	providers: [ParseHrefPipe],
})

export class ParseHrefPipeModule {}

