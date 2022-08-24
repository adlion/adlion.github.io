import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VGalaxyComponent } from './v-galaxy.component';

describe('VGalaxyComponent', () => {
  let component: VGalaxyComponent;
  let fixture: ComponentFixture<VGalaxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VGalaxyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VGalaxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
