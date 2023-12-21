import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesmanagementComponent } from './filesmanagement.component';

describe('FilesmanagementComponent', () => {
  let component: FilesmanagementComponent;
  let fixture: ComponentFixture<FilesmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesmanagementComponent]
    });
    fixture = TestBed.createComponent(FilesmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
