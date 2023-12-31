import { ɵAPP_CHECK_PROVIDER_NAME, ɵgetAllInstancesOf } from '@angular/fire';
import { from, timer } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
export class AppCheck {
    constructor(appCheck) {
        return appCheck;
    }
}
export const appCheckInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(ɵAPP_CHECK_PROVIDER_NAME))), distinct());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC1jaGVjay9hcHAtY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckQsTUFBTSxPQUFPLFFBQVE7SUFDbkIsWUFBWSxRQUEwQjtRQUNwQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDakQsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBbUIsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLEVBQ3JGLFFBQVEsRUFBRSxDQUNYLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyDJtUFQUF9DSEVDS19QUk9WSURFUl9OQU1FLCDJtWdldEFsbEluc3RhbmNlc09mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBBcHBDaGVjayBhcyBGaXJlYmFzZUFwcENoZWNrIH0gZnJvbSAnZmlyZWJhc2UvYXBwLWNoZWNrJztcbmltcG9ydCB7IGZyb20sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGRpc3RpbmN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyBzZWUgbm90ZXMgaW4gY29yZS9maXJlYmFzZS5hcHAubW9kdWxlLnRzIGZvciB3aHkgd2UncmUgYnVpbGRpbmcgdGhlIGNsYXNzIGxpa2UgdGhpc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgQXBwQ2hlY2sgZXh0ZW5kcyBGaXJlYmFzZUFwcENoZWNrIHt9XG5cbmV4cG9ydCBjbGFzcyBBcHBDaGVjayB7XG4gIGNvbnN0cnVjdG9yKGFwcENoZWNrOiBGaXJlYmFzZUFwcENoZWNrKSB7XG4gICAgcmV0dXJuIGFwcENoZWNrO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBDaGVja0luc3RhbmNlJCA9IHRpbWVyKDAsIDMwMCkucGlwZShcbiAgY29uY2F0TWFwKCgpID0+IGZyb20oybVnZXRBbGxJbnN0YW5jZXNPZjxGaXJlYmFzZUFwcENoZWNrPijJtUFQUF9DSEVDS19QUk9WSURFUl9OQU1FKSkpLFxuICBkaXN0aW5jdCgpLFxuKTtcbiJdfQ==