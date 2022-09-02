import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  selector: 'personal-terminal-commands-profile',
  templateUrl: './terminal-commands-profile.component.html',
  styleUrls: ['./terminal-commands-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalCommandsProfileComponent implements AfterViewInit {
  constructor(private chg: ChangeDetectorRef) {}

  colors = [
    '#ff00d4',
    '#FFF01F',
    '#00e8ff',
    '#33ff33',
    '#ffc800',
    '#FF3131',
    '#1F51FF',
    '#FF44CC',
  ];

  ngAfterViewInit(): void {
    this.chg.detectChanges();
  }
  public get color(): string {
    return this.colors[
      Math.floor(Math.random() * (this.colors.length - 0) + 0)
    ];
  }
}
