declare const _default: (() => {
    from: {
        name: string;
        email: string;
    };
    host: string;
    port: string;
    username: string;
    password: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    from: {
        name: string;
        email: string;
    };
    host: string;
    port: string;
    username: string;
    password: string;
}>;
export default _default;
