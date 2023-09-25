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

export type ArgChangeProfile = {
  name?: string
  avatar?: File
  email?: string
}

export type LoginResponseType = {
  accessToken: string
}

export type LoginArgType = {
  email: string
  password: string
  rememberMe?: boolean
}

export type ResponseRegisterType = {
  id: string
  name: string
  email: string
}
