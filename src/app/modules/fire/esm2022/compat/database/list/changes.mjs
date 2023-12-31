import { merge, of } from 'rxjs';
import { distinctUntilChanged, scan, switchMap } from 'rxjs/operators';
import { fromRef } from '../observable/fromRef';
import { isNil } from '../utils';
export function listChanges(ref, events, scheduler) {
    return fromRef(ref, 'value', 'once', scheduler).pipe(switchMap(snapshotAction => {
        const childEvent$ = [of(snapshotAction)];
        events.forEach(event => childEvent$.push(fromRef(ref, event, 'on', scheduler)));
        return merge(...childEvent$).pipe(scan(buildView, []));
    }), distinctUntilChanged());
}
function positionFor(changes, key) {
    const len = changes.length;
    for (let i = 0; i < len; i++) {
        if (changes[i].payload.key === key) {
            return i;
        }
    }
    return -1;
}
function positionAfter(changes, prevKey) {
    if (isNil(prevKey)) {
        return 0;
    }
    else {
        const i = positionFor(changes, prevKey);
        if (i === -1) {
            return changes.length;
        }
        else {
            return i + 1;
        }
    }
}
function buildView(current, action) {
    const { payload, prevKey, key } = action;
    const currentKeyPosition = positionFor(current, key);
    const afterPreviousKeyPosition = positionAfter(current, prevKey);
    switch (action.type) {
        case 'value':
            if (action.payload?.exists()) {
                let prevKey = null;
                action.payload.forEach(payload => {
                    const action = { payload, type: 'value', prevKey, key: payload.key };
                    prevKey = payload.key;
                    current = [...current, action];
                    return false;
                });
            }
            return current;
        case 'child_added':
            if (currentKeyPosition > -1) {
                // check that the previouskey is what we expect, else reorder
                const previous = current[currentKeyPosition - 1];
                if ((previous?.key || null) !== prevKey) {
                    current = current.filter(x => x.payload.key !== payload.key);
                    current.splice(afterPreviousKeyPosition, 0, action);
                }
            }
            else if (prevKey == null) {
                return [action, ...current];
            }
            else {
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, action);
            }
            return current;
        case 'child_removed':
            return current.filter(x => x.payload.key !== payload.key);
        case 'child_changed':
            return current.map(x => x.payload.key === key ? action : x);
        case 'child_moved':
            if (currentKeyPosition > -1) {
                const data = current.splice(currentKeyPosition, 1)[0];
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, data);
                return current;
            }
            return current;
        // default will also remove null results
        default:
            return current;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvZGF0YWJhc2UvbGlzdC9jaGFuZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBNkIsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2pDLE1BQU0sVUFBVSxXQUFXLENBQVUsR0FBa0IsRUFBRSxNQUFvQixFQUFFLFNBQXlCO0lBQ3RHLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDbEQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRixPQUFPLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLEVBQ0Ysb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBSSxPQUE0QixFQUFFLEdBQUc7SUFDdkQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0s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LENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVELEtBQUssZUFBZTtZQUNsQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsS0FBSyxhQUFhO1lBQ2hCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ2pCLHdDQUF3QztRQUN4QztZQUNFLE9BQU8sT0FBTyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFNjaGVkdWxlckxpa2UsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNjYW4sIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoaWxkRXZlbnQsIERhdGFiYXNlUXVlcnksIFNuYXBzaG90QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBmcm9tUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0Q2hhbmdlczxUID0gYW55PihyZWY6IERhdGFiYXNlUXVlcnksIGV2ZW50czogQ2hpbGRFdmVudFtdLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxTbmFwc2hvdEFjdGlvbjxUPltdPiB7XG4gIHJldHVybiBmcm9tUmVmKHJlZiwgJ3ZhbHVlJywgJ29uY2UnLCBzY2hlZHVsZXIpLnBpcGUoXG4gICAgc3dpdGNoTWFwKHNuYXBzaG90QWN0aW9uID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRXZlbnQkID0gW29mKHNuYXBzaG90QWN0aW9uKV07XG4gICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiBjaGlsZEV2ZW50JC5wdXNoKGZyb21SZWYocmVmLCBldmVudCwgJ29uJywgc2NoZWR1bGVyKSkpO1xuICAgICAgcmV0dXJuIG1lcmdlKC4uLmNoaWxkRXZlbnQkKS5waXBlKHNjYW4oYnVpbGRWaWV3LCBbXSkpO1xuICAgIH0pLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Gb3I8VD4oY2hhbmdlczogU25hcHNob3RBY3Rpb248VD5bXSwga2V5KSB7XG4gIGNvbnN0IGxlbiA9IGNoYW5nZXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGNoYW5nZXNbaV0ucGF5bG9hZC5rZXkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25BZnRlcjxUPihjaGFuZ2VzOiBTbmFwc2hvdEFjdGlvbjxUPltdLCBwcmV2S2V5Pzogc3RyaW5nKSB7XG4gIGlmIChpc05pbChwcmV2S2V5KSkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGkgPSBwb3NpdGlvbkZvcihjaGFuZ2VzLCBwcmV2S2V5KTtcbiAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBjaGFuZ2VzLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGkgKyAxO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZFZpZXcoY3VycmVudCwgYWN0aW9uKSB7XG4gIGNvbnN0IHsgcGF5bG9hZCwgcHJldktleSwga2V5IH0gPSBhY3Rpb247XG4gIGNvbnN0IGN1cnJlbnRLZXlQb3NpdGlvbiA9IHBvc2l0aW9uRm9yKGN1cnJlbnQsIGtleSk7XG4gIGNvbnN0IGFmdGVyUHJldmlvdXNLZXlQb3NpdGlvbiA9IHBvc2l0aW9uQWZ0ZXIoY3VycmVudCwgcHJldktleSk7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICd2YWx1ZSc6XG4gICAgICBpZiAoYWN0aW9uLnBheWxvYWQ/LmV4aXN0cygpKSB7XG4gICAgICAgIGxldCBwcmV2S2V5ID0gbnVsbDtcbiAgICAgICAgYWN0aW9uLnBheWxvYWQuZm9yRWFjaChwYXlsb2FkID0+IHtcbiAgICAgICAgICBjb25zdCBhY3Rpb24gPSB7IHBheWxvYWQsIHR5cGU6ICd2YWx1ZScsIHByZXZLZXksIGtleTogcGF5bG9hZC5rZXkgfTtcbiAgICAgICAgICBwcmV2S2V5ID0gcGF5bG9hZC5rZXk7XG4gICAgICAgICAgY3VycmVudCA9IFsuLi5jdXJyZW50LCBhY3Rpb25dO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICBjYXNlICdjaGlsZF9hZGRlZCc6XG4gICAgICBpZiAoY3VycmVudEtleVBvc2l0aW9uID4gLTEpIHtcbiAgICAgICAgLy8gY2hlY2sgdGhhdCB0aGUgcHJldmlvdXNrZXkgaXMgd2hhdCB3ZSBleHBlY3QsIGVsc2UgcmVvcmRlclxuICAgICAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbY3VycmVudEtleVBvc2l0aW9uIC0gMV07XG4gICAgICAgIGlmICgocHJldmlvdXM/LmtleSB8fCBudWxsKSAhPT0gcHJldktleSkge1xuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmZpbHRlcih4ID0+IHgucGF5bG9hZC5rZXkgIT09IHBheWxvYWQua2V5KTtcbiAgICAgICAgICBjdXJyZW50LnNwbGljZShhZnRlclByZXZpb3VzS2V5UG9zaXRpb24sIDAsIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJldktleSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbYWN0aW9uLCAuLi5jdXJyZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICAgIGN1cnJlbnQuc3BsaWNlKGFmdGVyUHJldmlvdXNLZXlQb3NpdGlvbiwgMCwgYWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIGNhc2UgJ2NoaWxkX3JlbW92ZWQnOlxuICAgICAgcmV0dXJuIGN1cnJlbnQuZmlsdGVyKHggPT4geC5wYXlsb2FkLmtleSAhPT0gcGF5bG9hZC5rZXkpO1xuICAgIGNhc2UgJ2NoaWxkX2NoYW5nZWQnOlxuICAgICAgcmV0dXJuIGN1cnJlbnQubWFwKHggPT4geC5wYXlsb2FkLmtleSA9PT0ga2V5ID8gYWN0aW9uIDogeCk7XG4gICAgY2FzZSAnY2hpbGRfbW92ZWQnOlxuICAgICAgaWYgKGN1cnJlbnRLZXlQb3NpdGlvbiA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjdXJyZW50LnNwbGljZShjdXJyZW50S2V5UG9zaXRpb24sIDEpWzBdO1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5zbGljZSgpO1xuICAgICAgICBjdXJyZW50LnNwbGljZShhZnRlclByZXZpb3VzS2V5UG9zaXRpb24sIDAsIGRhdGEpO1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIC8vIGRlZmF1bHQgd2lsbCBhbHNvIHJlbW92ZSBudWxsIHJlc3VsdHNcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cbn1cbiJdfQ==