import users from 'api/users';
const index = {
	method: ['get', 'post'],
	path: '/'
	config: {
		handler: function(request, reply){
			var data ={
				title: 'this is index',
				message: 'hello, world. you crazy handlebars layout'
			}:
			return reply.view(data);
		}
	}
};
const routes = []. concat(
		index,
		users
	);
export default routes;