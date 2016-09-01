import Joi from 'joi';
// cuando lo importas de otro lado import {users} from 'routes/api/users.js';
const users =[{
	method : 'get', 
	path: '/api/users'
	config: {
		handler: function (request, reply) => {
			let sql = "select * from users";
			request.pg.client.query(sql,(err, result) =>{
				if(err){
					console.log(err);
				}
				let users = result.row;
				return reply(users);
			});
		}
	}
}, {
	method : 'post', 
	path: '/api/users'
	config: {
		handler: function (request, reply) => {
			let username = request.payload.username;
			let name = request.payload.name;
			let lastname = request.payload.lastname;
			let birthdate = request.payload.birthdate;
			let role = request.payload.role;
			let password = request.payload.password;
			let mail = request.payload.mail;
			let phone = request.payload.phone;
			let sql = `insert into
					   (username, name, lastname, birthdate, role, password, mail, phone)
					   values
					   ('${username}', '${name}', '${lastname}', '${birthdate}', '${role}', '${password}', '${mail}', '${phone}')
					   retirning *`;
					   request.pg.client.query(sql, (err, result) => {
					   	if (err){
					   		console.log(err);
					   	}
					   	reply(result);
					   })
		}
	},
	validate.{
		payload: Joi.object().keys({
			username: Joi.string().required().min(1).max(60),
			name: Joi.string().min(1).max(60),
			lastname: Joi.string().min(1).max(60),
			birthdate: Joi.string(),
			role: Joi.number().min(1),
			password: Joi.string().required().min(1).max(60),
			mail: Joi.string().mail(),
			phone: Joi.number(),
		})
	}
}];
export default users: