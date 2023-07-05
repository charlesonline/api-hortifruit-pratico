import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categoria from 'App/Models/Categoria';
import Produto from 'App/Models/Produto';


export default class extends BaseSeeder {
  public async run () {
    for (let iEst = 1; iEst <= 20; iEst++) {
      let categoria = await Categoria.create({
        nome: faker.commerce.department(),
        descricao: faker.lorem.sentence(),
        posicao: 1,
        estabelecimento_id: iEst
      });

      await Produto.createMany([
        {
          nome: faker.commerce.productName(),
          imagem: faker.image.food(300,300),
          descricao: faker.lorem.sentence(),
          preco: faker.datatype.number({min:5,max:100,precision:0.5}),
          categoria_id: categoria.id,
          posicao:3,
          unidade: "UN",
        },
        {
          nome: faker.commerce.productName(),
          imagem: faker.image.food(300,300),
          descricao: faker.lorem.sentence(),
          preco: faker.datatype.number({min:5,max:100,precision:0.5}),
          categoria_id: categoria.id,
          posicao:3,
          unidade: "UN",
        },
        {
          nome: faker.commerce.productName(),
          imagem: faker.image.food(300,300),
          descricao: faker.lorem.sentence(),
          preco: faker.datatype.number({min:5,max:100,precision:0.5}),
          categoria_id: categoria.id,
          posicao:3,
          unidade: "UN",
        }
      ]);
    }
  }
}
