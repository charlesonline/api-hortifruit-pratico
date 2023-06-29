import Route from '@ioc:Adonis/Core/Route'

//Rota home publica
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

//Grupo de rotas que necessita estar logado
Route.group(()=>{
  //obtem o usuário atual
  Route.get('/auth/me',"AuthController.me");
  //Edição de cliente e usuário
  Route.put('/cliente',"ClientesController.update");
}).middleware("auth");
