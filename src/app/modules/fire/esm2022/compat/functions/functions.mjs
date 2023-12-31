import { Inject, Injectable, InjectionToken, NgZone, Optional } from '@angular/core';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { AppCheckInstances } from '@angular/fire/app-check';
import { ɵapplyMixins, ɵlazySDKProxy } from '@angular/fire/compat';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵcacheInstance, ɵfirebaseAppFactory } from '@angular/fire/compat';
import { from, of } from 'rxjs';
import { map, observeOn, shareReplay, switchMap } from 'rxjs/operators';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
import * as i2 from "@angular/fire/app-check";
export const ORIGIN = new InjectionToken('angularfire2.functions.origin');
export const REGION = new InjectionToken('angularfire2.functions.region');
export const USE_EMULATOR = new InjectionToken('angularfire2.functions.use-emulator');
export class AngularFireFunctions {
    httpsCallable;
    constructor(options, name, zone, schedulers, region, origin, _useEmulator, // can't use the tuple here
    _appCheckInstances) {
        const useEmulator = _useEmulator;
        const functions = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap(() => import('firebase/compat/functions')), map(() => ɵfirebaseAppFactory(options, zone, name)), map(app => ɵcacheInstance(`${app.name}.functions.${region || origin}`, 'AngularFireFunctions', app.name, () => {
            let functions;
            if (region && origin) {
                throw new Error('REGION and ORIGIN can\'t be used at the same time.');
            }
            functions = app.functions(region || origin || undefined);
            if (useEmulator) {
                functions.useEmulator(...useEmulator);
            }
            return functions;
        }, [region, origin, useEmulator])), shareReplay({ bufferSize: 1, refCount: false }));
        this.httpsCallable = (name, options) => (data) => from(functions).pipe(observeOn(schedulers.insideAngular), switchMap(functions => functions.httpsCallable(name, options)(data)), map(r => r.data));
        return ɵlazySDKProxy(this, functions, zone);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireFunctions, deps: [{ token: FIREBASE_OPTIONS }, { token: FIREBASE_APP_NAME, optional: true }, { token: i0.NgZone }, { token: i1.ɵAngularFireSchedulers }, { token: REGION, optional: true }, { token: ORIGIN, optional: true }, { token: USE_EMULATOR, optional: true }, { token: i2.AppCheckInstances, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireFunctions, providedIn: 'any' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireFunctions, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FIREBASE_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [FIREBASE_APP_NAME]
                }] }, { type: i0.NgZone }, { type: i1.ɵAngularFireSchedulers }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [REGION]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ORIGIN]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [USE_EMULATOR]
                }] }, { type: i2.AppCheckInstances, decorators: [{
                    type: Optional
                }] }]; } });
ɵapplyMixins(AngularFireFunctions, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBhdC9mdW5jdGlvbnMvZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQWlCLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJaEgsT0FBTyxFQUFjLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQUU3QyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVMsK0JBQStCLENBQUMsQ0FBQztBQUNsRixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVMsK0JBQStCLENBQUMsQ0FBQztBQUdsRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQXVCLHFDQUFxQyxDQUFDLENBQUM7QUFVNUcsTUFBTSxPQUFPLG9CQUFvQjtJQUVmLGFBQWEsQ0FBaUc7SUFFOUgsWUFDNEIsT0FBd0IsRUFDWCxJQUErQixFQUN0RSxJQUFZLEVBQ1osVUFBa0MsRUFDTixNQUFxQixFQUNyQixNQUFxQixFQUNmLFlBQWlCLEVBQUUsMkJBQTJCO0lBQ3BFLGtCQUFxQztRQUVqRCxNQUFNLFdBQVcsR0FBZ0MsWUFBWSxDQUFDO1FBRTlELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ2xDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQ3BDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUNwRCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxjQUFjLE1BQU0sSUFBSSxNQUFNLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUM1RyxJQUFJLFNBQXVDLENBQUM7WUFDNUMsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO2dCQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7YUFDdkU7WUFDRCxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELElBQUksV0FBVyxFQUFFO2dCQUNmLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQzthQUN2QztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNsQyxXQUFXLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNoRCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFtQixJQUFZLEVBQUUsT0FBOEIsRUFBRSxFQUFFLENBQ3RGLENBQUMsSUFBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUMvQixTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUNuQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBUyxDQUFDLENBQ3RCLENBQUM7UUFFSixPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTlDLENBQUM7d0dBM0NVLG9CQUFvQixrQkFLckIsZ0JBQWdCLGFBQ0osaUJBQWlCLHlGQUdqQixNQUFNLDZCQUNOLE1BQU0sNkJBQ04sWUFBWTs0R0FYdkIsb0JBQW9CLGNBRm5CLEtBQUs7OzRGQUVOLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEI7OzBCQU1JLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFDdkIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUdwQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLE1BQU07OzBCQUN6QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLE1BQU07OzBCQUN6QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7OzBCQUMvQixRQUFROztBQW1DYixZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgQXBwQ2hlY2tJbnN0YW5jZXMgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcC1jaGVjayc7XG5pbXBvcnQgeyDJtVByb21pc2VQcm94eSwgybVhcHBseU1peGlucywgybVsYXp5U0RLUHJveHkgfSBmcm9tICdAYW5ndWxhci9maXJlL2NvbXBhdCc7XG5pbXBvcnQgeyBGSVJFQkFTRV9BUFBfTkFNRSwgRklSRUJBU0VfT1BUSU9OUywgybVjYWNoZUluc3RhbmNlLCDJtWZpcmViYXNlQXBwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvY29tcGF0JztcbmltcG9ydCB7IEh0dHBzQ2FsbGFibGVPcHRpb25zIH0gZnJvbSAnQGZpcmViYXNlL2Z1bmN0aW9ucy10eXBlcyc7XG5pbXBvcnQgeyBGaXJlYmFzZU9wdGlvbnMgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgb2JzZXJ2ZU9uLCBzaGFyZVJlcGxheSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcHJveHlQb2x5ZmlsbENvbXBhdCB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBPUklHSU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy5vcmlnaW4nKTtcbmV4cG9ydCBjb25zdCBSRUdJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy5yZWdpb24nKTtcblxudHlwZSBVc2VFbXVsYXRvckFyZ3VtZW50cyA9IFBhcmFtZXRlcnM8ZmlyZWJhc2UuZnVuY3Rpb25zLkZ1bmN0aW9uc1sndXNlRW11bGF0b3InXT47XG5leHBvcnQgY29uc3QgVVNFX0VNVUxBVE9SID0gbmV3IEluamVjdGlvblRva2VuPFVzZUVtdWxhdG9yQXJndW1lbnRzPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy51c2UtZW11bGF0b3InKTtcblxuLy8gb3ZlcnJpZGUgaHR0cHNDYWxsYWJsZSBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIDUueFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVGdW5jdGlvbnMgZXh0ZW5kcyBPbWl0PMm1UHJvbWlzZVByb3h5PGZpcmViYXNlLmZ1bmN0aW9ucy5GdW5jdGlvbnM+LCAnaHR0cHNDYWxsYWJsZSc+IHtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZUZ1bmN0aW9ucyB7XG5cbiAgcHVibGljIHJlYWRvbmx5IGh0dHBzQ2FsbGFibGU6IDxUID0gYW55LCBSID0gYW55PihuYW1lOiBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwc0NhbGxhYmxlT3B0aW9ucykgPT4gKGRhdGE6IFQpID0+IE9ic2VydmFibGU8Uj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgc2NoZWR1bGVyczogybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChSRUdJT04pIHJlZ2lvbjogc3RyaW5nIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE9SSUdJTikgb3JpZ2luOiBzdHJpbmcgfCBudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVVNFX0VNVUxBVE9SKSBfdXNlRW11bGF0b3I6IGFueSwgLy8gY2FuJ3QgdXNlIHRoZSB0dXBsZSBoZXJlXG4gICAgQE9wdGlvbmFsKCkgX2FwcENoZWNrSW5zdGFuY2VzOiBBcHBDaGVja0luc3RhbmNlcyxcbiAgKSB7XG4gICAgY29uc3QgdXNlRW11bGF0b3I6IFVzZUVtdWxhdG9yQXJndW1lbnRzIHwgbnVsbCA9IF91c2VFbXVsYXRvcjtcblxuICAgIGNvbnN0IGZ1bmN0aW9ucyA9IG9mKHVuZGVmaW5lZCkucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBpbXBvcnQoJ2ZpcmViYXNlL2NvbXBhdC9mdW5jdGlvbnMnKSksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZSkpLFxuICAgICAgbWFwKGFwcCA9PiDJtWNhY2hlSW5zdGFuY2UoYCR7YXBwLm5hbWV9LmZ1bmN0aW9ucy4ke3JlZ2lvbiB8fCBvcmlnaW59YCwgJ0FuZ3VsYXJGaXJlRnVuY3Rpb25zJywgYXBwLm5hbWUsICgpID0+IHtcbiAgICAgICAgbGV0IGZ1bmN0aW9uczogZmlyZWJhc2UuZnVuY3Rpb25zLkZ1bmN0aW9ucztcbiAgICAgICAgaWYgKHJlZ2lvbiAmJiBvcmlnaW4pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JFR0lPTiBhbmQgT1JJR0lOIGNhblxcJ3QgYmUgdXNlZCBhdCB0aGUgc2FtZSB0aW1lLicpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9ucyA9IGFwcC5mdW5jdGlvbnMocmVnaW9uIHx8IG9yaWdpbiB8fCB1bmRlZmluZWQpO1xuICAgICAgICBpZiAodXNlRW11bGF0b3IpIHtcbiAgICAgICAgICBmdW5jdGlvbnMudXNlRW11bGF0b3IoLi4udXNlRW11bGF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbnM7XG4gICAgICB9LCBbcmVnaW9uLCBvcmlnaW4sIHVzZUVtdWxhdG9yXSkpLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSlcbiAgICApO1xuXG4gICAgdGhpcy5odHRwc0NhbGxhYmxlID0gPFQgPSBhbnksIFIgPSBhbnk+KG5hbWU6IHN0cmluZywgb3B0aW9ucz86IEh0dHBzQ2FsbGFibGVPcHRpb25zKSA9PlxuICAgICAgKGRhdGE6IFQpID0+IGZyb20oZnVuY3Rpb25zKS5waXBlKFxuICAgICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgICAgc3dpdGNoTWFwKGZ1bmN0aW9ucyA9PiBmdW5jdGlvbnMuaHR0cHNDYWxsYWJsZShuYW1lLCBvcHRpb25zKShkYXRhKSksXG4gICAgICAgIG1hcChyID0+IHIuZGF0YSBhcyBSKVxuICAgICAgKTtcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCBmdW5jdGlvbnMsIHpvbmUpO1xuXG4gIH1cblxufVxuXG7JtWFwcGx5TWl4aW5zKEFuZ3VsYXJGaXJlRnVuY3Rpb25zLCBbcHJveHlQb2x5ZmlsbENvbXBhdF0pO1xuIl19