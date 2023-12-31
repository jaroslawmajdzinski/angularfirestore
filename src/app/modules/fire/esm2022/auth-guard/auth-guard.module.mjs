import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import { registerVersion } from 'firebase/app';
import { AuthGuard } from './auth-guard';
import * as i0 from "@angular/core";
export class AuthGuardModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'auth-guard');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AuthGuardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AuthGuardModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AuthGuardModule, providers: [AuthGuard] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AuthGuardModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AuthGuard]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC1ndWFyZC9hdXRoLWd1YXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUt6QyxNQUFNLE9BQU8sZUFBZTtJQUMxQjtRQUNFLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RCxDQUFDO3dHQUhVLGVBQWU7eUdBQWYsZUFBZTt5R0FBZixlQUFlLGFBRmYsQ0FBRSxTQUFTLENBQUU7OzRGQUViLGVBQWU7a0JBSDNCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUUsU0FBUyxDQUFFO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyByZWdpc3RlclZlcnNpb24gfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9hdXRoLWd1YXJkJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEF1dGhHdWFyZCBdXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdhdXRoLWd1YXJkJyk7XG4gIH1cbn1cbiJdfQ==