// import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clienteId: number

  @column()
  public cidadeId: number

  @column()
  public rua: string

  @column()
  public numero: string | null

  @column()
  public bairro: string

  @column()
  public ponto_referencia: string | null

  @column()
  public complemento: string | null

  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
