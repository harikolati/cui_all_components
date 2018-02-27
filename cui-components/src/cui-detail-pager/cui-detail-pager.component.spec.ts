import { ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CuiDetailPagerComponent } from './cui-detail-pager.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('CuiDetailPagerComponent', () => {
	let component: CuiDetailPagerComponent;
	let fixture: ComponentFixture<CuiDetailPagerComponent>;

	beforeEach(fakeAsync(() => {
		const testData: any = {
			totalElements: 3,
			totalPages: 1,
			lastPage: true,
			numberOfElements: 3,
			content: [
				{
					sr_no: '1234',
				},
				{
					sr_no: 'AAA',
				},
				{
					sr_no: 'ZZZ',
				},
			],
		};

		const options: any = {
			page: 0,
			read: ((params: any) => { /* tslint:disable-line:no-unused */
				return Observable.of(testData);
			}),
			onData: ((device: any) => {}), /* tslint:disable-line:no-unused */
			id: 'sr_no',
			var: 'content',
			editHref: false,
			pageLimit: 5,
			showNavigation: true,
			hoverNext: ((device: any) => {
				return device.sr_no;
			}),
			hoverPrev: ((device: any) => {
				return device.sr_no;
			}),
			params: {
				size: 10,
				sort: 'name,asc',
			},
		};

		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				RouterTestingModule.withRoutes([]),
			],
			declarations: [CuiDetailPagerComponent],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiDetailPagerComponent);
		component = fixture.componentInstance;
		component.options = options;
		fixture.detectChanges();
	}));

	it('should create', fakeAsync(() => {
		flush();
		expect(component).toBeTruthy();
	}));

	it('should change views', fakeAsync(() => {
		flush();

		component.nextView();
		expect(component.view.sr_no).toBe('AAA');

		component.previousView();
		expect(component.view.sr_no).toBe('1234');
	}));

	it('should show hovers', fakeAsync(() => {
		flush();

		component.nextView();
		expect(component.view.sr_no).toBe('AAA');
		expect(component.hoverPrev()).toBe('1234');
		expect(component.hoverNext()).toBe('ZZZ');
	}));
});
