import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CuiIconRegistry } from './icon-registry';
import { iconNames } from './icon-names';

@Injectable()
export class CuiIconRegistryService {
	constructor(
		iconRegistry: CuiIconRegistry,
		sanitizer: DomSanitizer,
	) {
		for (const icon of iconNames) {
			iconRegistry.addSvgIcon(
				`icon-${icon}`,
				sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}.svg`),
			);
		}
	}
}
