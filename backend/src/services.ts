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


function getAvathar(idx: number): string {
  const random = Math.floor(Math.random() * 8) + 1;

  if (idx === 1) {
    return random <= 4 ? `boy-${random}` : `men-${random - 4}`;
  } else if (idx === 2) {
    return random <= 4 ? `girl-${random}` : `women-${random - 4}`;
  } else {
    return 'boy-1';
  }
}


export async function getAvatharFromName(name: string): Promise<string> {
  if (!name || name.trim().length === 0) return 'boy-1';

  try {
    const response = await fetch(`https://api.genderize.io?name=${name}`);
    const data = await response.json();

    if (data.gender === "male") return getAvathar(1);
    if (data.gender === "female") return getAvathar(2);
  } catch (error) {
    return 'boy-1';
  }
  return 'boy-1';
}
