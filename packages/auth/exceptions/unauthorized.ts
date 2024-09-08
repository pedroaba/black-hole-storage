export class UnauthorizedError extends Error {
  constructor(email: string) {
    super(`User with e-mail ${email} was unauthorized.`)
  }
}
