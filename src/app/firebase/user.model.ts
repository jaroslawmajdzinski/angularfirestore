export interface UserMetadata{
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string

}


export interface User{
  auth: any;
  displayName :string;
  email:string;
  emailVerified:string;
  isAnonymous: boolean;
  metadata: UserMetadata
  phoneNumber: string;
  photoURL: string;
  providerData: string;
  providerId: string;
  refreshToken: string
  tenantId: string
  uid: string
}