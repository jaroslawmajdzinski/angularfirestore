import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColormodeComponent } from './colormode.component';

describe('ColormodeComponent', () => {
  let component: ColormodeComponent;
  let fixture: ComponentFixture<ColormodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColormodeComponent]
    });
    fixture = TestBed.createComponent(ColormodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
