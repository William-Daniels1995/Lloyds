const middleware = require('./middleware')
const routes = require( './routes' )

module.exports = app => {
  app.get( '/api/v1/branches', middleware.branch, routes.branches.get )
}