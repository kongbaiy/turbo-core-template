export interface Login {
    loginAccount: string;
    loginPassword: string;
    tenantId: string;
    tenantCode: string;
    platformCode: string;
    clientCode: string;
    redirectUri: string;
    state: string;
    captchaCode: string;
}
