import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiAlertModule } from './cui-alert.module';
import { CuiAlertComponent } from './cui-alert.component';

describe('CuiAlertComponent', () => {
	let component: CuiAlertComponent;
	let fixture: ComponentFixture<CuiAlertComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CuiAlertModule],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiAlertComponent);
		component = fixture.componentInstance;
		component.alert.visible = true;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display an icon', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-info-circle'));
		expect(de).toBeTruthy();
	});

	it('should display a message', () => {
		component.alert.message = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.alert__message'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should have a close button', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.alert__close.icon-close'));
		expect(de).toBeTruthy();

		el = de.nativeElement;
		el.click();

		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.alert'));
		expect(de).toBeNull();
	});

	it('should expose getColorClass function', () => {
		expect(component.getColorClass()).toBeDefined();
	});


	describe('getColorClass test', () => {
		const altOptions: any[] = [null];
		const input = ['success', 'warning', 'danger', ''];
		const output = ['alert--success', 'alert--warning', 'alert--danger', 'alert--info'];

		function testGetColorClass (flag: any, type: any, altFlag: any) {
			it(`should expose getColorClass function and should return ${type}`, () => {
				component.alert.alt = altFlag;
				component.alert.severity = flag;
				let suffix = '';

				switch (altFlag) {
				case null:
					suffix = '';
					break;
				case 1:
					suffix = '-alt';
					break;
				case 2:
					suffix = '-alt2';
					break;
				default:
					suffix = '';
				}
				expect(component.getColorClass()).toEqual(type + suffix);
			});
		}

		for (let i = 0; i < altOptions.length; i += 1) {
			for (let x = 0; x < input.length; x += 1) {
				testGetColorClass(input[x], output[x], altOptions[i]);
			}
		}
	});

	it('should expose getColorClass function', () => {
		expect(component.getIconClass()).toBeDefined();
	});
	describe('getIconClass test', () => {
		const input = ['success', 'warning', 'danger', ''];
		const output = [
			'icon-check',
			'icon-exclamation-triangle',
			'icon-error',
			'icon-info-circle',
		];

		function testGetIconClass (flag: any, type: any) {
			it(`should expose getIconClass function and should return ${type}`, () => {
				component.alert.severity = flag;
				expect(component.getIconClass()).toEqual(type);
			});
		}

		for (let x = 0; x < input.length; x += 1) {
			testGetIconClass(input[x], output[x]);
		}
	});


	it('should style alerts', () => {
		component.alert.severity = 'warning';
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.icon-exclamation-triangle'));
		expect(de).toBeTruthy();
	});

	it('should render default values in show function', () => {
		component.alert.severity = 'default severity';
		component.alert.message = 'default msg';
		fixture.detectChanges();

		component.options.show(undefined, undefined, undefined);
		expect(component.alert.severity).toEqual(undefined);
		expect(component.alert.message).toEqual(undefined);
	});

	it('should render values passed to show function', () => {
		component.alert.severity = 'default severity';
		component.alert.message = 'default msg';
		fixture.detectChanges();

		component.options.show('info msg', 'info', true);
		expect(component.alert.severity).toEqual('info');
		expect(component.alert.message).toEqual('info msg');
	});

});
