import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, Component, ViewChild, TemplateRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiTimelineModule } from './cui-timeline.module';
import { CuiTimelineComponent } from './cui-timeline.component';
import { CuiTimelineTimeFormat, CuiTimelineItem } from './cui-timeline-item';

describe('CuiTimelineComponent', () => {
	let component: CuiTimelineComponent;
	let fixture: ComponentFixture<CuiTimelineComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TimelineTestModule, CuiTimelineModule],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiTimelineComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display from now dates', () => {
		component.items = [
			new CuiTimelineItem({
				time: new Date(),
				content: '',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline__time'));
		el = de.nativeElement;
		expect(el.textContent).toContain('a few seconds ago');
	});

	it('should display basic dates', () => {
		component.items = [
			new CuiTimelineItem({
				time: new Date('2017-09-09T14:44:29.676Z'),
				timeFormat: CuiTimelineTimeFormat.DATE,
				content: '',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline__time'));
		el = de.nativeElement;
		expect(el.textContent).toContain('09/09/2017');
	});

	it('should display datetimes', () => {
		const date = new Date('2017-09-09T14:44:29.676Z');
		component.items = [
			new CuiTimelineItem({
				time: date,
				timeFormat: CuiTimelineTimeFormat.DATETIME,
				content: '',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline__time'));
		el = de.nativeElement;
		expect(['09/09/2017 02:44:29', '09/09/2017 10:44:29']).toContain(el.textContent);
	});

	it('should display guid datetimes', () => {
		component.items = [
			new CuiTimelineItem({
				guid: '58d16112a4c061010042fa32',
				timeFormat: CuiTimelineTimeFormat.DATETIME,
				content: '',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline__time'));
		el = de.nativeElement;
		expect(['03/21/2017 05:21:22', '03/21/2017 01:21:22']).toContain(el.textContent);
	});

	it('should display custom time formats', () => {
		component.items = [
			new CuiTimelineItem({
				time: new Date('2017-09-09T14:44:29.676Z'),
				timeFormat: 'EEEE, MMMM d y, h:mm:ss a',
				content: '',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline__time'));
		el = de.nativeElement;
		expect(['Saturday, September 9 2017, 10:44:29 AM', 'Saturday, September 9 2017, 2:44:29 PM']).toContain(el.textContent);
	});

	it('should display icon colors', () => {
		component.items = [
			new CuiTimelineItem({
				time: new Date('2017-09-09T14:44:29.676Z'),
				content: '',
				color: 'info',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline--info'));
		expect(de).toBeTruthy();
	});

	it('should display static content', () => {
		component.items = [
			new CuiTimelineItem({
				time: new Date('2017-09-09T14:44:29.676Z'),
				content: 'testing',
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.timeline__content'));
		el = de.nativeElement;
		expect(el.textContent).toContain('testing');
	});

	it('should display template content', () => {
		const templateRefFixture = TestBed.createComponent(ComponentWithTemplateRef);
		templateRefFixture.detectChanges();
		component.items = [
			new CuiTimelineItem({
				time: new Date('2017-09-09T14:44:29.676Z'),
				template: templateRefFixture.componentInstance.templateRef,
				data: {
					content: 'testing',
				},
			}),
		];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.template-test'));
		el = de.nativeElement;
		expect(el.textContent).toContain('testing');
	});
});

@Component({
	selector: 'arbitrary-component-with-template-ref',
	template: `<ng-template #templateItem let-data="data">
		<div class="template-test">{{data.content}}</div>
	</ng-template>`,
})
class ComponentWithTemplateRef {
	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;
}

@NgModule({
	imports: [CuiTimelineModule],
	exports: [ComponentWithTemplateRef],
	declarations: [ComponentWithTemplateRef],
	entryComponents: [ComponentWithTemplateRef],
})
class TimelineTestModule { }
