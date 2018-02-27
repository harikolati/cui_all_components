import { Component, ContentChild, TemplateRef, Input } from '@angular/core';

@Component({
	selector: 'cui-grid',
	templateUrl: './cui-grid.component.html',
	styleUrls: ['./cui-grid.component.scss'],
})
export class CuiGridComponent {
	@ContentChild(TemplateRef) parentTemplate: any;
	@Input() cardData: any;
}
