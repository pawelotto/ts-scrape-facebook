/** Get to the fb resource */
export declare function get(accessToken: string, daysBack?: number, apiVersion?: string): {
    page: (page: string) => Promise<any>;
};
/** Generate access fb token */
export declare function prepAccessToken(appId: string, appSecret: string): string;
/** Check if file is not already downloaded and save them */
export declare function notAlreadyThere(rootDir: string, page: string): Function;
