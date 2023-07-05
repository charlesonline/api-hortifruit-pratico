import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PedidoStatus from './PedidoStatus'
import Estabelecimento from './Estabelecimento'
import PedidoProduto from './PedidoProduto'
import Endereco from './Endereco'
import MeiosPagamento from './MeiosPagamento'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public hash_id: string

  @column()
  public cliente_id: number

  @column()
  public estabelecimento_id: number

  @column()
  public meios_pagamento_id: number

  @column()
  public pedido_endereco_id: number

  @column()
  public valor: number

  @column()
  public troco_para: number | null

  @column()
  public custo_entrega: number

  @column()
  public observacao: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasOne(() => Cliente, {
    localKey: "cliente_id",
    foreignKey: "id"
  })
  public cliente: HasOne<typeof Cliente>

  @hasMany(() => PedidoStatus, {
    localKey: "id",
    foreignKey: "pedido_id"
  })
  public pedido_status: HasMany<typeof PedidoStatus>

  @hasOne(() => Estabelecimento, {
    localKey: "estabelecimento_id",
    foreignKey: "id"
  })
  public estabelecimento: HasOne<typeof Estabelecimento>

  @hasMany(() => PedidoProduto, {
    localKey: "id",
    foreignKey: "pedido_id"
  })
  public produtos: HasMany<typeof PedidoProduto>

  @hasOne(() => Endereco, {
    localKey: "pedido_endereco_id",
    foreignKey: "id"
  })
  public endereco: HasOne<typeof Endereco>

  @hasOne(() => MeiosPagamento, {
    localKey: "meios_pagamento_id",
    foreignKey: "id"
  })
  public meio_pagamento: HasOne<typeof MeiosPagamento>
}
