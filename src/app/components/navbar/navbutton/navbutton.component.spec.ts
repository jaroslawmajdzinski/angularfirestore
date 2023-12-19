import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbuttonComponent } from './navbutton.component';

describe('NavbuttonComponent', () => {
  let component: NavbuttonComponent;
  let fixture: ComponentFixture<NavbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbuttonComponent]
    });
    fixture = TestBed.createComponent(NavbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
