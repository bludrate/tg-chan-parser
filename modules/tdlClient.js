const { Client } = require('tdl');

module.exports = async function( config ){
  const loginDetails = {
    type: 'user',
    phoneNumber: config.phoneNumber
  };

  if ( config.getPassword ) {
    loginDetails.getPassword = config.getPassword;
  }

  if ( config.getName ) {
    loginDetails.getName = config.getName;
  }

  if ( config.getAuthCode ) {
    loginDetails.getAuthCode = config.getAuthCode;
  }

  console.log( __dirname);

  const client = new Client({
    apiId: config.apiId, // Your api_id
    apiHash: config.apiHash,
    // binaryPath: '/usr/lib64/libtdjson',
    binaryPath: __dirname + '/../td-sources/build/libtdjson',
    verbositiyLevel: 10,
    databaseDirectory: __dirname + '/../_td_database_' + config.phoneNumber,
    filesDirectory: __dirname + '/../_td_files_' + config.phoneNumber
  });

  return (async function() {
    await client.connect();
    await client.login( () => ({
      phoneNumber: config.phoneNumber
    }) );

    return client;
  })();
};
