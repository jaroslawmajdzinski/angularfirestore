import { InjectionToken, Injector, NgModule, NgZone, Optional } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { ɵAppCheckInstances } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { FIRESTORE_PROVIDER_NAME, Firestore, FirestoreInstances } from './firestore';
import * as i0 from "@angular/core";
export const PROVIDED_FIRESTORE_INSTANCES = new InjectionToken('angularfire2.firestore-instances');
export function defaultFirestoreInstanceFactory(provided, defaultApp) {
    const defaultFirestore = ɵgetDefaultInstanceOf(FIRESTORE_PROVIDER_NAME, provided, defaultApp);
    return defaultFirestore && new Firestore(defaultFirestore);
}
export function firestoreInstanceFactory(fn) {
    return (zone, injector) => {
        const firestore = zone.runOutsideAngular(() => fn(injector));
        return new Firestore(firestore);
    };
}
const FIRESTORE_INSTANCES_PROVIDER = {
    provide: FirestoreInstances,
    deps: [
        [new Optional(), PROVIDED_FIRESTORE_INSTANCES],
    ]
};
const DEFAULT_FIRESTORE_INSTANCE_PROVIDER = {
    provide: Firestore,
    useFactory: defaultFirestoreInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_FIRESTORE_INSTANCES],
        FirebaseApp,
    ]
};
export class FirestoreModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'fst');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule, providers: [
            DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
            FIRESTORE_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
                        FIRESTORE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function provideFirestore(fn, ...deps) {
    return {
        ngModule: FirestoreModule,
        providers: [{
                provide: PROVIDED_FIRESTORE_INSTANCES,
                useFactory: firestoreInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    // Firestore+Auth work better if Auth is loaded first
                    [new Optional(), AuthInstances],
                    [new Optional(), ɵAppCheckInstances],
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9maXJlc3RvcmUvZmlyZXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFHLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUVyRixNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBYyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRWhILE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxRQUF1QyxFQUFFLFVBQXVCO0lBQzlHLE1BQU0sZ0JBQWdCLEdBQUcscUJBQXFCLENBQW9CLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqSCxPQUFPLGdCQUFnQixJQUFJLElBQUksU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxFQUE2QztJQUNwRixPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsRUFBRTtRQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSw0QkFBNEIsR0FBRztJQUNuQyxPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBRTtLQUNoRDtDQUNGLENBQUM7QUFFRixNQUFNLG1DQUFtQyxHQUFHO0lBQzFDLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFVBQVUsRUFBRSwrQkFBK0I7SUFDM0MsSUFBSSxFQUFFO1FBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLDRCQUE0QixDQUFFO1FBQy9DLFdBQVc7S0FDWjtDQUNGLENBQUM7QUFRRixNQUFNLE9BQU8sZUFBZTtJQUMxQjtRQUNFLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO3dHQUhVLGVBQWU7eUdBQWYsZUFBZTt5R0FBZixlQUFlLGFBTGY7WUFDVCxtQ0FBbUM7WUFDbkMsNEJBQTRCO1NBQzdCOzs0RkFFVSxlQUFlO2tCQU4zQixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxtQ0FBbUM7d0JBQ25DLDRCQUE0QjtxQkFDN0I7aUJBQ0Y7O0FBT0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEVBQTZDLEVBQUUsR0FBRyxJQUFXO0lBQzVGLE9BQU87UUFDTCxRQUFRLEVBQUUsZUFBZTtRQUN6QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsNEJBQTRCO2dCQUNyQyxVQUFVLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixRQUFRO29CQUNSLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWixxREFBcUQ7b0JBQ3JELENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUU7b0JBQ2hDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxrQkFBa0IsQ0FBRTtvQkFDckMsR0FBRyxJQUFJO2lCQUNSO2FBQ0YsQ0FBQztLQUNILENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsIMm1Z2V0RGVmYXVsdEluc3RhbmNlT2YgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IMm1QXBwQ2hlY2tJbnN0YW5jZXMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IEZpcmViYXNlQXBwLCBGaXJlYmFzZUFwcHMgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcCc7XG5pbXBvcnQgeyBBdXRoSW5zdGFuY2VzICB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXV0aCc7XG5pbXBvcnQgeyByZWdpc3RlclZlcnNpb24gfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgRmlyZXN0b3JlIGFzIEZpcmViYXNlRmlyZXN0b3JlIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmltcG9ydCB7IEZJUkVTVE9SRV9QUk9WSURFUl9OQU1FLCBGaXJlc3RvcmUsIEZpcmVzdG9yZUluc3RhbmNlcyB9IGZyb20gJy4vZmlyZXN0b3JlJztcblxuZXhwb3J0IGNvbnN0IFBST1ZJREVEX0ZJUkVTVE9SRV9JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48RmlyZXN0b3JlW10+KCdhbmd1bGFyZmlyZTIuZmlyZXN0b3JlLWluc3RhbmNlcycpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZpcmVzdG9yZUluc3RhbmNlRmFjdG9yeShwcm92aWRlZDogRmlyZWJhc2VGaXJlc3RvcmVbXXx1bmRlZmluZWQsIGRlZmF1bHRBcHA6IEZpcmViYXNlQXBwKSB7XG4gIGNvbnN0IGRlZmF1bHRGaXJlc3RvcmUgPSDJtWdldERlZmF1bHRJbnN0YW5jZU9mPEZpcmViYXNlRmlyZXN0b3JlPihGSVJFU1RPUkVfUFJPVklERVJfTkFNRSwgcHJvdmlkZWQsIGRlZmF1bHRBcHApO1xuICByZXR1cm4gZGVmYXVsdEZpcmVzdG9yZSAmJiBuZXcgRmlyZXN0b3JlKGRlZmF1bHRGaXJlc3RvcmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZXN0b3JlSW5zdGFuY2VGYWN0b3J5KGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZUZpcmVzdG9yZSkge1xuICByZXR1cm4gKHpvbmU6IE5nWm9uZSwgaW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgY29uc3QgZmlyZXN0b3JlID0gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBmbihpbmplY3RvcikpO1xuICAgIHJldHVybiBuZXcgRmlyZXN0b3JlKGZpcmVzdG9yZSk7XG4gIH07XG59XG5cbmNvbnN0IEZJUkVTVE9SRV9JTlNUQU5DRVNfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEZpcmVzdG9yZUluc3RhbmNlcyxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERURfRklSRVNUT1JFX0lOU1RBTkNFUyBdLFxuICBdXG59O1xuXG5jb25zdCBERUZBVUxUX0ZJUkVTVE9SRV9JTlNUQU5DRV9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogRmlyZXN0b3JlLFxuICB1c2VGYWN0b3J5OiBkZWZhdWx0RmlyZXN0b3JlSW5zdGFuY2VGYWN0b3J5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9GSVJFU1RPUkVfSU5TVEFOQ0VTIF0sXG4gICAgRmlyZWJhc2VBcHAsXG4gIF1cbn07XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIERFRkFVTFRfRklSRVNUT1JFX0lOU1RBTkNFX1BST1ZJREVSLFxuICAgIEZJUkVTVE9SRV9JTlNUQU5DRVNfUFJPVklERVIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRmlyZXN0b3JlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ2ZzdCcpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlRmlyZXN0b3JlKGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZUZpcmVzdG9yZSwgLi4uZGVwczogYW55W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZpcmVzdG9yZU1vZHVsZT4ge1xuICByZXR1cm4ge1xuICAgIG5nTW9kdWxlOiBGaXJlc3RvcmVNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgcHJvdmlkZTogUFJPVklERURfRklSRVNUT1JFX0lOU1RBTkNFUyxcbiAgICAgIHVzZUZhY3Rvcnk6IGZpcmVzdG9yZUluc3RhbmNlRmFjdG9yeShmbiksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgTmdab25lLFxuICAgICAgICBJbmplY3RvcixcbiAgICAgICAgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gICAgICAgIEZpcmViYXNlQXBwcyxcbiAgICAgICAgLy8gRmlyZXN0b3JlK0F1dGggd29yayBiZXR0ZXIgaWYgQXV0aCBpcyBsb2FkZWQgZmlyc3RcbiAgICAgICAgW25ldyBPcHRpb25hbCgpLCBBdXRoSW5zdGFuY2VzIF0sXG4gICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgybVBcHBDaGVja0luc3RhbmNlcyBdLFxuICAgICAgICAuLi5kZXBzLFxuICAgICAgXVxuICAgIH1dXG4gIH07XG59XG4iXX0=