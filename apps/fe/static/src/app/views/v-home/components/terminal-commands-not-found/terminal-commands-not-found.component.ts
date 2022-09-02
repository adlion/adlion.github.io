import { Component } from '@angular/core';

@Component({
  selector: 'personal-terminal-commands-not-found',
  template: `  <div class="terminal-ascii-art">¯\\_(ツ)_/¯</div><div><p class="terminal-not-found">Command not found!</p><p class="terminal-not-found">Try typing <span>'help'</span>!</p></div><div>`,
  styles: [
    `
    :host{
      display:flex;
      flex-direction:row;
    }
    .terminal-ascii-art{
      font-size: 4em;
      margin-left: 2em;
      animation: anim_color 2s ease-in-out infinite alternate;
    }
    .terminal-not-found{
      color: #09e7e6;
      span{
        color: #33ff33;
      }
    }

    @keyframes anim_color {
      from {
        color: inherit;
      }
      to {
        color: red;
      }
    }
    `
  ],
})
export class TerminalCommandsNotFoundComponent  {

}
