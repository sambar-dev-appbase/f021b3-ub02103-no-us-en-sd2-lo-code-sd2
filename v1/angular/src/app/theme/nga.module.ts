import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Modals } from '../pages/ui/components/modals/modals.component';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';
import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  BaBackTop,
  BaCard,
  BaCheckbox,
  BaMenuItem,
  BaMenu,
  BaMultiCheckbox,
  BaPageTop,
  BaSidebar
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun
} from './directives';


import {
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner
} from './services';


const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  BaCheckbox,
  BaMenuItem,
  BaMenu,
  BaMultiCheckbox,
  BaPageTop,
  Modals,
  BaSidebar
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur
];


const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService
];


@NgModule({
  declarations: [
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_SERVICES
      ],
    };
  }
}
