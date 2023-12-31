import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, NgModule, Optional, Pipe } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AngularFireStorage } from '../storage';
import * as i0 from "@angular/core";
import * as i1 from "../storage";
import * as i2 from "@angular/platform-browser";
/** to be used with in combination with | async */
export class GetDownloadURLPipe {
    storage;
    state;
    asyncPipe;
    path;
    downloadUrl$;
    constructor(storage, cdr, state) {
        this.storage = storage;
        this.state = state;
        this.asyncPipe = new AsyncPipe(cdr);
    }
    transform(path) {
        if (path !== this.path) {
            this.path = path;
            const key = makeStateKey(`|getDownloadURL|${path}`);
            const existing = this.state?.get(key, undefined);
            this.downloadUrl$ = existing ? of(existing) : this.storage.ref(path).getDownloadURL().pipe(tap(it => this.state?.set(key, it)));
        }
        return this.asyncPipe.transform(this.downloadUrl$);
    }
    ngOnDestroy() {
        this.asyncPipe.ngOnDestroy();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipe, deps: [{ token: i1.AngularFireStorage }, { token: i0.ChangeDetectorRef }, { token: i2.TransferState, optional: true }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipe, name: "getDownloadURL", pure: false });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getDownloadURL',
                    pure: false,
                }]
        }], ctorParameters: function () { return [{ type: i1.AngularFireStorage }, { type: i0.ChangeDetectorRef }, { type: i2.TransferState, decorators: [{
                    type: Optional
                }] }]; } });
export class GetDownloadURLPipeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipeModule, declarations: [GetDownloadURLPipe], exports: [GetDownloadURLPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipeModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: GetDownloadURLPipeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GetDownloadURLPipe],
                    exports: [GetDownloadURLPipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZVVybC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBhdC9zdG9yYWdlL3BpcGVzL3N0b3JhZ2VVcmwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBYSxRQUFRLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7OztBQUVoRCxrREFBa0Q7QUFLbEQsTUFBTSxPQUFPLGtCQUFrQjtJQU9uQjtJQUVZO0lBUGQsU0FBUyxDQUFZO0lBQ3JCLElBQUksQ0FBUztJQUNiLFlBQVksQ0FBa0I7SUFFdEMsWUFDVSxPQUEyQixFQUNuQyxHQUFzQixFQUNGLEtBQW9CO1FBRmhDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBRWYsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBUyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUN4RixHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7d0dBNUJVLGtCQUFrQjtzR0FBbEIsa0JBQWtCOzs0RkFBbEIsa0JBQWtCO2tCQUo5QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxLQUFLO2lCQUNaOzswQkFVSSxRQUFROztBQTJCYixNQUFNLE9BQU8sd0JBQXdCO3dHQUF4Qix3QkFBd0I7eUdBQXhCLHdCQUF3QixpQkFwQ3hCLGtCQUFrQixhQUFsQixrQkFBa0I7eUdBb0NsQix3QkFBd0I7OzRGQUF4Qix3QkFBd0I7a0JBSnBDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUUsa0JBQWtCLENBQUU7b0JBQ3BDLE9BQU8sRUFBRSxDQUFFLGtCQUFrQixDQUFFO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgTmdNb2R1bGUsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zZmVyU3RhdGUsIG1ha2VTdGF0ZUtleSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlU3RvcmFnZSB9IGZyb20gJy4uL3N0b3JhZ2UnO1xuXG4vKiogdG8gYmUgdXNlZCB3aXRoIGluIGNvbWJpbmF0aW9uIHdpdGggfCBhc3luYyAqL1xuQFBpcGUoe1xuICBuYW1lOiAnZ2V0RG93bmxvYWRVUkwnLFxuICBwdXJlOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgR2V0RG93bmxvYWRVUkxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGFzeW5jUGlwZTogQXN5bmNQaXBlO1xuICBwcml2YXRlIHBhdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBkb3dubG9hZFVybCQ6IE9ic2VydmFibGU8YW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JhZ2U6IEFuZ3VsYXJGaXJlU3RvcmFnZSxcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgc3RhdGU6IFRyYW5zZmVyU3RhdGVcbiAgKSB7XG4gICAgdGhpcy5hc3luY1BpcGUgPSBuZXcgQXN5bmNQaXBlKGNkcik7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHBhdGggIT09IHRoaXMucGF0aCkge1xuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIGNvbnN0IGtleSA9IG1ha2VTdGF0ZUtleTxzdHJpbmc+KGB8Z2V0RG93bmxvYWRVUkx8JHtwYXRofWApO1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLnN0YXRlPy5nZXQoa2V5LCB1bmRlZmluZWQpO1xuICAgICAgdGhpcy5kb3dubG9hZFVybCQgPSBleGlzdGluZyA/IG9mKGV4aXN0aW5nKSA6IHRoaXMuc3RvcmFnZS5yZWYocGF0aCkuZ2V0RG93bmxvYWRVUkwoKS5waXBlKFxuICAgICAgICB0YXAoaXQgPT4gdGhpcy5zdGF0ZT8uc2V0KGtleSwgaXQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXN5bmNQaXBlLnRyYW5zZm9ybSh0aGlzLmRvd25sb2FkVXJsJCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmFzeW5jUGlwZS5uZ09uRGVzdHJveSgpO1xuICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbIEdldERvd25sb2FkVVJMUGlwZSBdLFxuICBleHBvcnRzOiBbIEdldERvd25sb2FkVVJMUGlwZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBHZXREb3dubG9hZFVSTFBpcGVNb2R1bGUge31cbiJdfQ==