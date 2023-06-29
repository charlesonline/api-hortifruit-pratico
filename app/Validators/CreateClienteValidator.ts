import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({trim:true},[
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    email: schema.string({trim:true},[
      rules.email(),
      rules.maxLength(255),
      rules.unique({table: 'users',column: 'email'})
    ]),
    password: schema.string({},[rules.minLength(8), rules.maxLength(25)]),
    telefone: schema.string({trim:true},[
      rules.mobile({locale: ["pt-BR"]}),
      rules.maxLength(15)
    ])
  })

  public messages: CustomMessages = {
    require: "{{field}} é obrigatório para o cadastro",
    "email.email":"{{field}} deve ser um email válido",
    "email.unique":"{{field}} já esta em uso",
    "password.minLength":"{{field}} Deve ter no mínimo 8 caracters",
    "password.maxLength":"{{field}} Deve ter no máximo 25 caracters",
    "telefone.mobile":"{{field}} Deve ser um numero válido",
  }
}
