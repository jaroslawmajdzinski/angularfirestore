import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from './database';
import * as i0 from "@angular/core";
export class AngularFireDatabaseModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'rtdb-compat');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireDatabaseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireDatabaseModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireDatabaseModule, providers: [AngularFireDatabase] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireDatabaseModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireDatabase]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBhdC9kYXRhYmFzZS9kYXRhYmFzZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFLakQsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQztRQUNFLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQzt3R0FIVSx5QkFBeUI7eUdBQXpCLHlCQUF5Qjt5R0FBekIseUJBQXlCLGFBRnpCLENBQUUsbUJBQW1CLENBQUU7OzRGQUV2Qix5QkFBeUI7a0JBSHJDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUUsbUJBQW1CLENBQUU7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlRGF0YWJhc2UgfSBmcm9tICcuL2RhdGFiYXNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEFuZ3VsYXJGaXJlRGF0YWJhc2UgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZURhdGFiYXNlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZmlyZWJhc2UucmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ3J0ZGItY29tcGF0Jyk7XG4gIH1cbn1cbiJdfQ==