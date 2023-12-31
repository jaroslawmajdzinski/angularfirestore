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
}

export interface IUploadFileList{
    file: File;
    inprogress: boolean;
    pathToUpload: string;
    
}

export type TUploadFilesList = IFileListCommon & IUploadFileList 
export type TFileList = IFileListCommon & IFilesList