import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileinfoComponent } from './fileinfo.component';

describe('FileinfoComponent', () => {
  let component: FileinfoComponent;
  let fixture: ComponentFixture<FileinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileinfoComponent]
    });
    fixture = TestBed.createComponent(FileinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
