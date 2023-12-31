import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFirestore, ENABLE_PERSISTENCE, PERSISTENCE_SETTINGS } from './firestore';
import * as i0 from "@angular/core";
export class AngularFirestoreModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'fst-compat');
    }
    /**
     * Attempt to enable persistent storage, if possible
     */
    static enablePersistence(persistenceSettings) {
        return {
            ngModule: AngularFirestoreModule,
            providers: [
                { provide: ENABLE_PERSISTENCE, useValue: true },
                { provide: PERSISTENCE_SETTINGS, useValue: persistenceSettings },
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFirestoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFirestoreModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFirestoreModule, providers: [AngularFirestore] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFirestoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFirestore]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvZmlyZXN0b3JlL2ZpcmVzdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBTXpGLE1BQU0sT0FBTyxzQkFBc0I7SUFDakM7UUFDRSxRQUFRLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBeUM7UUFDaEUsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBQy9DLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTthQUNqRTtTQUNGLENBQUM7SUFDSixDQUFDO3dHQWZVLHNCQUFzQjt5R0FBdEIsc0JBQXNCO3lHQUF0QixzQkFBc0IsYUFGdEIsQ0FBRSxnQkFBZ0IsQ0FBRTs7NEZBRXBCLHNCQUFzQjtrQkFIbEMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRTtpQkFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZSwgRU5BQkxFX1BFUlNJU1RFTkNFLCBQRVJTSVNURU5DRV9TRVRUSU5HUyB9IGZyb20gJy4vZmlyZXN0b3JlJztcbmltcG9ydCB7IFBlcnNpc3RlbmNlU2V0dGluZ3MgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFsgQW5ndWxhckZpcmVzdG9yZSBdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlc3RvcmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBmaXJlYmFzZS5yZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnZnN0LWNvbXBhdCcpO1xuICB9XG4gIC8qKlxuICAgKiBBdHRlbXB0IHRvIGVuYWJsZSBwZXJzaXN0ZW50IHN0b3JhZ2UsIGlmIHBvc3NpYmxlXG4gICAqL1xuICBzdGF0aWMgZW5hYmxlUGVyc2lzdGVuY2UocGVyc2lzdGVuY2VTZXR0aW5ncz86IFBlcnNpc3RlbmNlU2V0dGluZ3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFuZ3VsYXJGaXJlc3RvcmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJGaXJlc3RvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBFTkFCTEVfUEVSU0lTVEVOQ0UsIHVzZVZhbHVlOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogUEVSU0lTVEVOQ0VfU0VUVElOR1MsIHVzZVZhbHVlOiBwZXJzaXN0ZW5jZVNldHRpbmdzIH0sXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19