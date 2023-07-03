import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePedidoValidator from 'App/Validators/CreatePedidoValidator';

export default class PedidosController {

    public async store ({request, response, auth}: HttpContextContract) {
        const payload = await request.validate(CreatePedidoValidator);
    }

}
