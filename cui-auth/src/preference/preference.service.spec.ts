import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {} from 'jasmine';

import { ProfileService } from '../auth/profile.service';
import { PreferenceService } from './preference.service';

describe('PreferenceService', () => {
	let httpMock: HttpTestingController;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				HttpClientTestingModule,
			],
			providers: [
				ProfileService,
				PreferenceService,
			],
		});

		this.injector = getTestBed();
		this.service = this.injector.get(PreferenceService);
		this.backend = this.injector.get(HttpTestingController);
		httpMock = this.injector.get(HttpTestingController);
	});
	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(this.service).toBeTruthy();
	});

	it('should retrieve preferences', fakeAsync(() => {
		let preferences: any = {};
		this.service.fetch().then(result => {
			preferences = result;
		});
		const req = this.backend.expectOne(`/ws/preferences/v1/`);
		req.flush({
			sort: 'asc',
		});
		tick();
		expect(preferences.sort).toEqual('asc');
	}));

	it('should update preferences', fakeAsync(() => {
		let preferences: any = {};
		this.service.update({ sort: 'desc' }).then(result => {
			preferences = result;
		});
		const req = this.backend.expectOne(`/ws/preferences/v1/`);
		req.flush({
			sort: 'desc',
		});
		tick();
		expect(preferences.sort).toEqual('desc');
	}));
});
