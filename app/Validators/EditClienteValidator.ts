import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    user_id: this.ctx.auth.user!.id
  })

  public schema = schema.create({
    nome: schema.string({trim:true},[
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({trim:true},[
      rules.email(),
      rules.maxLength(25),
      rules.unique({table:"users",column:"email",whereNot:{id:this.refs.user_id}})
    ]),
    password: schema.string.nullableAndOptional({},[rules.minLength(8),rules.maxLength(25)]),
    telefone: schema.string({trim:true},[
      rules.mobile({locale:["pt-BR"]}),
      rules.maxLength(15)
    ])
  })

  public messages: CustomMessages = {
    require: "{{field}} é obrigatório para o cadastro",
    "email.email":"{{field}} deve ser um email válido",
    "email.unique":"{{field}} já esta em uso por outro usuário",
    "password.minLength":"{{field}} Deve ter no mínimo 8 caracters",
    "password.maxLength":"{{field}} Deve ter no máximo 25 caracters",
    "telefone.mobile":"{{field}} Deve ser um numero válido",
  }
}
