import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsCvComponent } from './terminal-commands-cv.component';

describe('TerminalCommandsCvComponent', () => {
  let component: TerminalCommandsCvComponent;
  let fixture: ComponentFixture<TerminalCommandsCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsCvComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
