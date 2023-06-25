// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
// import User from 'App/Models/User'

Route.get('/', async () => {
  return { hortifuit: 'prático' }
});

// Route.post('/getToken', async ({request,response,auth}: HttpContextContract) => {
//   const email = request.input('email');
//   const password = request.input('password');

//   // const user = await User.findByOrFail('email',email);
//   const user = await User.findBy("email",email);
//   if ( user == null ) {
//     return response.notFound("Usuário não encontrado");
//   }

//   const token = await auth.use('api').attempt(email,password);

//   return response.ok(token);
// });

// Route.get('/auth', async ({response}: HttpContextContract) => {
//   return response.ok("Estou acessando!");
//   // const userAuth = await auth.use('api').authenticate();

//   // if (userAuth) {
//   //   return response.ok(userAuth);
//   // }
// }).middleware('auth');
