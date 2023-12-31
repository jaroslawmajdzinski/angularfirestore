import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFireAuthGuard } from './auth-guard';
import * as i0 from "@angular/core";
export class AngularFireAuthGuardModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'auth-guard-compat');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthGuardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthGuardModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthGuardModule, providers: [AngularFireAuthGuard] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthGuardModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireAuthGuard]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L2F1dGgtZ3VhcmQvYXV0aC1ndWFyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQztRQUNFLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUM3RSxDQUFDO3dHQUhVLDBCQUEwQjt5R0FBMUIsMEJBQTBCO3lHQUExQiwwQkFBMEIsYUFGMUIsQ0FBRSxvQkFBb0IsQ0FBRTs7NEZBRXhCLDBCQUEwQjtrQkFIdEMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBRSxvQkFBb0IsQ0FBRTtpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVBdXRoR3VhcmQgfSBmcm9tICcuL2F1dGgtZ3VhcmQnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFsgQW5ndWxhckZpcmVBdXRoR3VhcmQgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZUF1dGhHdWFyZE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdhdXRoLWd1YXJkLWNvbXBhdCcpO1xuICB9XG59XG4iXX0=