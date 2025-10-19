export interface ApiResponse {
    status: string;
    message: Array<string>;
    data?: any; // Optional field for response data
}