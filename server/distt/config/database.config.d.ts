declare const _default: (() => {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    certificate: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    certificate: string;
}>;
export default _default;
