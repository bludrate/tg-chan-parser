class ClientUpdates {
  constructor( opts ){
    this.client = opts.client;
    this.subscribers = {};
    this.opts = opts;

    if ( opts.subscribes ) {
      opts.subscribes.forEach( s => this.on( s.type, s.callback ) );
    }

    this.startListenToUpdates();
  }

  startListenToUpdates() {
    this.client.on('update', data => {
      if ( this.opts.log ) {
        console.log(data);
      }

      if ( this.subscribers[ data._ ] ) {
        this.subscribers[ data._ ].forEach( callback => callback( data ) );
      }
    } );
  }

  subscribe( type, callback ) {
    if ( type in this.subscribers ) {
      this.subscribers[ type ].push( callback );
    } else {
      this.subscribers[ type ]=[ callback ];
    }
  }

  on( type, callback ) {
    if ( type instanceof Array ) {
      type.forEach( t => this.subscribe( t, callback ) );
    } else {
      this.subscribe( type, callback );
    }
  }
}

module.exports = ClientUpdates;
