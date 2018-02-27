import { TestBed, inject } from '@angular/core/testing';

import { DeviceService, Device } from './device.service';

describe('DeviceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DeviceService],
		});
	});

	it('should ...', inject([DeviceService], (service: DeviceService) => {
		expect(service).toBeTruthy();
	}));

	it('should retrieve device details', inject([DeviceService], (service: DeviceService) => {
		const device: Device = service.getDevice();
		expect(device.displayName).toBeTruthy();
	}));

	it('should retrieve whether the device is mobile',
	inject([DeviceService], (service: DeviceService) => {
		expect(service.isMobile()).toBeDefined();
	}));

	it('should retrieve whether the device is windows',
	inject([DeviceService], (service: DeviceService) => {
		expect(service.isWindows()).toBeDefined();
	}));

	it('should retrieve whether the device is mac',
	inject([DeviceService], (service: DeviceService) => {
		expect(service.isMac()).toBeDefined();
	}));

	it('should retrieve whether the device is linux',
	inject([DeviceService], (service: DeviceService) => {
		expect(service.isLinux()).toBeDefined();
	}));
});
