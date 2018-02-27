import { inject, async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { CuiIconModule } from './index';
import { CuiIconRegistry } from './icon-registry';
import { FAKE_SVGS } from './fake-svgs';
import {} from 'jasmine';

/**
 * Returns the CSS classes assigned to an element as a sorted array.
 * @param element
 * @returns classnames
 */
function sortedClassNames (element: Element): string[] {
	return element.className.split(' ').sort();
}

/**
 * Verifies that an element contains a single <svg> child element, and returns that child.
 * @param element
 * @returns singleSvgChild
 */
function verifyAndGetSingleSvgChild (element: SVGElement): SVGElement {
	expect(element.childNodes.length).toBe(1);
	const svgChild = <SVGElement>element.childNodes[0];
	expect(svgChild.tagName.toLowerCase()).toBe('svg');

	return svgChild;
}

/**
 * Verifies that an element contains a single <path> child element whose "id" attribute has
 * the specified value.
 * @param element
 * @param attributeValue
 */
function verifyPathChildElement (element: Element, attributeValue: string): void {
	expect(element.childNodes.length).toBe(1);
	const pathElement = <SVGPathElement>element.childNodes[0];
	expect(pathElement.tagName.toLowerCase()).toBe('path');
	expect(pathElement.getAttribute('id')).toBe(attributeValue);
}


describe('CuiIcon', () => {

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, CuiIconModule, RouterTestingModule],
			declarations: [
				IconWithColor,
				IconWithLigature,
				IconWithCustomFontCss,
				IconFromSvgName,
				IconWithAriaHiddenFalse,
				IconWithBindingAndNgIf,
			],
		});

		TestBed.compileComponents();
	}));

	let iconRegistry: CuiIconRegistry;
	let http: HttpTestingController;
	let sanitizer: DomSanitizer;

	beforeEach(inject([CuiIconRegistry, HttpTestingController, DomSanitizer],
		(mir: CuiIconRegistry, h: HttpTestingController, ds: DomSanitizer) => {
			iconRegistry = mir;
			http = h;
			sanitizer = ds;
		}));

	it('should apply class based on color attribute', () => {
		const fixture = TestBed.createComponent(IconWithColor);

		const testComponent = fixture.componentInstance;
		const matIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
		testComponent.iconName = 'home';
		testComponent.iconColor = 'success';
		fixture.detectChanges();
		expect(sortedClassNames(matIconElement)).toEqual([
			'',
			'cui-icon',
			'success',
		]);
	});

	it('should mark cui-icon as aria-hidden by default', () => {
		const fixture = TestBed.createComponent(IconWithLigature);
		const iconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
		expect(iconElement.getAttribute('aria-hidden'))
			.toBe('true', 'Expected the cui-icon element has aria-hidden="true" by default');
	});

	it('should not override a user-provided aria-hidden attribute', () => {
		const fixture = TestBed.createComponent(IconWithAriaHiddenFalse);
		const iconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
		expect(iconElement.getAttribute('aria-hidden'))
			.toBe('false', 'Expected the cui-icon element has the user-provided aria-hidden value');
	});

	describe('Icons from URLs', () => {
		it('should register icon URLs by name', fakeAsync(() => {
			iconRegistry.addSvgIcon('fluffy', trust('cat.svg'));
			iconRegistry.addSvgIcon('fido', trust('dog.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);
			let svgElement: SVGElement;
			const testComponent = fixture.componentInstance;
			const mdIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');

			testComponent.iconName = 'fido';
			fixture.detectChanges();
			http.expectOne('dog.svg').flush(FAKE_SVGS.dog);
			svgElement = verifyAndGetSingleSvgChild(mdIconElement);
			verifyPathChildElement(svgElement, 'woof');

			// Change the icon, and the SVG element should be replaced.
			testComponent.iconName = 'fluffy';
			fixture.detectChanges();
			http.expectOne('cat.svg').flush(FAKE_SVGS.cat);
			svgElement = verifyAndGetSingleSvgChild(mdIconElement);
			verifyPathChildElement(svgElement, 'meow');

			// Using an icon from a previously loaded URL should not cause another HTTP request.
			testComponent.iconName = 'fido';
			fixture.detectChanges();
			http.expectNone('dog.svg');
			svgElement = verifyAndGetSingleSvgChild(mdIconElement);
			verifyPathChildElement(svgElement, 'woof');

			// Assert that a registered icon can be looked-up by url.
			iconRegistry.getSvgIconFromUrl(trust('cat.svg')).subscribe(element => {
				verifyPathChildElement(element, 'meow');
			});

			tick();
		}));

		it('should throw an error when using an untrusted icon url', () => {
			iconRegistry.addSvgIcon('fluffy', 'farm-set-1.svg');

			expect(() => {
				const fixture = TestBed.createComponent(IconFromSvgName);
				fixture.componentInstance.iconName = 'fluffy';
				fixture.detectChanges();
			}).toThrowError(/unsafe value used in a resource URL context/);
		});

		it('should throw an error when using an untrusted icon set url', () => {
			iconRegistry.addSvgIconSetInNamespace('farm', 'farm-set-1.svg');

			expect(() => {
				const fixture = TestBed.createComponent(IconFromSvgName);
				fixture.componentInstance.iconName = 'farm:pig';
				fixture.detectChanges();
			}).toThrowError(/unsafe value used in a resource URL context/);
		});

		it('should extract icon from SVG icon set', () => {
			iconRegistry.addSvgIconSetInNamespace('farm', trust('farm-set-1.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);
			const testComponent = fixture.componentInstance;
			const matIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
			let svgElement: any;
			let svgChild: any;

			testComponent.iconName = 'farm:pig';
			fixture.detectChanges();
			http.expectOne('farm-set-1.svg').flush(FAKE_SVGS.farmSet1);

			expect(matIconElement.childNodes.length).toBe(1);
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			expect(svgElement.childNodes.length).toBe(1);
			svgChild = svgElement.childNodes[0];
			// The first <svg> child should be the <g id="pig"> element.
			expect(svgChild.tagName.toLowerCase()).toBe('g');
			expect(svgChild.getAttribute('id')).toBe('pig');
			verifyPathChildElement(svgChild, 'oink');

			// Change the icon, and the SVG element should be replaced.
			testComponent.iconName = 'farm:cow';
			fixture.detectChanges();
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			svgChild = svgElement.childNodes[0];
			// The first <svg> child should be the <g id="cow"> element.
			expect(svgChild.tagName.toLowerCase()).toBe('g');
			expect(svgChild.getAttribute('id')).toBe('cow');
			verifyPathChildElement(svgChild, 'moo');
		});

		it('should allow multiple icon sets in a namespace', () => {
			iconRegistry.addSvgIconSetInNamespace('farm', trust('farm-set-1.svg'));
			iconRegistry.addSvgIconSetInNamespace('farm', trust('farm-set-2.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);
			const testComponent = fixture.componentInstance;
			const matIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
			let svgElement: any;
			let svgChild: any;

			testComponent.iconName = 'farm:pig';
			fixture.detectChanges();
			http.expectOne('farm-set-1.svg').flush(FAKE_SVGS.farmSet1);
			http.expectOne('farm-set-2.svg').flush(FAKE_SVGS.farmSet2);

			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			expect(svgElement.childNodes.length).toBe(1);
			svgChild = svgElement.childNodes[0];
			// The <svg> child should be the <g id="pig"> element.
			expect(svgChild.tagName.toLowerCase()).toBe('g');
			expect(svgChild.getAttribute('id')).toBe('pig');
			expect(svgChild.childNodes.length).toBe(1);
			verifyPathChildElement(svgChild, 'oink');

			// Change the icon name to one that appears in both icon set
			// The icon from the set that
			// was registered last should be used (with id attribute of 'moo moo' instead of 'moo'),
			// and no additional HTTP request should be made.
			testComponent.iconName = 'farm:cow';
			fixture.detectChanges();
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			svgChild = svgElement.childNodes[0];
			// The first <svg> child should be the <g id="cow"> element.
			expect(svgChild.tagName.toLowerCase()).toBe('g');
			expect(svgChild.getAttribute('id')).toBe('cow');
			expect(svgChild.childNodes.length).toBe(1);
			verifyPathChildElement(svgChild, 'moo moo');
		});

		it('should unwrap <symbol> nodes', () => {
			iconRegistry.addSvgIconSetInNamespace('farm', trust('farm-set-3.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);
			const testComponent = fixture.componentInstance;
			const matIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');

			testComponent.iconName = 'farm:duck';
			fixture.detectChanges();
			http.expectOne('farm-set-3.svg').flush(FAKE_SVGS.farmSet3);

			const svgElement = verifyAndGetSingleSvgChild(matIconElement);
			const firstChild = svgElement.childNodes[0];

			expect(svgElement.querySelector('symbol')).toBeFalsy();
			expect(svgElement.childNodes.length).toBe(1);
			expect(firstChild.nodeName.toLowerCase()).toBe('path');
			expect((<HTMLElement>firstChild).getAttribute('id')).toBe('quack');
		});

		it('should not wrap <svg> elements in icon sets in another svg tag', () => {
			iconRegistry.addSvgIconSet(trust('arrow-set.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);
			const testComponent = fixture.componentInstance;
			const matIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
			let svgElement: any;

			testComponent.iconName = 'left-arrow';
			fixture.detectChanges();
			http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);

			// arrow-set.svg stores its icons as nested <svg> elements, so they should be used
			// directly and not wrapped in an outer <svg> tag like the <g> elements in other sets.
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			verifyPathChildElement(svgElement, 'left');
		});

		it('should return unmodified copies of icons from icon sets', () => {
			iconRegistry.addSvgIconSet(trust('arrow-set.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);
			const testComponent = fixture.componentInstance;
			const matIconElement = fixture.debugElement.nativeElement.querySelector('cui-icon');
			let svgElement: any;

			testComponent.iconName = 'left-arrow';
			fixture.detectChanges();
			http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			verifyPathChildElement(svgElement, 'left');
			// Modify the SVG element by setting a viewBox attribute.
			svgElement.setAttribute('viewBox', '0 0 100 100');

			// Switch to a different icon.
			testComponent.iconName = 'right-arrow';
			fixture.detectChanges();
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			verifyPathChildElement(svgElement, 'right');

			// Switch back to the first icon. The viewBox attribute should not be present.
			testComponent.iconName = 'left-arrow';
			fixture.detectChanges();
			svgElement = verifyAndGetSingleSvgChild(matIconElement);
			verifyPathChildElement(svgElement, 'left');
			expect(svgElement.getAttribute('viewBox')).toBeFalsy();
		});

		it('should not throw when toggling an icon that has a binding in IE11', () => {
			iconRegistry.addSvgIcon('fluffy', trust('cat.svg'));

			const fixture = TestBed.createComponent(IconWithBindingAndNgIf);

			fixture.detectChanges();
			http.expectOne('cat.svg').flush(FAKE_SVGS.cat);

			expect(() => {
				fixture.componentInstance.showIcon = false;
				fixture.detectChanges();

				fixture.componentInstance.showIcon = true;
				fixture.detectChanges();
			}).not.toThrow();
		});

		it('should remove the SVG element from the DOM when the binding is cleared', () => {
			iconRegistry.addSvgIconSet(trust('arrow-set.svg'));

			const fixture = TestBed.createComponent(IconFromSvgName);

			const testComponent = fixture.componentInstance;
			const icon = fixture.debugElement.nativeElement.querySelector('cui-icon');

			testComponent.iconName = 'left-arrow';
			fixture.detectChanges();
			http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);

			expect(icon.querySelector('svg')).toBeTruthy();

			testComponent.iconName = undefined;
			fixture.detectChanges();

			expect(icon.querySelector('svg')).toBeFalsy();
		});

	});

	/**
	 * Marks an svg icon url as explicitly trusted.
	 * @param iconUrl
	 * @returns trusted
	 */
	function trust (iconUrl: string): SafeResourceUrl {
		return sanitizer.bypassSecurityTrustResourceUrl(iconUrl);
	}
});

describe('MatIcon without HttpClientModule', () => {
	// tslint:disable-next-line:no-unused
	let iconRegistry: CuiIconRegistry;
	// tslint:disable-next-line:no-unused
	let sanitizer: DomSanitizer;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CuiIconModule, RouterTestingModule],
			declarations: [IconFromSvgName],
		});

		TestBed.compileComponents();
	}));

	beforeEach(inject([CuiIconRegistry, DomSanitizer], (mir: CuiIconRegistry, ds: DomSanitizer) => {
		iconRegistry = mir;
		sanitizer = ds;
	}));
});


@Component({ template: `<cui-icon>{{iconName}}</cui-icon>` })
class IconWithLigature {
	iconName = '';
}

@Component({ template: `<cui-icon [color]="iconColor">{{iconName}}</cui-icon>` })
class IconWithColor {
	iconName = '';
	iconColor = 'primary';
}

@Component({ template: `<cui-icon [fontSet]="fontSet" [fontIcon]="fontIcon"></cui-icon>` })
class IconWithCustomFontCss {
	fontSet = '';
	fontIcon = '';
}

@Component({ template: `<cui-icon [svgIcon]="iconName"></cui-icon>` })
class IconFromSvgName {
	iconName: string | undefined = '';
}

@Component({ template: '<cui-icon aria-hidden="false">face</cui-icon>' })
class IconWithAriaHiddenFalse { }

@Component({ template: `<cui-icon [svgIcon]="iconName" *ngIf="showIcon">{{iconName}}</cui-icon>` })
class IconWithBindingAndNgIf {
	iconName = 'fluffy';
	showIcon = true;
}
