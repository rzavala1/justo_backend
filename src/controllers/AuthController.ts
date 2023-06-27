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


/*export async function register(name: string, email: string, password: string): Promise<User | null> {
  try {
    const roleId=2;
    const user = await User.create({ name, email, password,roleId});

    // Generas el token para el usuario registrado
    const token = generateToken(user.id);

    // Agregas el token al objeto de usuario
    user.token = token;

    // Retorna el objeto de usuario con el token incluido
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
}*/

export function verifyToken(token: string): any {
  try {
    const decoded = verify(token, secretKey as string);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
}
