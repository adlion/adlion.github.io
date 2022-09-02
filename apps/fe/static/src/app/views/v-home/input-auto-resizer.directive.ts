/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cInputAutoResizer]',
})
export class InputAutoResizerDirective implements OnInit {
  @Input() cUsername = '';
  @Input() cHost = '';
  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  cursorNode: any;
  inputNode: any;
  //Container for terminal without input element
  terminalNode: any;

  history: Array<string> = [];

  ngOnInit(): void {
    this.initTerminalNode();
    this.initCursor();
    this.newDefaultRow();
    this.inputListen();
  }

  inputListen() {
    const inputNode = this.renderer.createElement('textarea');
    this.renderer.setAttribute(
      inputNode,
      'style',
      `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:transparent;
    outline:none;
    overflow:hidden;
    color:green;
    opacity:0;
    `
    );
    //Manage non char
    this.renderer.listen(inputNode, 'keypress', (event) => {
      //enter
      if (event.keyCode === 13) {
        event.preventDefault();
        this.executeCommand(event.target.value);
        event.target.value = '';
        this.newDefaultRow();
      }
    });
    //Manage Char

    this.renderer.listen(inputNode, 'input', (event) => {
      this.renderer.setValue(this.inputNode.lastChild, event.target.value);
    });
    this.renderer.appendChild(this.ref.nativeElement, inputNode);
  }

  executeCommand(command: string) {
    const commandOutputNode = this.renderer.createElement('div');
    this.renderer.addClass(commandOutputNode, 'terminal__output');
    this.renderer.appendChild(this.terminalNode, commandOutputNode);

    this.history.push(command);

    if (command === 'help') {
      this.renderer.addClass(commandOutputNode, 'help');

      const commands = [
        { name: 'help', description: 'This menu. This menu.This menu.This menu.This menu.This menu.This menu.This menu.This menu.This menu.This menu.This menu.This menu.This menu.' },
        { name: 'profile', description: `Adlion's profile` },
        { name: 'contact', description: 'Contact by email.' },
        { name: 'projects', description: 'Projects and experimentation.' },
        { name: 'history', description: 'Last 100 commands of this session.' },
        { name: 'clear', description: 'Clear terminal.' },
        { name: 'banner', description: 'Display welcome banner.' },
        { name: 'secret', description: 'Open a secret portal.' },
        { name: 'cv', description: `Download CV.` },
      ];

      commands.forEach((c) => {
        const _node = this.newEmptyRow();

        const commandNode = this.initCommandNode(c.name);
        this.renderer.addClass(commandNode, 'help-name');

        this.renderer.appendChild(_node, commandNode);

        const descriptionNode = this.initTextNode(c.description);
        this.renderer.appendChild(_node, descriptionNode);

        this.renderer.appendChild(commandOutputNode, _node);
      });
    }

    if (command === 'info') {
      return;
    }

    if (command === 'contact') {
      window.location.href =
        'mailto:adlionmyftarago@live.com?subject=Say hi,&body=Your%20message%20goes%20here...';
      return;
    }
    if (command === 'projects') {
      return;
    }

    if (command === 'history') {
      this.history.forEach((command) => {
        const _node = this.newEmptyRow();
        const contentNode = this.initTextNode(command);
        this.renderer.appendChild(_node, contentNode);
        this.renderer.appendChild(commandOutputNode, _node);
      });
    }

    if (command === 'clear') {
      this.renderer.removeChild(
        this.ref.nativeElement,
        this.terminalNode,
        true
      );
      this.terminalNode = this.renderer.createElement('div');
      this.renderer.appendChild(this.ref.nativeElement, this.terminalNode);
      return;
    }

    if (command === 'banner') {
      return;
    }

    if (command === 'secret') {
      return;
    }

    if (command === 'cv') {
      return;
    }
  }

  outputText(text: string) {
    return this.renderer.createText(text);
  }

  //init new empty row
  private newEmptyRow() {
    /**
     * Initialise element which will update its value based on value of input element
     */
    const _node = this.renderer.createElement('div');
    this.renderer.addClass(_node, 'terminal__row');

    this.renderer.appendChild(_node, this.cursorNode);
    return _node;
  }

  private newDefaultRow() {
    //This will create the structure of row like
    // <composer><element which is synchronised with the input><cursor>
    const _node = this.newEmptyRow();
    this.inputNode = this.initCommandNode();
    this.renderer.insertBefore(_node, this.inputNode, this.cursorNode);
    this.renderer.insertBefore(_node, this.composeHeader(), this.inputNode);
    this.renderer.appendChild(this.terminalNode, _node);
  }

  private initCommandNode(content: string = '') {
    const _node = this.renderer.createElement('span');
    this.renderer.addClass(_node, 'terminal__command');

    this.renderer.appendChild(_node, this.renderer.createText(content));
    return _node;
  }

  private initTextNode(content: string = '') {
    const _node = this.renderer.createElement('span');
    this.renderer.addClass(_node, 'terminal__text');

    this.renderer.appendChild(_node, this.renderer.createText(content));
    return _node;
  }

  private initLinkNode(content: string = '') {
    const _node = this.renderer.createElement('a');
    this.renderer.setAttribute(
      _node,
      'style',
      `
    color:red;
    `
    );
    this.renderer.appendChild(_node, this.renderer.createText(content));
    return _node;
  }
  private initTerminalNode() {
    this.terminalNode = this.renderer.createElement('div');
    this.renderer.addClass( this.terminalNode, 'terminal');
    this.renderer.appendChild(this.ref.nativeElement, this.terminalNode);
  }

  private initCursor() {
    this.cursorNode = this.renderer.createElement('span');
    this.renderer.addClass(this.cursorNode, 'terminal__cursor-blinker');
    this.renderer.setAttribute(
      this.cursorNode,
      'style',
      `
      height:2ch;
      padding:0 0.5ch;
      background: #73abad;
      animation: blink 1s linear infinite;
      `
    );
  }

  //Header example: test@test.com
  private composeHeader() {
    const _node = this.renderer.createElement('span');
    const compositionContent = {
      username: this.cUsername,
      host: `@${this.cHost}:`,
      tilde: '~',
      var: '$',
    };

    for (const compPart of Object.keys(compositionContent)) {
      const _el = this.renderer.createElement('span');
      this.renderer.addClass(this.cursorNode, `terminal__compose-${compPart}`);

      const _elContent = this.renderer.createText(
        compositionContent[compPart as keyof typeof compositionContent]
      );
      this.renderer.appendChild(_el, _elContent);

      this.renderer.appendChild(_node, _el);
    }

    this.renderer.setAttribute(_node, 'style', `padding-right:5px;`);
    return _node;
  }
}
