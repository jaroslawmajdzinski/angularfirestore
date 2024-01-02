import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordConfirmation {
    
    public passwordConfirmationValidation(){
        
        return (formGroup: AbstractControl ):ValidationErrors  |  null =>{
            const password = formGroup.get('password');
            const confirmation = formGroup.get('confirmpassword')
       
            if(!password || !confirmation) return null

            if(password.value!==confirmation.value){
                confirmation.setErrors({notEqual: true})
            }

            return null
        }
    
    

    }
}