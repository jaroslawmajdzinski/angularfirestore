import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagepreviewComponent } from './imagepreview.component';

describe('ImagepreviewComponent', () => {
  let component: ImagepreviewComponent;
  let fixture: ComponentFixture<ImagepreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagepreviewComponent]
    });
    fixture = TestBed.createComponent(ImagepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
