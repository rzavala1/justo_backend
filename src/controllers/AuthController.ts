import { User } from "../models/User";
import { sign, verify } from "jsonwebtoken";
import {compare} from "bcryptjs";

const secretKey = process.env.SECRET_KEY;
const expiresIn = "24h";

export async function login(email: string, password: string): Promise<string> {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Correo electrónico o contraseña incorrectos");
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Correo electrónico o contraseña incorrectos");
  }
  const token = sign({ userId: user.id }, secretKey as string, { expiresIn });

  return token;
}

export function verifyToken(token: string): any {
  try {
    const decoded = verify(token, secretKey as string);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
}
