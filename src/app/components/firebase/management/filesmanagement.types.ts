import { UploadTaskSnapshot } from "@angular/fire/compat/storage/interfaces";

export  interface IFileListCommon {
    selected: boolean;
    progress: number;
}
export interface IFilesList{
    name: string;
    fullPath: string;
    isDirectory: boolean;
    loaded: boolean;
    uploadPath: string;
    thumbFullPath?: string;
    thumbImage?: Blob
}

export interface IUploadFileList{
    file: File;
    inprogress: boolean;
    pathToUpload: string;
}

export type TUploadFilesList = IFileListCommon & IUploadFileList 
export type TFileList = IFileListCommon & IFilesList

export type TUploadData = {url: string, fullPath: string, state: string}

export function isUploadData<T extends TUploadData>(uploadData: T): uploadData is T {
    return uploadData.fullPath? false : true
}

export function isUploadSnapshot(obj: UploadTaskSnapshot | string): obj is UploadTaskSnapshot{
   return typeof obj==="string"? true : false 
}