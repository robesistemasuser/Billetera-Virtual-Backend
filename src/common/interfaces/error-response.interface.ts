// src/common/interfaces/error-response.interface.ts
export interface ErrorResponse {
    statusCode: number;        // Código de estado HTTP
    message: string;           // Mensaje de error descriptivo
    errorCode?: string;        // Código de error específico (opcional)
  }
  