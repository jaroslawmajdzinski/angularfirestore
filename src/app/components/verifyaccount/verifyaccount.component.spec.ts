import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyaccountComponent } from './verifyaccount.component';

describe('VerifyaccountComponent', () => {
  let component: VerifyaccountComponent;
  let fixture: ComponentFixture<VerifyaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyaccountComponent]
    });
    fixture = TestBed.createComponent(VerifyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
