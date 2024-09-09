import { compare } from 'bcryptjs'

export async function comparePassword(
  password: string,
  passwordHashed: string,
) {
  return await compare(password, passwordHashed)
}
