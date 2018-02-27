import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CuiIconRegistryService } from './cui-icon-registry.service';
import { ICON_REGISTRY_PROVIDER } from './index';

describe('CuiIconRegistryService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [ICON_REGISTRY_PROVIDER, CuiIconRegistryService],
		});
	});

	it('should be created', inject([CuiIconRegistryService], (service: CuiIconRegistryService) => {
		expect(service).toBeTruthy();
	}));
});
