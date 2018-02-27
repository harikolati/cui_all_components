import {
	Component,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	ElementRef,
} from '@angular/core';

@Component({
	selector: 'button[cuiButton]',
	templateUrl: './cui-button.component.html',
	styleUrls: ['./cui-button.component.scss'],
})
export class CuiButtonComponent implements OnChanges, OnInit {
	elem: HTMLElement;
	@Input() color: string;
	@Input() small: boolean;
	@Input() wide: boolean;
	@Input() icon: boolean;
	@Input() animated: boolean;
	@HostBinding('class') class = 'btn';
	@HostListener('click', ['$event']) clickFn = (e: any) => {
		if (this.animated) {
			const X = e.pageX - this.getOffsetLeft(this.elem);
			const Y = e.pageY - this.getOffsetTop(this.elem);
			const rippleDiv = document.createElement('div');
			rippleDiv.classList.add('ripple');
			rippleDiv.setAttribute('style', `top: ${Y}px; left: ${X}px;`);
			const customColor = this.elem.getAttribute('ripple-color');
			if (customColor) {
				rippleDiv.style.background = customColor;
			}
			this.elem.appendChild(rippleDiv);
			setTimeout(() => {
				rippleDiv.parentElement.removeChild(rippleDiv);
			}, 900);
		}
	}
	constructor(
		elementRef: ElementRef,
	) {
		this.elem = elementRef.nativeElement;
	}

	setClass () {
		/* tslint:disable-next-line */
		this.class = `btn ${this.color ? `btn--${this.color}` : ''} ${this.wide ? 'btn--wide' : ''} ${this.small ? 'btn--small' : ''} ${this.icon ? 'btn--icon' : ''}`
	}

	ngOnInit () {
		this.setClass();
	}

	ngOnChanges () {
		this.setClass();
	}

	getOffsetLeft (elem: HTMLElement) {
		let offsetLeft = 0;
		let  $elem = elem;
		do {
			if (!isNaN(elem.offsetLeft)) {
				offsetLeft += $elem.offsetLeft;
			}
		} while ($elem = <HTMLElement>$elem.offsetParent);

		return offsetLeft;
	}

	getOffsetTop (elem: HTMLElement) {
		let offsetTop = 0;
		let $elem = elem;
		do {
			if (!isNaN($elem.offsetTop)) {
				offsetTop += $elem.offsetTop;
			}
		} while ($elem = <HTMLElement>$elem.offsetParent);

		return offsetTop;
	}
}
