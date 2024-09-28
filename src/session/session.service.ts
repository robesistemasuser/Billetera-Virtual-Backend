import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Para generar un UUID

@Injectable()
export class SessionService {
  private sessions: Map<string, { userId: number, createdAt: Date }> = new Map();

  // Método para generar un nuevo ID de sesión
  createSession(userId: number): string {
    const sessionId = uuidv4();
    const createdAt = new Date();

    // Guardamos la sesión con el ID de usuario y la fecha de creación
    this.sessions.set(sessionId, { userId, createdAt });

    return sessionId;
  }

  // Método para validar la sesión
  validateSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return false; // No se encontró la sesión
    }

    // Podrías agregar lógica para validar que la sesión no haya expirado.
    return true; // La sesión es válida
  }

  // Método para eliminar una sesión después de completar el pago
  removeSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Validar el token, podrías modificarlo según tus reglas de negocio
  validateToken(token: string): boolean {
    // Agrega la lógica para validar el token, podría ser una búsqueda en la base de datos
    return token === '12345'; // Solo un ejemplo, deberías validar el token de manera más robusta
  }
}
