import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, Component, DebugElement, ViewChild, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiCarouselModule } from './cui-carousel.module';
import { CuiCarouselComponent } from './cui-carousel.component';

describe('CuiCarouselComponent', () => {
	let component: CuiCarouselComponent;
	let fixture: ComponentFixture<CuiCarouselComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CarouselTestModule, CuiCarouselModule],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiCarouselComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render items', () => {
		const templateRefFixture = TestBed.createComponent(ComponentWithTemplateRef);
		component.items = [
			templateRefFixture.componentInstance.carouselItem,
		];
		templateRefFixture.detectChanges();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.hero'));
		expect(de).toBeTruthy();
	});

	it('should navigate between items', () => {
		const templateRefFixture = TestBed.createComponent(ComponentWithTemplateRef);
		component.items = [
			templateRefFixture.componentInstance.carouselItem,
			templateRefFixture.componentInstance.carouselItem,
		];
		templateRefFixture.detectChanges();
		fixture.detectChanges();

		component.gotoIndex(-1);
		expect(component.itemIndex).toEqual(0);

		component.gotoIndex(1);
		expect(component.itemIndex).toEqual(1);

		component.gotoIndex(2);
		expect(component.itemIndex).toEqual(1);
	});
});

@Component({
	selector: 'carousel-item',
	template: `<ng-template #carouselItem let-data="data">
	<div class="hero hero--loose hero--bordered">
    <div class="container">
			<div class="hero__content">
				<h1>Background Default</h1>
				<p>This is an example of a default background hero image.</p>
			</div>
    </div>
	</div>
</ng-template>`,
})
class ComponentWithTemplateRef {
	@ViewChild('carouselItem') carouselItem: TemplateRef<any>;
}

@NgModule({
	imports: [CuiCarouselModule],
	exports: [ComponentWithTemplateRef],
	declarations: [ComponentWithTemplateRef],
	entryComponents: [ComponentWithTemplateRef],
})
class CarouselTestModule { }
