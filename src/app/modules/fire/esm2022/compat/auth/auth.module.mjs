import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from './auth';
import * as i0 from "@angular/core";
export class AngularFireAuthModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'auth-compat');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthModule, providers: [AngularFireAuth] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireAuth]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L2F1dGgvYXV0aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7O0FBS3pDLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEM7UUFDRSxRQUFRLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7d0dBSFUscUJBQXFCO3lHQUFyQixxQkFBcUI7eUdBQXJCLHFCQUFxQixhQUZyQixDQUFFLGVBQWUsQ0FBRTs7NEZBRW5CLHFCQUFxQjtrQkFIakMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBRSxlQUFlLENBQUU7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlQXV0aCB9IGZyb20gJy4vYXV0aCc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogWyBBbmd1bGFyRmlyZUF1dGggXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZUF1dGhNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBmaXJlYmFzZS5yZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnYXV0aC1jb21wYXQnKTtcbiAgfVxufVxuIl19