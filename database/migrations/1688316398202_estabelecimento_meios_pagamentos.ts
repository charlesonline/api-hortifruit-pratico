import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'estabelecimento_meios_pagamentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('estabelecimento_id').unsigned().notNullable().references('id').inTable('estabelecimentos');
      table.integer('meios_pagamento_id').unsigned().notNullable().references('id').inTable('meios_pagamentos');
      table.primary(['estabelecimento_id','meios_pagamento_id']);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
