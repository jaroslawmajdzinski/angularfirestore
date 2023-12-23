import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesmanagementComponent } from './filesmanagement.component';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { AuthService } from 'src/app/firebase/auth.service';

describe('FilesmanagementComponent', () => {
  let component: FilesmanagementComponent;
  let fixture: ComponentFixture<FilesmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesmanagementComponent],
      providers: [FileuploadService, AuthService]
    });
    fixture = TestBed.createComponent(FilesmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
