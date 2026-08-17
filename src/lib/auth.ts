import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const key = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  id: string;
  username: string;
  role: 'STUDENT' | 'ADMIN';
  firstName: string;
  lastName: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 1 hafta
    .sign(key);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}
