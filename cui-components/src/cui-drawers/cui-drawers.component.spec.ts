import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiDrawersComponent } from './cui-drawers.component';
import { CuiDrawerComponent } from '../cui-drawer/cui-drawer.component';
import { CuiDrawersModule } from './cui-drawers.module';
import { CuiDrawerModule } from '../cui-drawer/cui-drawer.module';

describe('CuiDrawersComponent', () => {
	let component: CuiDrawersComponent;
	let fixture: ComponentFixture<CuiDrawersComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	const drawers = [];
	for (let i = 0; i < 3; i += 1) {
		const drawer = new CuiDrawerComponent();
		drawer.label = `Drawer ${i + 1}`;
		drawer.content = `<div>
	<div class="hero hero--loose">
		<div class="container">
			<div class="hero__content hero--background-${i + 1}">
				<h1>Drawer ${i + 1} Content</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
			</div>
		</div>
	</div>
</div>`;
		drawers.push(drawer);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				CuiDrawersModule,
				CuiDrawerModule,
			],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiDrawersComponent);
		component = fixture.componentInstance;
		component.drawers = drawers;

	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('if alt is provided, then colorClass should be empty', () => {
		component.alt = 1;
		fixture.detectChanges();
		expect(component.colorClass).toBe('');
	});


	it('if expanded flag is true, then each drawer.expanded should be true', () => {
		component.expanded = true;
		fixture.detectChanges();
		for (const drawer of component.drawers) {
			expect(drawer.expanded).toBe(true);
		}
	});

	it('should have a label', () => {
		component.label = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('h6 span'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should have chevrons', () => {
		component.label = 'test';
		component.alt = 1;
		component.allowExpandAll = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-down'));
		expect(de).toBeTruthy();

		de = fixture.debugElement.query(By.css('.panel'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-up'));
		expect(de).toBeTruthy();

		component.rightToDown = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-up'));
		expect(de).toBeTruthy();

		de = fixture.debugElement.query(By.css('.panel'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-right'));
		expect(de).toBeTruthy();
	});

	it('should display multiple drawers', () => {
		fixture.detectChanges();
		const deArray: DebugElement[] = fixture.debugElement.queryAll(By.css('.panel > .toggle'));
		expect(deArray.length).toEqual(3);
	});

	it('should expand multiple drawers', () => {
		component.label = 'test';
		component.alt = 1;
		component.allowExpandAll = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.panel'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();

		const deArray: DebugElement[] =
			fixture.debugElement.queryAll(By.css('div.half-margin-top'));
		expect(deArray.length).toEqual(3);
	});

	it('allowExpandAll being false should not change expanded flag', () => {
		component.allowExpandAll = false;
		component.expanded = false;
		component.toggleAllExpanded();
		expect(component.expanded).toBe(false);
	});

});
