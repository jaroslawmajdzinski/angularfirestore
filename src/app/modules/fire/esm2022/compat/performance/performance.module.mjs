import { NgModule, Optional } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFirePerformance } from './performance';
import { PerformanceMonitoringService } from './performance.service';
import * as i0 from "@angular/core";
import * as i1 from "./performance";
import * as i2 from "./performance.service";
export class AngularFirePerformanceModule {
    constructor(perf, _) {
        firebase.registerVersion('angularfire', VERSION.full, 'perf-compat');
        // call anything here to get perf loading
        perf.dataCollectionEnabled.then(() => undefined);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFirePerformanceModule, deps: [{ token: i1.AngularFirePerformance }, { token: i2.PerformanceMonitoringService, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFirePerformanceModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFirePerformanceModule, providers: [AngularFirePerformance] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFirePerformanceModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFirePerformance]
                }]
        }], ctorParameters: function () { return [{ type: i1.AngularFirePerformance }, { type: i2.PerformanceMonitoringService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBhdC9wZXJmb3JtYW5jZS9wZXJmb3JtYW5jZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFLckUsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxZQUNFLElBQTRCLEVBQ2hCLENBQStCO1FBRTNDLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckUseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQzt3R0FSVSw0QkFBNEI7eUdBQTVCLDRCQUE0Qjt5R0FBNUIsNEJBQTRCLGFBRjVCLENBQUUsc0JBQXNCLENBQUU7OzRGQUUxQiw0QkFBNEI7a0JBSHhDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUUsc0JBQXNCLENBQUU7aUJBQ3RDOzswQkFJSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvY29tcGF0L2FwcCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZVBlcmZvcm1hbmNlIH0gZnJvbSAnLi9wZXJmb3JtYW5jZSc7XG5pbXBvcnQgeyBQZXJmb3JtYW5jZU1vbml0b3JpbmdTZXJ2aWNlIH0gZnJvbSAnLi9wZXJmb3JtYW5jZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEFuZ3VsYXJGaXJlUGVyZm9ybWFuY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZVBlcmZvcm1hbmNlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcGVyZjogQW5ndWxhckZpcmVQZXJmb3JtYW5jZSxcbiAgICBAT3B0aW9uYWwoKSBfOiBQZXJmb3JtYW5jZU1vbml0b3JpbmdTZXJ2aWNlXG4gICkge1xuICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdwZXJmLWNvbXBhdCcpO1xuICAgIC8vIGNhbGwgYW55dGhpbmcgaGVyZSB0byBnZXQgcGVyZiBsb2FkaW5nXG4gICAgcGVyZi5kYXRhQ29sbGVjdGlvbkVuYWJsZWQudGhlbigoKSA9PiB1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=