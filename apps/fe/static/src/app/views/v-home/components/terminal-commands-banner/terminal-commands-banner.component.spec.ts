import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsBannerComponent } from './terminal-commands-banner.component';

describe('TerminalCommandsBannerComponent', () => {
  let component: TerminalCommandsBannerComponent;
  let fixture: ComponentFixture<TerminalCommandsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalCommandsBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalCommandsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
