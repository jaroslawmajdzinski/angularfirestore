import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { ɵapplyMixins, ɵcacheInstance, ɵlazySDKProxy } from '@angular/fire/compat';
import { FirebaseApp } from '@angular/fire/compat';
import { isSupported } from 'firebase/analytics';
import { EMPTY, of } from 'rxjs';
import { map, observeOn, shareReplay, switchMap } from 'rxjs/operators';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/compat";
import * as i2 from "@angular/fire";
export const COLLECTION_ENABLED = new InjectionToken('angularfire2.analytics.analyticsCollectionEnabled');
export const APP_VERSION = new InjectionToken('angularfire2.analytics.appVersion');
export const APP_NAME = new InjectionToken('angularfire2.analytics.appName');
export const DEBUG_MODE = new InjectionToken('angularfire2.analytics.debugMode');
export const CONFIG = new InjectionToken('angularfire2.analytics.config');
const APP_NAME_KEY = 'app_name';
const APP_VERSION_KEY = 'app_version';
const DEBUG_MODE_KEY = 'debug_mode';
const GTAG_CONFIG_COMMAND = 'config';
const GTAG_FUNCTION_NAME = 'gtag'; // TODO rename these
const DATA_LAYER_NAME = 'dataLayer';
const SEND_TO_KEY = 'send_to';
export class AngularFireAnalytics {
    measurementId;
    analyticsInitialized = new Promise(() => undefined);
    async updateConfig(config) {
        await this.analyticsInitialized;
        window[GTAG_FUNCTION_NAME](GTAG_CONFIG_COMMAND, this.measurementId, { ...config, update: true });
    }
    constructor(app, analyticsCollectionEnabled, providedAppVersion, providedAppName, debugModeEnabled, providedConfig, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    platformId, zone, schedulers) {
        if (isPlatformBrowser(platformId)) {
            window[DATA_LAYER_NAME] = window[DATA_LAYER_NAME] || [];
            // It turns out we can't rely on the measurementId in the Firebase config JSON
            // this identifier is not stable. firebase/analytics does a call to get a fresh value
            // falling back on the one in the config. Rather than do that ourselves we should listen
            // on our gtag function for a analytics config command
            // e.g, ['config', measurementId, { origin: 'firebase', firebase_id }]
            const parseMeasurementId = (...args) => {
                if (args[0] === 'config' && args[2].origin === 'firebase') {
                    this.measurementId = args[1];
                    return true;
                }
                else {
                    return false;
                }
            };
            const patchGtag = (fn) => {
                window[GTAG_FUNCTION_NAME] = (...args) => {
                    if (fn) {
                        fn(...args);
                    }
                    // Inject app_name and app_version into events
                    // TODO(jamesdaniels): I'm doing this as documented but it's still not
                    //   showing up in the console. Investigate. Guessing it's just part of the
                    //   whole GA4 transition mess.
                    if (args[0] === 'event' && args[2][SEND_TO_KEY] === this.measurementId) {
                        if (providedAppName) {
                            args[2][APP_NAME_KEY] = providedAppName;
                        }
                        if (providedAppVersion) {
                            args[2][APP_VERSION_KEY] = providedAppVersion;
                        }
                    }
                    if (debugModeEnabled && typeof console !== 'undefined') {
                        // eslint-disable-next-line no-console
                        console.info(...args);
                    }
                    /**
                     * According to the gtag documentation, this function that defines a custom data layer cannot be
                     * an arrow function because 'arguments' is not an array. It is actually an object that behaves
                     * like an array and contains more information then just indexes. Transforming this into arrow function
                     * caused issue #2505 where analytics no longer sent any data.
                     */
                    (function (..._args) {
                        window[DATA_LAYER_NAME].push(arguments);
                    })(...args);
                };
            };
            // Unclear if we still need to but I was running into config/events I passed
            // to gtag before ['js' timestamp] weren't getting parsed, so let's make a promise
            // that resolves when firebase/analytics has configured gtag.js that we wait on
            // before sending anything
            const firebaseAnalyticsAlreadyInitialized = window[DATA_LAYER_NAME].some(parseMeasurementId);
            if (firebaseAnalyticsAlreadyInitialized) {
                this.analyticsInitialized = Promise.resolve();
                patchGtag();
            }
            else {
                this.analyticsInitialized = new Promise(resolve => {
                    patchGtag((...args) => {
                        if (parseMeasurementId(...args)) {
                            resolve();
                        }
                    });
                });
            }
            if (providedConfig) {
                this.updateConfig(providedConfig);
            }
            if (debugModeEnabled) {
                this.updateConfig({ [DEBUG_MODE_KEY]: 1 });
            }
        }
        else {
            this.analyticsInitialized = Promise.resolve();
        }
        const analytics = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap(isSupported), switchMap(supported => supported ? zone.runOutsideAngular(() => import('firebase/compat/analytics')) : EMPTY), map(() => {
            return ɵcacheInstance(`analytics`, 'AngularFireAnalytics', app.name, () => {
                const analytics = app.analytics();
                if (analyticsCollectionEnabled === false) {
                    analytics.setAnalyticsCollectionEnabled(false);
                }
                return analytics;
            }, [app, analyticsCollectionEnabled, providedConfig, debugModeEnabled]);
        }), shareReplay({ bufferSize: 1, refCount: false }));
        return ɵlazySDKProxy(this, analytics, zone);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalytics, deps: [{ token: i1.FirebaseApp }, { token: COLLECTION_ENABLED, optional: true }, { token: APP_VERSION, optional: true }, { token: APP_NAME, optional: true }, { token: DEBUG_MODE, optional: true }, { token: CONFIG, optional: true }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: i2.ɵAngularFireSchedulers }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalytics, providedIn: 'any' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalytics, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: i1.FirebaseApp }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [COLLECTION_ENABLED]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [APP_VERSION]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [APP_NAME]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DEBUG_MODE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CONFIG]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: i2.ɵAngularFireSchedulers }]; } });
ɵapplyMixins(AngularFireAnalytics, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBhdC9hbmFseXRpY3MvYW5hbHl0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFpQixZQUFZLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakQsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQUk3QyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGNBQWMsQ0FBVSxtREFBbUQsQ0FBQyxDQUFDO0FBQ25ILE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBUyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQzNGLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBUyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBVSxrQ0FBa0MsQ0FBQyxDQUFDO0FBQzFGLE1BQU0s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QUFDLFdBQVc7OzBCQUM5QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUMzQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUM3QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLE1BQU07OzBCQUV6QixNQUFNOzJCQUFDLFdBQVc7O0FBNkd2QixZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IMm1UHJvbWlzZVByb3h5LCDJtWFwcGx5TWl4aW5zLCDJtWNhY2hlSW5zdGFuY2UsIMm1bGF6eVNES1Byb3h5IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9jb21wYXQnO1xuaW1wb3J0IHsgRmlyZWJhc2VBcHAgfSBmcm9tICdAYW5ndWxhci9maXJlL2NvbXBhdCc7XG5pbXBvcnQgeyBpc1N1cHBvcnRlZCB9IGZyb20gJ2ZpcmViYXNlL2FuYWx5dGljcyc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvY29tcGF0L2FwcCc7XG5pbXBvcnQgeyBFTVBUWSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgb2JzZXJ2ZU9uLCBzaGFyZVJlcGxheSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcHJveHlQb2x5ZmlsbENvbXBhdCB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCB0eXBlIENvbmZpZyA9IFJlY29yZDxzdHJpbmcsIGFueT47XG5cbmV4cG9ydCBjb25zdCBDT0xMRUNUSU9OX0VOQUJMRUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ2FuZ3VsYXJmaXJlMi5hbmFseXRpY3MuYW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQnKTtcbmV4cG9ydCBjb25zdCBBUFBfVkVSU0lPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmFwcFZlcnNpb24nKTtcbmV4cG9ydCBjb25zdCBBUFBfTkFNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmFwcE5hbWUnKTtcbmV4cG9ydCBjb25zdCBERUJVR19NT0RFID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmRlYnVnTW9kZScpO1xuZXhwb3J0IGNvbnN0IENPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWc+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmNvbmZpZycpO1xuXG5jb25zdCBBUFBfTkFNRV9LRVkgPSAnYXBwX25hbWUnO1xuY29uc3QgQVBQX1ZFUlNJT05fS0VZID0gJ2FwcF92ZXJzaW9uJztcbmNvbnN0IERFQlVHX01PREVfS0VZID0gJ2RlYnVnX21vZGUnO1xuY29uc3QgR1RBR19DT05GSUdfQ09NTUFORCA9ICdjb25maWcnO1xuY29uc3QgR1RBR19GVU5DVElPTl9OQU1FID0gJ2d0YWcnOyAvLyBUT0RPIHJlbmFtZSB0aGVzZVxuY29uc3QgREFUQV9MQVlFUl9OQU1FID0gJ2RhdGFMYXllcic7XG5jb25zdCBTRU5EX1RPX0tFWSA9ICdzZW5kX3RvJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVBbmFseXRpY3MgZXh0ZW5kcyDJtVByb21pc2VQcm94eTxmaXJlYmFzZS5hbmFseXRpY3MuQW5hbHl0aWNzPiB7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVBbmFseXRpY3Mge1xuXG4gIHByaXZhdGUgbWVhc3VyZW1lbnRJZDogc3RyaW5nO1xuICBwcml2YXRlIGFuYWx5dGljc0luaXRpYWxpemVkID0gbmV3IFByb21pc2U8dm9pZD4oKCkgPT4gdW5kZWZpbmVkKTtcblxuICBhc3luYyB1cGRhdGVDb25maWcoY29uZmlnOiBDb25maWcpIHtcbiAgICBhd2FpdCB0aGlzLmFuYWx5dGljc0luaXRpYWxpemVkO1xuICAgIHdpbmRvd1tHVEFHX0ZVTkNUSU9OX05BTUVdKEdUQUdfQ09ORklHX0NPTU1BTkQsIHRoaXMubWVhc3VyZW1lbnRJZCwgeyAuLi5jb25maWcsIHVwZGF0ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGFwcDogRmlyZWJhc2VBcHAsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChDT0xMRUNUSU9OX0VOQUJMRUQpIGFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkOiBib29sZWFuIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFQUF9WRVJTSU9OKSBwcm92aWRlZEFwcFZlcnNpb246IHN0cmluZyB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBUFBfTkFNRSkgcHJvdmlkZWRBcHBOYW1lOiBzdHJpbmcgfCBudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREVCVUdfTU9ERSkgZGVidWdNb2RlRW5hYmxlZDogYm9vbGVhbiB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChDT05GSUcpIHByb3ZpZGVkQ29uZmlnOiBDb25maWcgfCBudWxsLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZSxcbiAgICBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgKSB7XG5cbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcblxuICAgICAgd2luZG93W0RBVEFfTEFZRVJfTkFNRV0gPSB3aW5kb3dbREFUQV9MQVlFUl9OQU1FXSB8fCBbXTtcblxuICAgICAgLy8gSXQgdHVybnMgb3V0IHdlIGNhbid0IHJlbHkgb24gdGhlIG1lYXN1cmVtZW50SWQgaW4gdGhlIEZpcmViYXNlIGNvbmZpZyBKU09OXG4gICAgICAvLyB0aGlzIGlkZW50aWZpZXIgaXMgbm90IHN0YWJsZS4gZmlyZWJhc2UvYW5hbHl0aWNzIGRvZXMgYSBjYWxsIHRvIGdldCBhIGZyZXNoIHZhbHVlXG4gICAgICAvLyBmYWxsaW5nIGJhY2sgb24gdGhlIG9uZSBpbiB0aGUgY29uZmlnLiBSYXRoZXIgdGhhbiBkbyB0aGF0IG91cnNlbHZlcyB3ZSBzaG91bGQgbGlzdGVuXG4gICAgICAvLyBvbiBvdXIgZ3RhZyBmdW5jdGlvbiBmb3IgYSBhbmFseXRpY3MgY29uZmlnIGNvbW1hbmRcbiAgICAgIC8vIGUuZywgWydjb25maWcnLCBtZWFzdXJlbWVudElkLCB7IG9yaWdpbjogJ2ZpcmViYXNlJywgZmlyZWJhc2VfaWQgfV1cbiAgICAgIGNvbnN0IHBhcnNlTWVhc3VyZW1lbnRJZCA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ2NvbmZpZycgJiYgYXJnc1syXS5vcmlnaW4gPT09ICdmaXJlYmFzZScpIHtcbiAgICAgICAgICB0aGlzLm1lYXN1cmVtZW50SWQgPSBhcmdzWzFdO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgcGF0Y2hHdGFnID0gKGZuPzogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIHdpbmRvd1tHVEFHX0ZVTkNUSU9OX05BTUVdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICBmbiguLi5hcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSW5qZWN0IGFwcF9uYW1lIGFuZCBhcHBfdmVyc2lvbiBpbnRvIGV2ZW50c1xuICAgICAgICAgIC8vIFRPRE8oamFtZXNkYW5pZWxzKTogSSdtIGRvaW5nIHRoaXMgYXMgZG9jdW1lbnRlZCBidXQgaXQncyBzdGlsbCBub3RcbiAgICAgICAgICAvLyAgIHNob3dpbmcgdXAgaW4gdGhlIGNvbnNvbGUuIEludmVzdGlnYXRlLiBHdWVzc2luZyBpdCdzIGp1c3QgcGFydCBvZiB0aGVcbiAgICAgICAgICAvLyAgIHdob2xlIEdBNCB0cmFuc2l0aW9uIG1lc3MuXG4gICAgICAgICAgaWYgKGFyZ3NbMF0gPT09ICdldmVudCcgJiYgYXJnc1syXVtTRU5EX1RPX0tFWV0gPT09IHRoaXMubWVhc3VyZW1lbnRJZCkge1xuICAgICAgICAgICAgaWYgKHByb3ZpZGVkQXBwTmFtZSkge1xuICAgICAgICAgICAgICBhcmdzWzJdW0FQUF9OQU1FX0tFWV0gPSBwcm92aWRlZEFwcE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvdmlkZWRBcHBWZXJzaW9uKSB7XG4gICAgICAgICAgICAgIGFyZ3NbMl1bQVBQX1ZFUlNJT05fS0VZXSA9IHByb3ZpZGVkQXBwVmVyc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlYnVnTW9kZUVuYWJsZWQgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5pbmZvKC4uLmFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBY2NvcmRpbmcgdG8gdGhlIGd0YWcgZG9jdW1lbnRhdGlvbiwgdGhpcyBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBjdXN0b20gZGF0YSBsYXllciBjYW5ub3QgYmVcbiAgICAgICAgICAgKiBhbiBhcnJvdyBmdW5jdGlvbiBiZWNhdXNlICdhcmd1bWVudHMnIGlzIG5vdCBhbiBhcnJheS4gSXQgaXMgYWN0dWFsbHkgYW4gb2JqZWN0IHRoYXQgYmVoYXZlc1xuICAgICAgICAgICAqIGxpa2UgYW4gYXJyYXkgYW5kIGNvbnRhaW5zIG1vcmUgaW5mb3JtYXRpb24gdGhlbiBqdXN0IGluZGV4ZXMuIFRyYW5zZm9ybWluZyB0aGlzIGludG8gYXJyb3cgZnVuY3Rpb25cbiAgICAgICAgICAgKiBjYXVzZWQgaXNzdWUgIzI1MDUgd2hlcmUgYW5hbHl0aWNzIG5vIGxvbmdlciBzZW50IGFueSBkYXRhLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIChmdW5jdGlvbiguLi5fYXJnczogYW55W10pIHtcbiAgICAgICAgICAgIHdpbmRvd1tEQVRBX0xBWUVSX05BTUVdLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgICB9KSguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFVuY2xlYXIgaWYgd2Ugc3RpbGwgbmVlZCB0byBidXQgSSB3YXMgcnVubmluZyBpbnRvIGNvbmZpZy9ldmVudHMgSSBwYXNzZWRcbiAgICAgIC8vIHRvIGd0YWcgYmVmb3JlIFsnanMnIHRpbWVzdGFtcF0gd2VyZW4ndCBnZXR0aW5nIHBhcnNlZCwgc28gbGV0J3MgbWFrZSBhIHByb21pc2VcbiAgICAgIC8vIHRoYXQgcmVzb2x2ZXMgd2hlbiBmaXJlYmFzZS9hbmFseXRpY3MgaGFzIGNvbmZpZ3VyZWQgZ3RhZy5qcyB0aGF0IHdlIHdhaXQgb25cbiAgICAgIC8vIGJlZm9yZSBzZW5kaW5nIGFueXRoaW5nXG4gICAgICBjb25zdCBmaXJlYmFzZUFuYWx5dGljc0FscmVhZHlJbml0aWFsaXplZCA9IHdpbmRvd1tEQVRBX0xBWUVSX05BTUVdLnNvbWUocGFyc2VNZWFzdXJlbWVudElkKTtcbiAgICAgIGlmIChmaXJlYmFzZUFuYWx5dGljc0FscmVhZHlJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLmFuYWx5dGljc0luaXRpYWxpemVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHBhdGNoR3RhZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY3NJbml0aWFsaXplZCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIHBhdGNoR3RhZygoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcnNlTWVhc3VyZW1lbnRJZCguLi5hcmdzKSkge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvdmlkZWRDb25maWcpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb25maWcocHJvdmlkZWRDb25maWcpO1xuICAgICAgfVxuICAgICAgaWYgKGRlYnVnTW9kZUVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb25maWcoeyBbREVCVUdfTU9ERV9LRVldOiAxIH0pO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5hbmFseXRpY3NJbml0aWFsaXplZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgfVxuXG4gICAgY29uc3QgYW5hbHl0aWNzID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKGlzU3VwcG9ydGVkKSxcbiAgICAgIHN3aXRjaE1hcChzdXBwb3J0ZWQgPT4gc3VwcG9ydGVkID8gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBpbXBvcnQoJ2ZpcmViYXNlL2NvbXBhdC9hbmFseXRpY3MnKSkgOiBFTVBUWSksXG4gICAgICBtYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gybVjYWNoZUluc3RhbmNlKGBhbmFseXRpY3NgLCAnQW5ndWxhckZpcmVBbmFseXRpY3MnLCBhcHAubmFtZSwgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFuYWx5dGljcyA9IGFwcC5hbmFseXRpY3MoKTtcbiAgICAgICAgICBpZiAoYW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhbmFseXRpY3Muc2V0QW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYW5hbHl0aWNzO1xuICAgICAgICB9LCBbYXBwLCBhbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZCwgcHJvdmlkZWRDb25maWcsIGRlYnVnTW9kZUVuYWJsZWRdKTtcbiAgICAgIH0pLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIMm1bGF6eVNES1Byb3h5KHRoaXMsIGFuYWx5dGljcywgem9uZSk7XG5cbiAgfVxuXG59XG5cbsm1YXBwbHlNaXhpbnMoQW5ndWxhckZpcmVBbmFseXRpY3MsIFtwcm94eVBvbHlmaWxsQ29tcGF0XSk7XG4iXX0=