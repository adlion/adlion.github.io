import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsProfileComponent } from './terminal-commands-profile.component';

describe('TerminalCommandsProfileComponent', () => {
  let component: TerminalCommandsProfileComponent;
  let fixture: ComponentFixture<TerminalCommandsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
