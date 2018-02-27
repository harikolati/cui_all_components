import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { LogService } from './log.service';

describe('LogService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [LogService],
		});
	});

	it('should ...', inject([LogService], (service: LogService) => {
		expect(service).toBeTruthy();
	}));

	it('should log info messages', inject([LogService], (service: LogService) => {
		expect(service.info('test')).toEqual('info: test');
	}));

	it('should log debug messages', inject([LogService], (service: LogService) => {
		expect(service.debug('test')).toEqual('debug: test');
	}));

	it('should log warning messages', inject([LogService], (service: LogService) => {
		expect(service.warn('test')).toEqual('warning: test');
	}));

	it('should log error messages', inject([LogService], (service: LogService) => {
		expect(service.error('test')).toEqual('error: test');
	}));

	it('should log verbose messages', inject([LogService], (service: LogService) => {
		expect(service.verbose('test')).toEqual('verbose: test');
	}));
});
