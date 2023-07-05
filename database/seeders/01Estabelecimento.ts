import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cidade from 'App/Models/Cidade';
import CidadesEstabelecimento from 'App/Models/CidadesEstabelecimento';
import Estabelecimento from 'App/Models/Estabelecimento';
import Estado from 'App/Models/Estado';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    for (let index = 1; index <= 20; index++) {
      const user = await User.create({
        email: 'estabelecimento'+index+'@email.com',
        password: '123456',
        tipo: 'estabelecimentos',
      });

      await Estabelecimento.create({
        nome: "Estabelecimento " + index,
        logo: "https://picsum.photos/id/"+index+"/200/200",
        online: true,
        bloqueado: false,
        userId: user.id,
      });
    }

    // for (let i = 1; i <= 20; i++) {
    //   const uf = await Estado.create(
    //     {
    //       nome: "Estado "+ i,
    //       uf: "E"+i
    //     }
    //   );

    //   await Cidade.create(
    //     {
    //       nome: "Cidade "+i,
    //       estado_id: uf.id
    //     }
    //   );
    // }
    await Estado.createMany([
      {
        nome: "Minas Gerais",
        uf: "MG"
      },
      {
        nome: "Espirito Santo",
        uf: "ES"
      }
    ]);

    await Cidade.createMany([
      {
        nome: "Aimorés",
        estado_id: 1
      },
      {
        nome: "Colatina",
        estado_id: 2
      }
    ]);

    for (let i = 1; i <= 20; i++) {
      await CidadesEstabelecimento.create(
        {
          cidade_id: faker.number.int({min:1,max:2}),
          estabelecimento_id: i,
          custo_entrega: faker.number.float({min:1,max:20,precision:0.01})
        }
      );
    }




    // const user = await User.create({
    //   email: 'estabelecimento@email.com',
    //   password: '123456',
    //   tipo: 'estabelecimentos',
    // });
    // await Estabelecimento.create({
    //   nome: 'Estabelecimento',
    //   logo: "https://placehold.co/50x50",
    //   online: true,
    //   bloqueado: false,
    //   userId: user.id,
    // });
  }
}
