// src/common/interfaces/api-response.interface.ts
export interface ApiResponse<T> {
    statusCode: number;        // Código de estado HTTP
    message: string;           // Mensaje de éxito
    data?: T;                 // Datos devueltos por la API (opcional)
  }
  