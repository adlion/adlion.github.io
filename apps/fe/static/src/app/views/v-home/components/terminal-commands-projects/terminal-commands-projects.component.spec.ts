import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsProjectsComponent } from './terminal-commands-projects.component';

describe('TerminalCommandsProjectsComponent', () => {
  let component: TerminalCommandsProjectsComponent;
  let fixture: ComponentFixture<TerminalCommandsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
