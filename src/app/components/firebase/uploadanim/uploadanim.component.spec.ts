import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadanimComponent } from './uploadanim.component';

describe('UploadanimComponent', () => {
  let component: UploadanimComponent;
  let fixture: ComponentFixture<UploadanimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadanimComponent]
    });
    fixture = TestBed.createComponent(UploadanimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
