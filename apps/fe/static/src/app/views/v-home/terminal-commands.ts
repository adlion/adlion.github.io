import { TerminalCommandsBannerComponent } from './components/terminal-commands-banner/terminal-commands-banner.component';
import { TerminalCommandsContactComponent } from './components/terminal-commands-contact/terminal-commands-contact.component';
import { TerminalCommandsCvComponent } from './components/terminal-commands-cv/terminal-commands-cv.component';
import { TerminalCommandsHelpComponent } from './components/terminal-commands-help/terminal-commands-help.component';
import { TerminalCommandsNotFoundComponent } from './components/terminal-commands-not-found/terminal-commands-not-found.component';
import { TerminalCommandsProfileComponent } from './components/terminal-commands-profile/terminal-commands-profile.component';
import { TerminalCommandsProjectsComponent } from './components/terminal-commands-projects/terminal-commands-projects.component';
import { TerminalCommandsSecretComponent } from './components/terminal-commands-secret/terminal-commands-secret.component';

export const commands: Array<ITerminalCommand> = [
  //!Keep it first
  { command: 'banner', component: TerminalCommandsBannerComponent },
  { command: 'help', component: TerminalCommandsHelpComponent },
  { command: 'profile', component: TerminalCommandsProfileComponent },
  { command: 'contact', component: TerminalCommandsContactComponent },
  // { command: 'projects', component: TerminalCommandsProjectsComponent },
  { command: 'history', component: null },
  { command: 'clear', component: null },
  // { command: 'secret', component: TerminalCommandsSecretComponent },
  { command: 'cv', component: TerminalCommandsCvComponent },
  //Keep it last
  { command: 'not-found', component: TerminalCommandsNotFoundComponent },
];

export interface ITerminalCommand {
  command: string;
  component: any;
}
