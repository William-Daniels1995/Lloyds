const { isString } = require( './validation' )

module.exports = {
  branch: ( req, res, next ) => {
    const branch = req.headers[ 'lbg-txn-branch-location' ]
    if ( !isString( branch )) return res.status( 422 ).send( 'Invalid branch' )
    return next()
  }
}