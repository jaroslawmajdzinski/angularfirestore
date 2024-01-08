import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmothheightComponent } from './smothheight.component';

describe('SmothheightComponent', () => {
  let component: SmothheightComponent;
  let fixture: ComponentFixture<SmothheightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmothheightComponent]
    });
    fixture = TestBed.createComponent(SmothheightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
