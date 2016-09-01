//const hapi = require('hapi');
import hapi from 'hapi';
import routes from './routes/';
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
server.route(routes);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});