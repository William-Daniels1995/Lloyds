const request = require( 'supertest' )
const app = require( '../app' )

describe( 'API tests', () => {
  describe( 'GET /branches', () => {

    const route = '/api/v1/branches'

    test( 'Invalid Branch', async () => {
      const response = await request( app ).get( route )
      expect( response.statusCode ).toBe( 422 )
    })

    test( 'Unknown Branch', async () => {
      const response = await request( app ).get( route ).set( 'lbg-txn-branch-location', 'Planet Jupiter' )
      expect( response.statusCode ).toBe( 404 )
    })

    test( 'Valid Branch', async () => {
      const branch = 'London'

      const response = await request( app ).get( route ).set( 'lbg-txn-branch-location', branch )
      const type = response.headers[ 'content-type' ]

      expect( response.statusCode ).toBe( 200 )
      expect( type ).toMatch( /json/ )
      expect( response.body ).toBeInstanceOf( Array )

      response.body.forEach( item => {
        expect( item ).toHaveProperty( 'Identification' )
        expect( item ).toHaveProperty( 'SequenceNumber' )
        expect( item ).toHaveProperty( 'Name' )
        expect( item ).toHaveProperty( 'Type' )
        expect( item ).toHaveProperty( 'Type' )
        expect( item?.PostalAddress?.TownName ).toBe( branch.toUpperCase() )
      })
    })
  })
})