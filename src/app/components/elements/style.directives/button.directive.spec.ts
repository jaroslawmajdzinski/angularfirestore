
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirective } from './button.directive';
import { ButtontestComponent } from './buttontest/buttontest.component';
import {  Renderer2 } from '@angular/core';

describe('ButtonDirective', () => {
  
  let fixture: ComponentFixture<ButtontestComponent>
  let testButton: HTMLButtonElement

  beforeEach(()=>{
    fixture = TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ButtonDirective,ButtontestComponent],
      providers: [Renderer2],
    }).createComponent(ButtontestComponent)
    fixture.detectChanges()
    testButton = fixture.nativeElement.querySelector('[appButton=primary')
  })

  it('it should contain button with primary color', () => {
    expect(testButton).toBeTruthy();
  });

  it('it contain class bg-primary-500 text-white hover:bg-primary-400 if primary', 
  ()=>{
     const classes = testButton.classList
      expect(classes).toContain("bg-primary-500")
    })

});
