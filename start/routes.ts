import Route from '@ioc:Adonis/Core/Route'

//Login para os tres tipos de user
Route.post('/login',"AuthController.login");
Route.post('/logout',"AuthController.logout");

Route.post('/cliente/cadastro',"ClientesController.store");

Route.group(()=>{
  Route.get('/auth/me',"AuthController.me");
  Route.put('/cliente',"ClientesController.update");
}).middleware("auth");

Route.get('/', async () => {
  return { 
    name: 'api-hortifruit',
    version: '1.0.0',
    developer: 'charlesonline' 
  }
});
