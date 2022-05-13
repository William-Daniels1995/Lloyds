const express = require( 'express' )
const app = express()

//Require api routes
require( './api' )( app )

module.exports = app