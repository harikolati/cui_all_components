import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import {
	assignIn,
	cloneDeep,
	findIndex,
	get,
	has,
	head,
	isFunction,
	keys,
	last,
	pickBy,
	set,
	sortBy,
} from 'lodash-es';

@Component({
	selector: 'cui-detail-pager',
	templateUrl: './cui-detail-pager.component.html',
})

export class CuiDetailPagerComponent implements OnInit {

	@Input() options: any = {};

	constructor(
		private router: Router,
		private location: Location,
	) {}

	private pages: any = {};
	private views: any[] = [];
	public view: any = {};
	public status: any = {
		currIdx: 0,
		lastPage: false,
		page: 0,
		pages: 0,
	};

	@HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent (event: KeyboardEvent) {
		if (this.options.keyEvents) {
			if (event.key === 'ArrowRight' || event.keyCode === 39) {
				this.nextView();
			} else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
				this.previousView();
			}
		}
	}

	public hoverPrev (): String {
		if (this.options.showNavigation && this.options.hoverPrev) {

			if (this.status.currIdx === 0 && this.status.page !== 0) {
				if (has(this.pages, (this.status.page - 1))) {
					return this.options.hoverPrev(last(this.pages[this.status.page - 1]));
				}

				return this.options.hoverPrev({});
			}

			return this.options.hoverPrev(this.views[this.status.currIdx - 1]);
		}

		return '';
	}

	public hoverNext (): String {
		if (this.options.showNavigation && this.options.hoverNext) {

			if (this.status.currIdx === (this.views.length - 1) && !this.status.lastPage) {
				if (has(this.pages, (this.status.page + 1))) {
					return this.options.hoverNext(head(this.pages[this.status.page + 1]));
				}

				return this.options.hoverNext({});
			}

			return this.options.hoverNext(this.views[this.status.currIdx + 1]);
		}

		return '';
	}

	public previousView () {
		if (this.status.currIdx === 0 && this.status.page === 0) {
			return;
		}
		if (!this.options.isLoading) {
			this.options.isLoading = true;
			this.status.currIdx -= 1;
			if (this.status.currIdx === -1) {
				this.status.page -= 1;
				this.options.params.page -= 1;
				this.fetchData({ last: true });
			} else {
				this.loadView();
			}
		}
	}

	public nextView () {
		if (this.status.currIdx === (this.views.length - 1) && this.status.lastPage) {
			return;
		}
		if (!this.options.isLoading) {
			this.options.isLoading = true;
			this.status.currIdx += 1;
			if (this.status.currIdx === this.views.length) {
				this.status.page += 1;
				this.options.params.page += 1;
				this.fetchData();
			} else {
				this.loadView();
			}
		}
	}

	private loadView () {
		this.view = this.views[this.status.currIdx];
		this.options.onData(this.view);

		if (this.options.editHref) {
			this.location.go(this.router.createUrlTree(
				[`${this.options.href}${get(this.view, this.options.id)}`],
				{ queryParams: pickBy(cloneDeep(this.options.params),
					/* tslint:disable-next-line:no-unused */
					(v: any, k: any) => k !== 'page') },
			).toString());
		}

		this.options.isLoading = false;
	}

	private fetchPage (): Promise<any> {
		if (isFunction(this.options.page)) {
			return this.options.page(this.options.params, this.options.initial)
			.toPromise()
			.then((data: any) => {
				set(this.options, ['params', 'page'], get(data, 'page', 0));
				set(this.status, 'page', this.options.params.page);
			});
		}

		return Promise.resolve()
		.then(() => {
			const page = get(this.options, ['params', 'page'], 0);
			set(this.status, 'page', page);
			set(this.options, ['params', 'page'], page);
		});
	}

	private fetchData (opt: any = {}) {
		const page = get(this.status, 'page', 0);

		if (get(this.pages, page, []).length > 0) {
			this.views = this.pages[page];

			this.loadData(opt);
		} else {
			this.options.read(this.options.params)
			.subscribe((data: any) => {
				const _keys = sortBy(keys(this.pages));

				if (_keys.length + 1 > this.options.pageLimit) {
					if (opt.last) {
						delete this.pages[last(_keys)];
					} else {
						delete this.pages[head(_keys)];
					}
				}

				this.pages[page] = data[this.options.var];
				this.views = this.pages[page];
				set(this.status, 'pages', get(data, 'totalPages', 0));

				this.loadData(opt);
			});
		}
	}

	private loadData (opt: any = {}) {
		this.status.length = this.views.length;
		this.status.lastPage = ((this.status.page + 1) === this.status.pages);

		if (opt.initial) {
			this.status.currIdx = findIndex(this.views, o =>
				get(o, this.options.id) === this.options.initial);
		} else if (opt.last) {
			this.status.currIdx = this.views.length - 1;
		} else {
			this.status.currIdx = 0;
		}

		if (this.status.currIdx === -1) {
			this.status.currIdx = 0;
		}

		this.loadView();
	}

	ngOnInit () {
		this.options = assignIn(this.options, {
			showNavigation: true,
			pageLimit: 0,
			editHref: false,
			keyEvents: true,
			getHoverNext: () => {
				return this.hoverNext();
			},
			getHoverPrev: () => {
				return this.hoverPrev();
			},
			nextView: () => {
				this.nextView();
			},
			previousView: () => {
				this.previousView();
			},
		});

		this.fetchPage()
		.then(() => {
			this.fetchData({ initial: true });
		});
	}
}
