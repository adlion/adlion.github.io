import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsSecretComponent } from './terminal-commands-secret.component';

describe('TerminalCommandsSecretComponent', () => {
  let component: TerminalCommandsSecretComponent;
  let fixture: ComponentFixture<TerminalCommandsSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsSecretComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
