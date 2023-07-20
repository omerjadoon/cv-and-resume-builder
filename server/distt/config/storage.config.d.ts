declare const _default: (() => {
    bucket: string;
    region: string;
    endpoint: string;
    urlPrefix: string;
    accessKey: string;
    secretKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    bucket: string;
    region: string;
    endpoint: string;
    urlPrefix: string;
    accessKey: string;
    secretKey: string;
}>;
export default _default;
