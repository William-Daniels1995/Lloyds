const routes = require( './routes' )

module.exports = app => {
  app.get( '/api/v1/branches', routes.branches.get )
}