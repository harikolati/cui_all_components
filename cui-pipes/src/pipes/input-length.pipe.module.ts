import { NgModule, Pipe } from '@angular/core';

@Pipe({
	name: 'inputLength',
})
export class InputLengthPipe {
	transform (input: string, max: number): string {
		return `${input.length} / ${max}`;
	}
}

@NgModule({
	declarations: [InputLengthPipe],
	exports: [InputLengthPipe],
	providers: [InputLengthPipe],
})

export class InputLengthPipeModule {}
