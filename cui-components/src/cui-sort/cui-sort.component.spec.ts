import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CuiSortComponent } from './cui-sort.component';
import { FormsModule } from '@angular/forms';

describe('CuiSortComponent', () => {
	let component: CuiSortComponent;
	let fixture: ComponentFixture<CuiSortComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
			],
			declarations: [CuiSortComponent],
		})
    .compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiSortComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
