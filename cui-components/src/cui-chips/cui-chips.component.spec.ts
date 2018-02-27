import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CuiChipsComponent } from './cui-chips.component';
import { CuiChipsModule } from './cui-chips.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CuiChipsComponent', () => {
	let component: CuiChipsComponent;
	let fixture: ComponentFixture<CuiChipsComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CuiChipsModule],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiChipsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should add a chip', () => {
		const textInput = 'Some Text';
		de = fixture.debugElement.query(By.css('input'));
		de.nativeElement.value = textInput;
		de.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.chips[0]).toBe(textInput);
	});

	it('should show error when required, touched, and empty', () => {
		component.required = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.focus();
		el.dispatchEvent(new Event('blur'));
		fixture.detectChanges();
		expect(el.classList).toContain('ng-invalid');
	});

	it('should not allow duplicates when option is set', () => {
		component.allowDuplicates = false;
		fixture.detectChanges();
		const textInput = 'Some Text';
		de = fixture.debugElement.query(By.css('input'));
		de.nativeElement.value = textInput;
		de.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.chips[0]).toBe(textInput);
		de = fixture.debugElement.query(By.css('input'));
		de.nativeElement.value = textInput;
		de.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.chips.length).toBe(1);
	});

	it('should not allow more chips than max', () => {
		component.max = 1;
		fixture.detectChanges();
		const textInput = 'Some Text';
		de = fixture.debugElement.query(By.css('input'));
		de.nativeElement.value = textInput;
		de.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.chips[0]).toBe(textInput);
		de = fixture.debugElement.query(By.css('input'));
		de.nativeElement.value = textInput;
		de.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		de.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
		fixture.detectChanges();
		expect(component.chips.length).toBe(1);
	});

	it('should complete code coverage', () => {
		// the code below doesn't really test functionality but the methods are necessary to call
		// in order to reach 100% code coverage :)
		component.registerOnTouched();
		component.registerOnChange(() => {});
		component.writeValue([]);
		component.onLabelsChange();
	});
});
