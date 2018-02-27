import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CuiBreadcrumbsComponent } from './cui-breadcrumbs.component';
import { CuiBreadcrumbsModule } from './cui-breadcrumbs.module';

describe('CuiBreadcrumbsComponent', () => {
	let component: CuiBreadcrumbsComponent;
	let fixture: ComponentFixture<CuiBreadcrumbsComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, CuiBreadcrumbsModule],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiBreadcrumbsComponent);
		component = fixture.componentInstance;

	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create the app', () => {
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should display breadcrumbs', () => {
		component.items = [{
			label: 'test',
		}];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.breadcrumb li span'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should display href breadcrumbs', () => {
		component.items = [{
			label: 'test',
			href: 'test',
		}];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.breadcrumb li a'));
		el = de.nativeElement;
		expect(el.getAttribute('href')).toContain('test');
	});

	it('should display router url breadcrumbs', () => {
		component.items = [{
			label: 'test',
			routerUrl: '/test',
		}];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.breadcrumb li a'));
		el = de.nativeElement;
		expect(el.getAttribute('href')).toContain('test');
	});

	it('should display onClick breadcrumbs', () => {
		let working = false;
		component.items = [{
			label: 'test',
			onClick: () => {
				working = true;
			},
		}];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.breadcrumb li a'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(working).toEqual(true);
	});
});
