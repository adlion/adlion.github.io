import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VHomeComponent } from './v-home.component';
import { RouterModule } from '@angular/router';
import { NgTemplateNameDirective } from './ng-template-name.directive';
import { TerminalCommandsHelpComponent } from './components/terminal-commands-help/terminal-commands-help.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RingChartModule } from '@noi/fe/ui/ring-chart';
import { TerminalCommandsProfileComponent } from './components/terminal-commands-profile/terminal-commands-profile.component';
import { TerminalCommandsBannerComponent } from './components/terminal-commands-banner/terminal-commands-banner.component';
import { TerminalCommandsContactComponent } from './components/terminal-commands-contact/terminal-commands-contact.component';
import { TerminalCommandsNotFoundComponent } from './components/terminal-commands-not-found/terminal-commands-not-found.component';
@NgModule({
  declarations: [
    VHomeComponent,
    NgTemplateNameDirective,
    TerminalCommandsHelpComponent,
    TerminalCommandsProfileComponent,
    TerminalCommandsBannerComponent,
    TerminalCommandsContactComponent,
    TerminalCommandsNotFoundComponent
  ],
  imports: [
    RingChartModule,
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: VHomeComponent,
      },
    ]),
  ],
})
export class VHomeModule {}
