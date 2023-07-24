import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import CidadesEstabelecimento from 'App/Models/CidadesEstabelecimento';
import Cliente from 'App/Models/Cliente';
import Endereco from 'App/Models/Endereco';
import Pedido from 'App/Models/Pedido';
import PedidoEndereco from 'App/Models/PedidoEndereco';
import PedidoProduto from 'App/Models/PedidoProduto';
import PedidoStatus from 'App/Models/PedidoStatus';
import Produto from 'App/Models/Produto';
import CreatePedidoValidator from 'App/Validators/CreatePedidoValidator';
var randomstring = require("randomstring");

export default class PedidosController {

    public async store({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(CreatePedidoValidator);

        const userAuth = await auth.use("api").authenticate();
        const cliente = await Cliente.findByOrFail("user_id", userAuth.id);

        let hash_ok: boolean = false;
        let hash_id: string = "";

        while (hash_ok == false) {
            hash_id = randomstring.generate({
                length: 6,
                charset: "alphanumeric",
                capitalization: "uppercase",
            });

            const hash = await Pedido.findBy("hash_id", hash_id);
            if (hash == null) {
                hash_ok = true;
            }
        }

        //TRANSACTION CRIADO
        const trx = await Database.transaction();

        const endereco = await Endereco.findByOrFail("id", payload.endereco_id)

        try {
            const end = await PedidoEndereco.create({
                cidadeId: endereco.cidadeId,
                rua: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                ponto_referencia: endereco.ponto_referencia,
                complemento: endereco.complemento
            });

            //BUSCA DO CUSTO DE ENTREGA E CALCULAR O VALOR TOTAL
            const estabelecimento = await CidadesEstabelecimento.query()
                .where("estabelecimento_id", payload.estabelecimento_id)
                .where("cidade_id", endereco.cidadeId)
                .firstOrFail();

            let valorTotal = 0;
            for await (const produto of payload.produtos) {
                const prod = await Produto.findByOrFail("id", produto.produto_id);
                valorTotal += prod.preco * produto.quantidade;
            }

            valorTotal = valorTotal + estabelecimento.custo_entrega;

            // valorTotal = parseFloat(valorTotal.toFixed(2));
            // valorTotal = valorTotal.toFixed(2);
            // valorTotal = parseFloat(valorTotal);

            if (payload.troco_para != null && payload.troco_para < valorTotal) {
                trx.rollback();
                return response.badRequest("O valor do troco não pode ser menor que o valor total do pedido.");
            }

            const pedido = await Pedido.create({
                hash_id: hash_id,
                cliente_id: cliente.id,
                estabelecimento_id: payload.estabelecimento_id,
                meios_pagamento_id: payload.meios_pagamento_id,
                pedido_endereco_id: end.id,
                valor: valorTotal,
                troco_para: payload.troco_para,
                custo_entrega: estabelecimento.custo_entrega,
                observacao: payload.observacao,
            });

            payload.produtos.forEach(async (produto) => {
                let getProduto = await Produto.findByOrFail("id", produto.produto_id);

                await PedidoProduto.create({
                    pedido_id: pedido.id,
                    produto_id: produto.produto_id,
                    valor: getProduto.preco,
                    quantidade: produto.quantidade,
                    observacao: produto.observacao
                });
            });

            await PedidoStatus.create({
                pedido_id: pedido.id,
                status_id: 1,
            });

            //Confirma a transação
            await trx.commit();

            return response.created({ pedido });
        } catch (error) {
            await trx.rollback();
            return response.badRequest("ERRO CHARLES " + error);
        }
    }

    public async index({ response, auth }: HttpContextContract) {
        const userAuth = await auth.use("api").authenticate();
        const cliente = await Cliente.findByOrFail("user_id", userAuth.id);

        const pedidos = await Pedido.query()
            .where("cliente_id", cliente.id)
            .preload("estabelecimento")
            .preload("pedido_status", (statusQuery) => {
                statusQuery.preload("status");
            })
            .orderBy("id", "desc")

        return response.ok(pedidos);

    }

    public async show({ params, response, auth }: HttpContextContract) {
        const idPedido = params.hash_id;

        const pedido = await Pedido.query()
            .where("hash_id", idPedido)
            .preload("produtos", (produtoQuery) => {
                produtoQuery.preload("produto");
            })
            .preload("cliente")
            .preload("endereco")
            .preload("estabelecimento")
            .preload("meio_pagamento")
            .preload("pedido_status", (statusQuery) => {
                statusQuery.preload("status");
            }).first();

        if (pedido == null) {
            return response.notFound("Pedido não encontrado!");
        }

        return response.ok(pedido);
    }

}
