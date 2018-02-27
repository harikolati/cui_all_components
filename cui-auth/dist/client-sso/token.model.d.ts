export declare class Token {
    authenticated: boolean;
    loginURL: string;
    logoutURL: string;
    tokenString: string;
    type: string;
    expires: number;
    constructor(data: any);
}
