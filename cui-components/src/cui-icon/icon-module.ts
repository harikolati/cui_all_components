/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { MatCommonModule } from './mat-deps/common';
import { CuiIconComponent } from './icon';
import { ICON_REGISTRY_PROVIDER } from './icon-registry';
import { CuiIconRegistryService } from './cui-icon-registry.service';


@NgModule({
	imports: [MatCommonModule],
	exports: [CuiIconComponent],
	declarations: [CuiIconComponent],
	providers: [ICON_REGISTRY_PROVIDER, CuiIconRegistryService],
})
export class CuiIconModule {}
