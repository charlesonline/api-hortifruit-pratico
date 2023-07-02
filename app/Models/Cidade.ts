import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Estado from './Estado'
import Estabelecimento from './Estabelecimento'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public estado_id: number

  @column()
  public ativo: boolean

  @hasOne(() => Estado,{
    foreignKey: "id",
    localKey: "estado_id"
  })
  public estado: HasOne<typeof Estado>;

  @manyToMany(() => Estabelecimento,{
    pivotTable: "cidades_estabelecimentos",
    localKey: "id",
    pivotForeignKey: "cidadeId",
    relatedKey: "id",
    pivotRelatedForeignKey: "estabelecimento_id",
  })
  public estabelecimento: ManyToMany<typeof Estabelecimento>;
}
