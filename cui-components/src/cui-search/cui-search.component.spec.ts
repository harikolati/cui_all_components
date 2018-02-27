import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { CuiSearchComponent } from './cui-search.component';

class MockActivatedRoute extends ActivatedRoute {
	public queryParams = Observable.of({ search: 'test' });
}

describe('CuiSearchComponent', () => {
	let component: CuiSearchComponent;
	let fixture: ComponentFixture<CuiSearchComponent>;
	let de: DebugElement;
	let el: HTMLElement;
	const activatedRoute = new MockActivatedRoute();

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [CuiSearchComponent],
			providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiSearchComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display an icon', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-search'));
		expect(de).toBeTruthy();
	});

	it('should display a placeholder', () => {
		component.placeholder = 'test';
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const nnm: NamedNodeMap = <NamedNodeMap>compiled.querySelector('input').attributes;
		expect(nnm.getNamedItem('placeholder').value).toContain('test');
	});

	it('should display a clear text button', () => {
		component.searchText = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-close'));
		expect(de).toBeTruthy();
	});

	it('should clear text', () => {
		component.searchText = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-close'));
		el = de.nativeElement;
		el.click();
		expect(component.searchText).toEqual('');
	});

	it('should debounce search input', done => {
		component.onUpdate.subscribe((text: string) => {
			expect(text).toEqual('testing');
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el['value'] = 'testing';
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	});
});
