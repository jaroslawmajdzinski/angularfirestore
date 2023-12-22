import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionareaComponent } from './actionarea.component';

describe('ActionareaComponent', () => {
  let component: ActionareaComponent;
  let fixture: ComponentFixture<ActionareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionareaComponent]
    });
    fixture = TestBed.createComponent(ActionareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shuld show expected buttons ok cancel',(()=>{
    const buttons: HTMLButtonElement = fixture.nativeElement.querySelector('button')
    expect(buttons)
  }));

});
