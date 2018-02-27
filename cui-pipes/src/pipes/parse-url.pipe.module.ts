/**
 * @angular
 */
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'parseUrl',
})
export class ParseUrlPipe implements PipeTransform {
	/**
	 * Converts text with URLs to anchor tags
	 * @param   _text      The text containing URLs
	 * @param   [target]  The target for the anchors
	 * @param   [shorten] Whether to shorten the URL
	 * @returns The reformatted text
	 */
	transform (_text: string, target: string = '', shorten: boolean = false): string {
		let text: string = _text;
		/* tslint:disable-next-line max-line-length ter-max-len */
		const urlPattern: RegExp = /(<a.*?href=("|'))?(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
		const urls: string[] = text.match(urlPattern);
		for (const url of urls) {
			if (url.charAt(0) === '<') {
				continue;
			}

			text = text.replace(
				url,
				`<a target="${target}" href="${url}">${shorten ? this.shortenUrl(url) : url}</a>`,
			);
		}

		return text;
	}

	shortenUrl (url: string) {
		const components = url.split('/');
		for (let i = 0; i < components.length; i += 1) {
			if (!components[i] || !components[i].length) {
				components.splice(i, 1);
				i -= 1;
			}
		}

		return components.pop();
	}
}

@NgModule({
	declarations: [ParseUrlPipe],
	exports: [ParseUrlPipe],
	providers: [ParseUrlPipe],
})

export class ParseUrlPipeModule {}
