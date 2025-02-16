export type SuccessResponse<T = any> = {
    statusCode: number;
    status: string;
    message: string;
    data: T;
};

export type ErrorResponse = {
    statusCode: number;
    status: string;
    message: string;
    path: string;
};
