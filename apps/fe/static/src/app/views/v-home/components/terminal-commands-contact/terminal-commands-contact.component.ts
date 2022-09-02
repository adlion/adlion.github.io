import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'personal-terminal-commands-contact',
  template: `Your default e-mail client should have been opened in a new window if browser has not blocked the action. `,
  styles: [],
})
export class TerminalCommandsContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.location.href =
      'mailto:adlionmyftarago@live.com?subject=Hi...&body=Hi...';
  }
}
