import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyItemsComponent } from './survey-items.component';

describe('SurveyItemsComponent', () => {
  let component: SurveyItemsComponent;
  let fixture: ComponentFixture<SurveyItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
