export class User{
    constructor(
    public email: string,
    public uid: string,
    private _token: string,
    private _refreshToken: string,
    private _tokenExpireDate: Date
  ) {}
}