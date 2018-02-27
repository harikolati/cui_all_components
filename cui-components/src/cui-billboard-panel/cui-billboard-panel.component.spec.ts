import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CuiBillboardPanelComponent } from './cui-billboard-panel.component';
import { CuiBillboardPanelModule } from './cui-billboard-panel.module';

describe('CuiBillboardPanelComponent', () => {
	let component: CuiBillboardPanelComponent;
	let fixture: ComponentFixture<CuiBillboardPanelComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CuiBillboardPanelModule],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiBillboardPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the billboard panel component', () => {
		component.count = 3;
		component.showBillboard = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('[cui-billboard-panel] .text-billboard'));
		el = de.nativeElement;
		expect(el.textContent).toContain('3');
	});

	it('can hide the billboard portion component', () => {
		component.count = 3;
		component.showBillboard = false;
		fixture.detectChanges();
		expect(
			document.querySelector('[cui-billboard-panel] .text-billboard'),
		).toBeFalsy();
	});

	it('should have two columns', () => {
		component.count = 3;
		component.showBillboard = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('[cui-billboard-panel] .col-sm-3'));
		expect(de.nativeElement).toBeTruthy();
		de = fixture.debugElement.query(By.css('[cui-billboard-panel] .col-sm-9'));
		expect(de.nativeElement).toBeTruthy();
	});

	it('can have a title and link in the billboard', () => {
		component.title = 'Open Cases';
		component.linkTo = 'link';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('[cui-billboard-panel] .text-billboard-subtitle a'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Open Cases');
	});

	it('can display the billboard on the right hand side', () => {
		component.flipped = true;
		fixture.detectChanges();
		expect(document.querySelector('[cui-billboard-panel].flex-row-reverse')).toBeTruthy();
		component.flipped = false;
		fixture.detectChanges();
		expect(document.querySelector('[cui-billboard-panel].flex-row-reverse')).toBeFalsy();
	});

	it('can display custom colored panels', () => {
		component.panelClass = 'panel--dkgray';
		de = fixture.debugElement.query(By.css('[cui-billboard-panel] .text-billboard'));
		el = de.nativeElement;
		fixture.detectChanges();
		expect(el.classList).toContain('panel--dkgray');
	});
});
