import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {} from 'jasmine';

import { DynamicPagerService } from './dynamic-pager.service';

const params: any = {
	platform: 'rdjq4vwe',
	max: 10,
	offset: 0,
};

const paramsString = `?platform=${params.platform}&max=${params.max}&offset=${params.offset}`;

describe('DynamicPagerService', () => {
	let httpMock: HttpTestingController;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				HttpClientTestingModule,
			],
			providers: [DynamicPagerService],
		});

		this.injector = getTestBed();
		this.service = this.injector.get(DynamicPagerService);
		this.backend = this.injector.get(HttpTestingController);
		httpMock = this.injector.get(HttpTestingController);
	});
	afterEach(() => {
		httpMock.verify();
	});

	it('should ...', () => {
		expect(this.service).toBeTruthy();
	});

	it('should retrieve list data', fakeAsync(() => {
		let items = [];
		this.service.setServiceUrl('/items');
		this.service.getMultiple(params).then(result => {
			items = result;
		});
		const req = this.backend.expectOne(`/items${paramsString}`);
		req.flush([
			{ id: '12345' },
		]);
		tick();
		expect(items[0].id).toEqual('12345');
	}));

	it('should retrieve single object data', fakeAsync(() => {
		let item;
		this.service.setServiceUrl('/items');
		this.service.get('12345').then(result => {
			item = result;
		});
		const req = this.backend.expectOne(`/items/12345`);
		req.flush({
			id: '12345',
		});
		tick();
		expect(item.id).toEqual('12345');
	}));

	it('should create objects', fakeAsync(() => {
		let response;
		this.service.setServiceUrl('/items');
		this.service.create({ id: '12345' }).then(result => {
			response = result;
		});
		const req = this.backend.expectOne('/items');
		req.flush({
			success: true,
		});
		tick();
		expect(response.success).toEqual(true);
	}));

	it('should update objects', fakeAsync(() => {
		let response;
		this.service.setServiceUrl('/items');
		this.service.update('12345', { id: '12345' }).then(result => {
			response = result;
		});
		const req = this.backend.expectOne('/items/12345');
		req.flush({
			success: true,
		});
		tick();
		expect(response.success).toEqual(true);
	}));

	it('should create objects', fakeAsync(() => {
		let response;
		this.service.setServiceUrl('/items');
		this.service.delete('12345').then(result => {
			response = result;
		});
		const req = this.backend.expectOne('/items/12345');
		req.flush({
			success: true,
		});
		tick();
		expect(response.success).toEqual(true);
	}));
});
