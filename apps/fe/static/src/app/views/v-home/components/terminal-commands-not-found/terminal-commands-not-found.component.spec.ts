import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsNotFoundComponent } from './terminal-commands-not-found.component';

describe('TerminalCommandsNotFoundComponent', () => {
  let component: TerminalCommandsNotFoundComponent;
  let fixture: ComponentFixture<TerminalCommandsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
