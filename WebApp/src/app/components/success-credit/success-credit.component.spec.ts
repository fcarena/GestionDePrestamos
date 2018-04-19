import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreditComponent } from './success-credit.component';

describe('SuccessCreditComponent', () => {
  let component: SuccessCreditComponent;
  let fixture: ComponentFixture<SuccessCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
