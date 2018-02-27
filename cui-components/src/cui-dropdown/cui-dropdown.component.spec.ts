import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiDropdownComponent } from './cui-dropdown.component';
import { CuiDropdownModule } from './cui-dropdown.module';

describe('CuiDropdownComponent', () => {
	let component: CuiDropdownComponent;
	let fixture: ComponentFixture<CuiDropdownComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CuiDropdownModule],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiDropdownComponent);
		component = fixture.componentInstance;

	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create the app', () => {
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should display a button', () => {
		component.label = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should have color types', () => {
		component.label = 'test';
		component.type = 'success';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn--success'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should have a small type', () => {
		component.label = 'test';
		component.small = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn--small'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should have a wide type', () => {
		component.label = 'test';
		component.wide = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn--wide'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should show a menu', () => {
		component.label = 'test';
		component.actions = [{
			label: 'menu test',
			onClick: () => {},
		}];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('a'));
		el = de.nativeElement;
		expect(el.textContent).toContain('menu test');
	});

	it('should have clickable menu items', () => {
		let working = false;
		component.label = 'test';
		component.actions = [{
			label: 'menu test',
			onClick: () => {
				working = true;
			},
		}];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('a'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(working).toEqual(true);
	});
});
