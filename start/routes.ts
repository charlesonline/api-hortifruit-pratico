import Route from '@ioc:Adonis/Core/Route'

//Rota home
Route.get('/', async () => {
  return { 
    name: 'api-hortifruit',
    version: '1.0.0',
    developer: 'charlesonline' 
  }
});

//Login para os tres tipos de user
Route.post('/login',"AuthController.login");

//Logout
Route.post('/logout',"AuthController.logout");

//Cadastro publico de cliente e usuario
Route.post('/cliente/cadastro',"ClientesController.store");

Route.get('/cidades',"CidadesController.index");
Route.get('/cidades/:id/estabelecimentos',"CidadesController.Estabelecimentos");

Route.get('/estabelecimento/:id',"EstabelecimentosController.show");

//Grupo de rotas que necessita estar logado
Route.group(()=>{
  //obtem o usuário atual
  Route.get('/auth/me',"AuthController.me");

  //get(index), post(store), put(update), delete(destroy) - Endereços
  Route.resource('/enderecos',"EnderecosController").only([
    "store","index","update","destroy"
  ]);

  Route.post('/pedidos',"PedidosController.store");
  Route.get('/pedidos',"PedidosController.index");
  Route.get('/pedidos/:hash_id',"PedidosController.show");

  //PEGA OS PEDIDOS DO ESTABELECIMENTO
  Route.get("/estabelecimento/pedidos","EstabelecimentosController.pedidos");

  //Edição de cliente e usuário
  Route.put('/cliente',"ClientesController.update");
}).middleware("auth");
