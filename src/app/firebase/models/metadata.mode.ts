export interface IFileMetadata{
    bucket: string; 
    cacheControl?:string | undefined;
    contentDisposition?: string ;
    contentEncoding?: string;
    contentLanguage?: string;
    contentType?: string;
    customMetadata?: {[key: string]: string}
    fullPath: string | undefined; 
    generation: string | undefined; 
    md5Hash?: string;
    metageneration: string| undefined; 
    name: string| undefined; 
    size: number
    timeCreated: string| undefined;
    updated: string| undefined;
    downloadTokens: string[] | undefined
}