'use strict';
//////////////////
// Dependencies //
//////////////////
const express = require('express'),
  swaggerUi = require('swagger-ui-express'),
  YAML = require('yamljs'),
  swaggerDocument = YAML.load('./api/swagger/swagger.yaml'),
  fp = require('find-free-port'),
  opn = require('open'),
  basicAuth = require('express-basic-auth');
//////////////////////////////
// Creating the express app //
//////////////////////////////
const app = express();

//////////////////////////////
// Attched User Documents  //
//////////////////////////////
app.use('/swagger-api-docs/user', basicAuth({
  users: { 'goutam.singha.cse@gmail.com': '1234' },
  challenge: true,
  realm: 'IntuifyCode Solution Pvt. Ltd.',
}), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//////////////////
// Run Server   //
//////////////////
if (process.env.NODE_ENV !== 'production') {
  fp(5000, 5100, '127.0.0.1', 1).then(([freep]) => {
    ///////////////////////////////
    // Listening on Dynamic port //
    ///////////////////////////////
    app.server = app.listen(freep, () => console.log('Server listening on : ', freep));
    opn(`http://localhost:${freep}/swagger-api-docs/user`);
  }).catch((err) => {
    console.error(err);
  });
} else {
  ///////////////////////
  // Listening on port //
  ///////////////////////
  app.server = app.listen(4002, () => console.log('Server listening on : ', 4002));

}


module.exports = app;