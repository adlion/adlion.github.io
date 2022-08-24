import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VGreetingCardAutumnComponent } from './v-greeting-card-autumn.component';

describe('VGreetingCardAutumnComponent', () => {
  let component: VGreetingCardAutumnComponent;
  let fixture: ComponentFixture<VGreetingCardAutumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VGreetingCardAutumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VGreetingCardAutumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
