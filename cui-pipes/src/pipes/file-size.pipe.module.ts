/**
 * @angular
 */
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
	/**
	 * Returns a readable file size from bytes
	 * @param  _size The file size in bytes
	 * @returns The readable file size
	 */
	transform (_size: number): string {
		let size: number = _size;
		const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
		const unit: string = units.find(() => {
			if (size / 1024 >= 1) {
				size /= 1024;

				return false;
			}

			return true;
		});

		const roundedSize: number = Math.round(parseFloat(size.toFixed(2)) * 10) / 10;

		return `${roundedSize} ${unit}`;
	}
}

@NgModule({
	declarations: [FileSizePipe],
	exports: [FileSizePipe],
	providers: [FileSizePipe],
})

export class FileSizePipeModule {}
