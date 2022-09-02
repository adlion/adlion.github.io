/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  ElementRef,
  EmbeddedViewRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { commands as COMMANDS } from './terminal-commands';

@Component({
  selector: 'personal-v-home',
  templateUrl: './v-home.component.html',
  styleUrls: ['./common.component.scss', './v-home.component.scss'],
})
export class VHomeComponent implements OnInit {
  @ViewChild('textAreaRef', { static: true })
  textAreaRef!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('inputRowRef', { read: TemplateRef, static: true })
  inputRowRef!: TemplateRef<any>;

  @ViewChild('terminalRef', { read: ViewContainerRef, static: true })
  terminalRef!: ViewContainerRef;

  @ViewChild('cursorRef', { read: TemplateRef, static: true })
  cursorRef!: TemplateRef<any>;

  @ViewChild('historyRef', { read: TemplateRef, static: true })
  historyRef!: TemplateRef<any>;

  constructor(private renderer: Renderer2) {}

  host = location.hostname;
  username = 'guest';
  activeRow!: EmbeddedViewRef<any>;

  history: Array<string> = [];
  ngOnInit(): void {
    this.consoleArt();
    this.terminalRef.createComponent(COMMANDS[0].component);
    this.newDefaultRow();
    this.inputListen();
  }
  consoleArt() {
    console.log(
      `%c
                               ▄▒▓▒▓▌░▀▄▄
                             ▄░▄▄▓▓▀▀▒▒▀▓▓▄
                             ▓▓▓▓▒░░░░░░░░░░▓▄
                           ▐▓▒░░░░░░░░░░░░░░░▀▄
                          ▐▓░░░░░░░░░░░░░░░░░░░░
                          ▐▓░░░░░░░░░░░░░░░░░░░▓
                          ▐▓░░░░░░░▀▀ ▀▀░▒▀▀▀▀▀▓▌
        ▄▄▄                ▓▓░░▒▓        ░      ░░                ▄▄▄▄
   ▄▓▀▀▀▓░░▓▄              ▐▓▒▓▓░  ▀     ▐░  ▄ ▀▐░              ▄▓▓▒▓▓▀▀▓▄
 ▄▓▀▓▄░▒▓▀▀▀▀▓            ▐▓▓▓▓▓▓▄      ▄▒░░░░▓▓▌              ▓▀░░▀▓▓░▓▓▓▓▄
▐▓░░░░▓▓░░░░░░▒           ▐▌▀▓▒░░░░░░▒▓▓▄▄▄▄▓▓▓▓▄             ▐▓░▓░░░▓▓░░░▒▓░
▐▓▓▓░░▓▓▓▓▓░░░▓            ▄▓▓▓░░░▒▓▓▒░░░░░░░░░░▒▓▓░▄        ▄▓▒░░▓▓▒▀▓▒▒▓▀▓░
 ▀▓▓▀▀░░░▓░░░░░▒▄          ▓▓▓▓░▒▓▓░░░░░░░░░░░░░░▒▓▒▓      ▄▓▒░░░░▀░░░░░░░▓
   ▀▓░░░░░░░░░░░░▀▄         ▀▀▓░▓▓░░░░░░░░░░░░░░░▀▀▓░    ▄▓▒░░░░░░░░░░░▒▀
     ▀▓░░░░░░░░░░░░░░▄        ▓░▓▓░░░░░░░░░░░░░▓▓▀▀   ▄▓▀░░░░░░░░░░░░░▀
      ▀▓▒░░░░░░░░░░░░░░░▄     ▓▓░▓▓▒░░░░░░░░▒▓▓▀   ▄▓▀░░░░░░░░░░░░░░▓
        ▀▓▒░░░░░░░░░░░░░░▓▓▓▄▄▓▒▒▒▒▓▓▓▓▓▓▓▓▀▓░ ▄▀▀▀▀▓░░░░░░░░░░░░░▒▀
          ▀▓▒░░░░░░░░░░░░░▓░ ▀▓░░░    ░▀▓░░░▓░░▀░    ▀▀▒░░░░░░░░▒▀
            ▀▓▒░░░░░░░░░░▓░    ▓░     ░  ▀▒░▒░  ░░      ▀░░░░░▒▀
              ▀▓▒░░░░░░░▓       ░▄▄▄▄░     ▀  ░▄▐░       ▐░░▒▀
                ▀▓▓░░░░▀         ░             ░░         ▐▌
                  ▒▓▓▀░                         ░        ▄░
                   ▀▓▄░                         ▐░   ▄▄░▀
                      ▀▀▀▒▄░▄                    ▀▓░
                        ▄▓░                        ▀░
                       ▄░                            ▀░
                     ▄▀░                               ░
                    ▓░                                  ░
                  ▐▓░                                   ▐▓
                  ▓░            ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         ▓
    `,
      ' font-size: 0.9em;overflow:hidden;'
    );
    console.log(
      '%cYou found the first clue of secret phrase! ',
      'color: #33ff33; font-weight: bold; font-size: 24px;'
    );
    console.log(
      '%cEncrypted secret: ' +
        'bm9pbGRhLmNvbS9wb3J0YWw_cGFzc2NvZGU9IjAzMDA2MzkxNjZhIg',
      'color: #FF44CC'
    );
  }
  inputListen() {
    //Manage non char
    this.renderer.listen(
      this.textAreaRef.nativeElement,
      'keypress',
      (event) => {
        //enter
        if (event.keyCode === 13) {
          event.preventDefault();
          this.activeRow.context['cursor'] = null;
          this.executeCommand(event.target.value);
          // this.terminalRef.element.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            this.activeRow.detach();
            event.target.value = '';
            this.newDefaultRow();
          }, 100);
        }
      }
    );
    //Manage Char

    this.renderer.listen(this.textAreaRef.nativeElement, 'input', (event) => {
      this.activeRow.context['inputValue'] = event.target.value;
    });
  }

  executeCommand(command: string) {
    this.history.push(command);
    if (command === 'clear') {
      this.terminalRef.clear();
      return;
    }

    if (command === 'history') {
      this.history.forEach((item) => {
        console.log(item);
        this.activeRow = this.terminalRef.createEmbeddedView(this.historyRef, {
          inputValue: item,
        });
        setTimeout(() => {
          this.activeRow.detach();
        }, 100);
      });
      return;
    }

    for (const _c of COMMANDS) {
      if (_c.command === command) {
        this.terminalRef.createComponent(_c.component);
        return;
      }

      if (_c.command === 'not-found') {
        this.terminalRef.createComponent(_c.component);
      }
    }
  }
  newDefaultRow() {
    this.activeRow = this.terminalRef.createEmbeddedView(this.inputRowRef, {
      inputValue: '',
      cursor: this.cursorRef,
    });
  }
}
