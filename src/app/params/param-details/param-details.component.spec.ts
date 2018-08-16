import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamDetailsComponent } from './param-details.component';

describe('ParamDetailsComponent', () => {
  let component: ParamDetailsComponent;
  let fixture: ComponentFixture<ParamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
