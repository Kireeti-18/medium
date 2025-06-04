import { verify, decode, sign } from 'hono/jwt'

export function isTokenExpired(token : string ): boolean {
    const { header, payload } = decode(token)
    if (!payload?.exp) return true 
  
    const now = Math.floor(Date.now() / 1000)
    return now >= payload.exp
}

export function getUserIdFromToken(token : string): any {
    try {
      const { header, payload } = decode(token)
      if (!payload?.id)
      {
        return ""
      }
      return payload?.id;
    } catch (err) {
      return "";
    }
  }