import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionareaComponent } from './actionarea.component';
import { ButtonDirective } from '../../elements/style.directives/button.directive';
import { MatButtonModule } from '@angular/material/button';

describe('ActionareaComponent', () => {
  let component: ActionareaComponent;
  let fixture: ComponentFixture<ActionareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [ActionareaComponent, ButtonDirective],
    
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
    expect(buttons).
  }));

});
