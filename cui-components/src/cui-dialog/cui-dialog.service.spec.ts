import {
	Component,
	Directive,
	Inject,
	Injector,
	NgModule,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';

import {
	ComponentFixture,
	fakeAsync,
	flushMicrotasks,
	inject,
	TestBed,
	tick,
	flush,
} from '@angular/core/testing';

import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Directionality } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
	CUI_DIALOG_DATA,
	CuiDialogService,
} from './cui-dialog.service';
import { CuiDialogModule } from './cui-dialog.module';
import { CuiDialogRef } from './cui-dialog-ref';


describe('CuiDialog', () => {
	let dialog: CuiDialogService;
	let overlayContainer: OverlayContainer;
	let overlayContainerElement: HTMLElement;

	let testViewContainerRef: ViewContainerRef;
	let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
	let mockLocation: SpyLocation;

	beforeEach(fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [CuiDialogModule, DialogTestModule],
			providers: [
				{
					provide: Location,
					useClass: SpyLocation,
				},
			],
		});

		TestBed.compileComponents();
	}));

	beforeEach(inject([CuiDialogService, Location, OverlayContainer], (
		d: CuiDialogService, l: Location, oc: OverlayContainer,
	) => {
		dialog = d;
		mockLocation = <SpyLocation>l;
		overlayContainer = oc;
		overlayContainerElement = oc.getContainerElement();
	}));

	afterEach(() => {
		overlayContainer.ngOnDestroy();
	});

	beforeEach(() => {
		viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

		viewContainerFixture.detectChanges();
		testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
	});

	it('should open a dialog with a component', () => {
		const dialogRef = dialog.open(TestDialog, {
			viewContainerRef: testViewContainerRef,
		});

		viewContainerFixture.detectChanges();

		expect(overlayContainerElement.textContent).toContain('Batman!!');
		expect(dialogRef.componentInstanceToOpen instanceof TestDialog).toBe(true);
		expect(dialogRef.componentInstanceToOpen.dialogRef).toBe(dialogRef);

		viewContainerFixture.detectChanges();
		// tslint:disable-next-line:no-non-null-assertion
		const dialogContainerElement = overlayContainerElement
			.querySelector('cui-dialog-container')!;
		expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
	});

	it('should open a dialog with a template', () => {
		const templateRefFixture = TestBed.createComponent(ComponentWithTemplateRef);
		templateRefFixture.componentInstance.localValue = 'Bees';
		templateRefFixture.detectChanges();

		const data = { value: 'Knees' };

		const dialogRef = dialog.open(templateRefFixture.componentInstance.templateRef, { data });

		viewContainerFixture.detectChanges();

		expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
		expect(templateRefFixture.componentInstance.dialogRef).toBe(dialogRef);

		viewContainerFixture.detectChanges();

		// tslint:disable-next-line:no-non-null-assertion
		const dialogContainerElement = overlayContainerElement
			.querySelector('cui-dialog-container')!;
		expect(dialogContainerElement.getAttribute('role')).toBe('dialog');

		dialogRef.close();
	});

	it('should use injector from viewContainerRef for DialogInjector', () => {
		const dialogRef = dialog.open(TestDialog, {
			viewContainerRef: testViewContainerRef,
		});

		viewContainerFixture.detectChanges();

		const dialogInjector = dialogRef.componentInstanceToOpen.dialogInjector;

		expect(dialogRef.componentInstanceToOpen.dialogRef).toBe(dialogRef);
		expect(dialogInjector.get<DirectiveWithViewContainer>(DirectiveWithViewContainer))
			.toBeTruthy(`Expected the dialog component to be created with the
      injector from the viewContainerRef.`);
	});

	it('should open a dialog with a component and no ViewContainerRef', () => {
		const dialogRef = dialog.open(TestDialog);

		viewContainerFixture.detectChanges();

		expect(overlayContainerElement.textContent).toContain('Batman!!');
		expect(dialogRef.componentInstanceToOpen instanceof TestDialog).toBe(true);
		expect(dialogRef.componentInstanceToOpen.dialogRef).toBe(dialogRef);

		viewContainerFixture.detectChanges();
		// tslint:disable-next-line:no-non-null-assertion
		const dialogContainerElement = overlayContainerElement
			.querySelector('cui-dialog-container')!;
		expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
	});

	it('should apply the configured role to the dialog element', () => {
		dialog.open(TestDialog, { role: 'alertDialog' });

		viewContainerFixture.detectChanges();

		// tslint:disable-next-line:no-non-null-assertion
		const dialogContainerElement = overlayContainerElement
			.querySelector('cui-dialog-container')!;
		expect(dialogContainerElement.getAttribute('role')).toBe('alertDialog');
	});

	it('should close a dialog and get back a result', fakeAsync(() => {
		const dialogRef = dialog.open(TestDialog, { viewContainerRef: testViewContainerRef });
		const afterCloseCallback = jasmine.createSpy('afterClose callback');

		dialogRef.afterCuiDialogClosed().subscribe(afterCloseCallback);
		dialogRef.close('Charmander');
		viewContainerFixture.detectChanges();
		flush();

		expect(afterCloseCallback).toHaveBeenCalledWith('Charmander');
		expect(overlayContainerElement.querySelector('cui-dialog-container')).toBeNull();
	}));

	it('should not close when clicking on the overlay backdrop', fakeAsync(() => {
		dialog.open(TestDialog, {
			viewContainerRef: testViewContainerRef,
		});

		viewContainerFixture.detectChanges();

		const backdrop = <HTMLElement>overlayContainerElement
			.querySelector('.cdk-overlay-backdrop');

		backdrop.click();
		viewContainerFixture.detectChanges();
		flush();

		expect(overlayContainerElement.querySelector('cui-dialog-container')).toBeTruthy();
	}));

	// tslint:disable-next-line:ter-max-len
	it('should emit the backdropClick stream when clicking on the overlay backdrop', fakeAsync(() => {
		const dialogRef = dialog.open(TestDialog, {
			viewContainerRef: testViewContainerRef,
		});

		const spy = jasmine.createSpy('backdropClick spy');
		dialogRef.backdropClick().subscribe(spy);

		viewContainerFixture.detectChanges();

		const backdrop = <HTMLElement>overlayContainerElement
			.querySelector('.cdk-overlay-backdrop');

		backdrop.click();
		expect(spy).toHaveBeenCalledTimes(1);

		viewContainerFixture.detectChanges();
		flush();

		// Additional clicks after the dialog has closed should not be emitted
		backdrop.click();
		expect(spy).toHaveBeenCalledTimes(2);
	}));

	it('should notify the observers if a dialog has been opened', () => {
		dialog.afterCuiDialogOpen.subscribe(ref => {
			expect(dialog.open(TestDialog, {
				viewContainerRef: testViewContainerRef,
			})).toBe(ref);
		});
	});

	it('should notify the observers if all open dialogs have finished closing', fakeAsync(() => {
		const ref1 = dialog.open(TestDialog, { viewContainerRef: testViewContainerRef });
		const ref2 = dialog.open(ContentElementDialog, { viewContainerRef: testViewContainerRef });
		const spy = jasmine.createSpy('afterAllClosed spy');

		dialog.afterAllClosed.subscribe(spy);

		ref1.close();
		viewContainerFixture.detectChanges();
		flush();

		expect(spy).not.toHaveBeenCalled();

		ref2.close();
		viewContainerFixture.detectChanges();
		flush();
		expect(spy).toHaveBeenCalled();
	}));

	it('should emit the afterAllClosed stream on subscribe if there are no open dialogs', () => {
		const spy = jasmine.createSpy('afterAllClosed spy');

		dialog.afterAllClosed.subscribe(spy);

		expect(spy).toHaveBeenCalled();
	});

	it('should should override the width of the dialog', () => {
		dialog.open(TestDialog, {
			width: '500px',
		});

		viewContainerFixture.detectChanges();

		const overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');
		expect(overlayPane.style.width).toBe('500px');
	});

	it('should should override the height of the dialog', () => {
		dialog.open(TestDialog, {
			height: '100px',
		});

		viewContainerFixture.detectChanges();

		const overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');

		expect(overlayPane.style.height).toBe('100px');
	});

	it('should should override the min-width of the dialog', () => {
		dialog.open(TestDialog, {
			minWidth: '500px',
		});

		viewContainerFixture.detectChanges();

		const overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');

		expect(overlayPane.style.minWidth).toBe('500px');
	});

	it('should should override the max-width of the dialog', fakeAsync(() => {
		let dialogRef = dialog.open(TestDialog);

		viewContainerFixture.detectChanges();

		let overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');

		expect(overlayPane.style.maxWidth).toBe('700px',
			'Expected dialog to set a default max-width on dialog');

		dialogRef.close();

		tick(500);
		viewContainerFixture.detectChanges();
		flushMicrotasks();

		dialogRef = dialog.open(TestDialog, {
			maxWidth: '100px',
		});

		viewContainerFixture.detectChanges();

		overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');

		expect(overlayPane.style.maxWidth).toBe('100px');
	}));

	it('should should override the min-height of the dialog', () => {
		dialog.open(TestDialog, {
			minHeight: '300px',
		});

		viewContainerFixture.detectChanges();

		const overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');

		expect(overlayPane.style.minHeight).toBe('300px');
	});

	it('should should override the max-height of the dialog', () => {
		dialog.open(TestDialog, {
			maxHeight: '100px',
		});

		viewContainerFixture.detectChanges();

		const overlayPane =
			<HTMLElement>overlayContainerElement.querySelector('.modal__dialog');

		expect(overlayPane.style.maxHeight).toBe('100px');
	});

	it('should close all of the dialogs', fakeAsync(() => {
		dialog.open(TestDialog);
		dialog.open(TestDialog);
		dialog.open(TestDialog);

		expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length).toBe(3);

		dialog.closeAll();
		viewContainerFixture.detectChanges();
		flush();

		expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length).toBe(0);
	}));

	// tslint:disable-next-line:ter-max-len
	it('should close all dialogs when the user goes forwards/backwards in history', fakeAsync(() => {
		dialog.open(TestDialog);
		dialog.open(TestDialog);

		expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length).toBe(2);

		mockLocation.simulateUrlPop('');
		viewContainerFixture.detectChanges();
		flush();

		expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length).toBe(0);
	}));

	it('should close all open dialogs when the location hash changes', fakeAsync(() => {
		dialog.open(TestDialog);
		dialog.open(TestDialog);

		expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length).toBe(2);

		mockLocation.simulateHashChange('');
		viewContainerFixture.detectChanges();
		flush();

		expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length).toBe(0);
	}));

	it('should have the componentInstance available in the afterClosed callback', fakeAsync(() => {
		const dialogRef = dialog.open(TestDialog);
		const spy = jasmine.createSpy('afterClosed spy');

		flushMicrotasks();
		viewContainerFixture.detectChanges();
		flushMicrotasks();

		dialogRef.afterCuiDialogClosed().subscribe(() => {
			spy();
			expect(dialogRef.componentInstanceToOpen)
				.toBeTruthy('Expected component instance to be defined.');
		});

		dialogRef.close();

		flushMicrotasks();
		viewContainerFixture.detectChanges();
		tick(500);

		// Ensure that the callback actually fires.
		expect(spy).toHaveBeenCalled();
	}));

	describe('passing in data', () => {
		it('should be able to pass in data', () => {
			const config = {
				data: {
					stringParam: 'hello',
					dateParam: new Date(),
				},
			};

			const instance = dialog.open(DialogWithInjectedData, config).componentInstanceToOpen;

			expect(instance.data.stringParam).toBe(config.data.stringParam);
			expect(instance.data.dateParam).toBe(config.data.dateParam);
		});

		it('should default to null if no data is passed', () => {
			expect(() => {
				const dialogRef = dialog.open(DialogWithInjectedData);
				expect(dialogRef.componentInstanceToOpen.data).toBeNull();
			}).not.toThrow();
		});
	});

	it('should not keep a reference to the component after the dialog is closed', fakeAsync(() => {
		const dialogRef = dialog.open(TestDialog);
		expect(dialogRef.componentInstanceToOpen).toBeTruthy();

		dialogRef.close();
		tick(500);
		viewContainerFixture.detectChanges();
		flushMicrotasks();

		expect(dialogRef.componentInstanceToOpen).toBeFalsy();
	}));

	it('should assign a unique id to each dialog', () => {
		const one = dialog.open(TestDialog);
		const two = dialog.open(TestDialog);

		expect(one.id).toBeTruthy();
		expect(two.id).toBeTruthy();
		expect(one.id).not.toBe(two.id);
	});

	it('should allow for the id to be overwritten', () => {
		const dialogRef = dialog.open(TestDialog, { id: 'Batman!!' });
		expect(dialogRef.id).toBe('Batman!!');
	});

	it('should throw when trying to open a dialog with the same id as another dialog', () => {
		dialog.open(TestDialog, { id: 'Batman!!' });
		expect(() => dialog.open(TestDialog, { id: 'Batman!!' })).toThrowError(/must be unique/g);
	});

	it('should be able to find a dialog by id', () => {
		const dialogRef = dialog.open(TestDialog, { id: 'Batman!!' });
		expect(dialog.getCuiDialogById('Batman!!')).toBe(dialogRef);
	});

	describe('focus management', () => {
		// When testing focus, all of the elements must be in the DOM.
		beforeEach(() => document.body.appendChild(overlayContainerElement));
		afterEach(() => document.body.removeChild(overlayContainerElement));

		it('should focus the first tabbable element of the dialog on open', fakeAsync(() => {
			dialog.open(TestDialog, {
				viewContainerRef: testViewContainerRef,
			});

			viewContainerFixture.detectChanges();
			flushMicrotasks();

			expect(document.activeElement.tagName).toBe(
				'INPUT',
				'Expected first tabbable element (input) in the dialog to be focused.',
			);
		}));

		it('should allow disabling focus of the first tabbable element', fakeAsync(() => {
			dialog.open(TestDialog, {
				viewContainerRef: testViewContainerRef,
				autoFocus: false,
			});

			viewContainerFixture.detectChanges();
			flushMicrotasks();

			expect(document.activeElement.tagName).not.toBe('INPUT');
		}));

		it('should allow the consumer to shift focus in afterClosed', fakeAsync(() => {
			// Create a element that has focus before the dialog is opened.
			const button = document.createElement('button');
			const input = document.createElement('input');

			button.id = 'dialog-trigger';
			input.id = 'input-to-be-focused';

			document.body.appendChild(button);
			document.body.appendChild(input);
			button.focus();

			const dialogRef = dialog.open(TestDialog, { viewContainerRef: testViewContainerRef });

			tick(500);
			viewContainerFixture.detectChanges();

			dialogRef.afterCuiDialogClosed().subscribe(() => input.focus());
			dialogRef.close();

			tick(500);
			viewContainerFixture.detectChanges();
			flushMicrotasks();

			expect(document.activeElement.id).toBe('input-to-be-focused',
				'Expected that the trigger was refocused after the dialog is closed.');

			document.body.removeChild(button);
			document.body.removeChild(input);
		}));
	});

	describe('dialog content elements', () => {
		let dialogRef: CuiDialogRef<ContentElementDialog>;

		beforeEach(fakeAsync(() => {
			dialogRef = dialog.open(ContentElementDialog, {
				viewContainerRef: testViewContainerRef,
			});

			viewContainerFixture.detectChanges();
			flush();
		}));

		it('should close the dialog when clicking on the close button', fakeAsync(() => {
			expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length)
				.toBe(1);

			(<HTMLElement>overlayContainerElement.querySelector('button[cui-dialog-close]'))
				.click();

			viewContainerFixture.detectChanges();
			flush();

			expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length)
				.toBe(0);
		}));

		// tslint:disable-next-line:ter-max-len
		it('should not close the dialog if [cui-dialog-close] is applied on a non-button node', () => {
			expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length)
				.toBe(1);

			(<HTMLElement>overlayContainerElement.querySelector('div[cui-dialog-close]')).click();

			expect(overlayContainerElement.querySelectorAll('cui-dialog-container').length)
				.toBe(1);
		});

		it('should allow for a user-specified aria-label on the close button', fakeAsync(() => {
			// tslint:disable-next-line:no-non-null-assertion
			const button = overlayContainerElement.querySelector('button[cui-dialog-close]')!;

			dialogRef.componentInstanceToOpen.closeButtonAriaLabel = 'Best close button ever';
			viewContainerFixture.detectChanges();
			flush();

			expect(button.getAttribute('aria-label')).toBe('Best close button ever');
		}));

		// tslint:disable-next-line:ter-max-len
		it('should return the [cui-dialog-close] result when clicking the close button', fakeAsync(() => {
			const afterCloseCallback = jasmine.createSpy('afterClose callback');
			dialogRef.afterCuiDialogClosed().subscribe(afterCloseCallback);

			(<HTMLElement>overlayContainerElement.querySelector('button.close-with-true')).click();
			viewContainerFixture.detectChanges();
			flush();

			expect(afterCloseCallback).toHaveBeenCalledWith(true);
		}));

		it('should override the "type" attribute of the close button', () => {
			// tslint:disable-next-line:no-non-null-assertion
			const button = overlayContainerElement.querySelector('button[cui-dialog-close]');

			expect(button.getAttribute('type')).toBe('button');
		});
	});
});



@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
	constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
	selector: 'arbitrary-component',
	template: `<dir-with-view-container></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
	@ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

	get childViewContainer () {
		return this.childWithViewContainer.viewContainerRef;
	}
}

@Component({
	selector: 'arbitrary-component-with-template-ref',
	template: `<ng-template let-data let-dialogRef="dialogRef">
      Cheese {{localValue}} {{data?.value}}{{setDialogRef(dialogRef)}}</ng-template>`,
})
class ComponentWithTemplateRef {
	localValue: string;
	dialogRef: CuiDialogRef<any>;

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	setDialogRef (dialogRef: CuiDialogRef<any>): string {
		this.dialogRef = dialogRef;

		return '';
	}
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '<p>Batman!!</p> <input> <button>Close</button>' })
class TestDialog {
	constructor(
		public dialogRef: CuiDialogRef<TestDialog>,
		public dialogInjector: Injector,
		public directionality: Directionality,
	) { }
}

@Component({
	template: `
    <h1 cui-dialog-title>This is the title</h1>
    <cui-dialog-content>Lorem ipsum dolor sit amet.</cui-dialog-content>
    <cui-dialog-actions>
      <button cui-dialog-close [aria-label]="closeButtonAriaLabel">Close</button>
      <button class="close-with-true" [cui-dialog-close]="true">Close and return true</button>
      <div cui-dialog-close>Should not close</div>
    </cui-dialog-actions>
  `,
})
class ContentElementDialog {
	closeButtonAriaLabel: string;
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '' })
class DialogWithInjectedData {
	constructor(@Inject(CUI_DIALOG_DATA) public data: any) { }
}

@Component({ template: '<p>Pasta</p>' })
class DialogWithoutFocusableElements { }

const TEST_DIRECTIVES = [
	ComponentWithChildViewContainer,
	ComponentWithTemplateRef,
	TestDialog,
	DirectiveWithViewContainer,
	ContentElementDialog,
	DialogWithInjectedData,
	DialogWithoutFocusableElements,
];

@NgModule({
	imports: [CuiDialogModule],
	exports: TEST_DIRECTIVES,
	declarations: TEST_DIRECTIVES,
	entryComponents: [
		ComponentWithChildViewContainer,
		ComponentWithTemplateRef,
		TestDialog,
		ContentElementDialog,
		DialogWithInjectedData,
		DialogWithoutFocusableElements,
	],
})
class DialogTestModule { }
