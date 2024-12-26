export const pattern = {
  email: {
    value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
    message: 'Email не верный',
  }
}

export const helpText = {
  email: 'Введите корректную почту',
  password: 'Пароль должен быть не менее 6 символов'
}


export const formSetFunction = {
  trim: (value: string) => value.trim(),
}