import { Observable } from 'rxjs';
import { UploadTask } from '../interfaces';
export declare function fromTask(task: UploadTask): Observable<import("firebase/compat").default.storage.UploadTaskSnapshot>;
