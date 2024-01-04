import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordComponent } from './input_password.component';

describe('PasswordComponent', () => {
  let component: InputPasswordComponent;
  let fixture: ComponentFixture<InputPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputPasswordComponent]
    });
    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
