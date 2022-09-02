import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsContactComponent } from './terminal-commands-contact.component';

describe('TerminalCommandsContactComponent', () => {
  let component: TerminalCommandsContactComponent;
  let fixture: ComponentFixture<TerminalCommandsContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
