import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandComponent } from './expand.component';

describe('ExpandComponent', () => {
  let component: ExpandComponent;
  let fixture: ComponentFixture<ExpandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandComponent]
    });
    fixture = TestBed.createComponent(ExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
