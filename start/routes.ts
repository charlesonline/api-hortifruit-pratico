import Route from '@ioc:Adonis/Core/Route'
// import User from 'App/Models/User'

Route.get('/', async () => {
  // User.create({
  //   email: 'admin2@admin.com',
  //   password: '123',
  //   tipo: 'admin'
  // })
  return { hello: 'world' }
})
