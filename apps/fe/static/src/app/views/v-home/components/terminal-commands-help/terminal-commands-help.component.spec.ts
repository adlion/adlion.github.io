import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsHelpComponent } from './terminal-commands-help.component';

describe('TerminalCommandsHelpComponent', () => {
  let component: TerminalCommandsHelpComponent;
  let fixture: ComponentFixture<TerminalCommandsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsHelpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
