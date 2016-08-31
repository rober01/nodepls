//const hapi = require('hapi');
import hapi from 'hapi';
require('dotenv').load();
//console.log(hapi);

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});
server.register([register('vision'), // register all your plugins 
  { register: require('hapi-postgres-connection')}
], (err) =>{
if (err) {
        console.log("Failed to load module.", err);
    }
});
// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
        let sql= "select * from users";
        request.pg.client.query(sql, function(err, result){
            
            let data = result.rows;
            return reply(data);
        })
        //return reply({message: 'hello world', status:200});
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});