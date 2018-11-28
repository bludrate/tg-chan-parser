const createTDLClient = require('./tdlClient');

// apiId: '43336',
// apiHash: 'fa23f9d6505a3c236e28802e207677b4',
// phoneNumber: '380936864975'

class Clients {
  constructor() {
    this.clients = {};
  }

  async init( clientConfigs ) {
    clientConfigs.forEach( config => this.add( config ) );
  }

  async add( config ) {
    this.clients[ config.phoneNumber ] = createTDLClient( config );

    return await this.clients[ config.phoneNumber ];
  }

  async get( phoneNumber ) {
    await this.clients[ phoneNumber ];
  }
}

module.exports = new Clients();
