import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Produto from './Produto'

export default class PedidoProduto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public pedido_id: number

  @column()
  public produto_id: number

  @column()
  public valor: number

  @column()
  public quantidade: number

  @column()
  public observacao: string | null

  @hasOne(() => Produto,{
    localKey:"produto_id",
    foreignKey:"id"
  })
  public produto: HasOne<typeof Produto>
}
