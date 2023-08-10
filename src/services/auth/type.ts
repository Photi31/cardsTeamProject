export type UserType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type RegisterType = {
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: true
}

export type ForgotPasswordType = {
  html?: string
  email: string
  subject?: string
}

export type CreateNewPasswordType = {
  token?: string
  password: string
}
