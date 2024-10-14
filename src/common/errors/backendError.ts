export interface BackendError {
  code: number;
  statusCode: number;
  message: string;
  httpErrorCode: number;
  httpErrorType: string;
}

export class BackendError extends Error {
  constructor(error: BackendError) {
    super(error.message);
    this.code = error.code;
    this.statusCode = error.statusCode;
    this.httpErrorCode = error.httpErrorCode;
    this.httpErrorType = error.httpErrorType;
    this.name = 'TouchcomBackendError';
  }
}
