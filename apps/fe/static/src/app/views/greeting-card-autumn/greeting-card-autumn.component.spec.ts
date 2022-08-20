import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingCardAutumnComponent } from './greeting-card-autumn.component';

describe('GreetingCardAutumnComponent', () => {
  let component: GreetingCardAutumnComponent;
  let fixture: ComponentFixture<GreetingCardAutumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreetingCardAutumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingCardAutumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
