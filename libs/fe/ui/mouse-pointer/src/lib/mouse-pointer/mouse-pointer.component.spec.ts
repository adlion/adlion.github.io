import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePointerComponent } from './mouse-pointer.component';

describe('MousePointerComponent', () => {
  let component: MousePointerComponent;
  let fixture: ComponentFixture<MousePointerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MousePointerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MousePointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
