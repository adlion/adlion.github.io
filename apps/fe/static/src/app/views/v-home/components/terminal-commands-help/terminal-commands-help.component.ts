import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'personal-terminal-commands-help',
  //!Be careful with line breaks and spaces
  //It might break the template
  // prettier-ignore
  template: `<div class="terminal__output help">
    <div *ngFor="let command of commands" class="terminal__row help__row">
      <div class="help__command terminal__command">{{ command.name }}</div>
      <div class="help__description terminal__text">{{ command.description }}</div>
    </div>
  </div>`,
  styleUrls: [
    '../../common.component.scss',
    './terminal-commands-help.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalCommandsHelpComponent {
  constructor() {}
  commands = [
    {
      name: 'help',
      description: `This menu.`,
    },
    {
      name: 'profile',
      description: `Adlion's profile.`,
    },
    { name: 'contact', description: 'Contact by email.' },
    // { name: 'projects', description: 'Projects and experimentation.' },
    { name: 'history', description: 'History of commands for this session.' },
    { name: 'clear', description: 'Clear terminal.' },
    { name: 'banner', description: 'Display welcome banner.' },
    {
      name: 'secret',
      description: 'Open a secret portal if you can find the secret phrase.',
    },
  ];
}
