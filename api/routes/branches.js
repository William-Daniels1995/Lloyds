const axios = require( 'axios' )

module.exports = {
  get: async ( req, res, next ) => {
    //Request the data and deconstruct
    const branch = req.headers[ 'lbg-txn-branch-location' ]
    console.log( `Requesting branches in ${ branch }` )

    const route = 'https://api.lloydsbank.com/open-banking/v2.2/branches'
    const response = await axios.get( route ).catch( console.log )
    const data = response?.data?.data?.[ 0 ]?.Brand?.[ 0 ]
    if ( !data ) return res.sendStatus( 504 )

    //Filter based on branch location
    const branches = data.Branch.filter( o => o?.PostalAddress?.TownName === branch.toUpperCase() )
    console.log( `Found ${ branches.length } branches` )
    if ( !branches.length ) return res.sendStatus( 404 )
    return res.status( 200 ).send( branches )
  }
}