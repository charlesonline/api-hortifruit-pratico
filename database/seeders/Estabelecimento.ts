import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/Models/Estabelecimento';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'estabelecimento@email.com',
      password: '123456',
      tipo: 'estabelecimentos',
    });
    await Estabelecimento.create({
      nome: 'Estabelecimento',
      logo: "https://placehold.co/50x50",
      online: true,
      bloqueado: false,
      userId: user.id,
    });
  }
}
