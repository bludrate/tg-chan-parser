const createTDLClient = require('./modules/tdlClient');
const getChannelId = require('./modules/getChannelId');
const fs = require('fs');

(async function init(){
  const client = await createTDLClient({
    apiId: '43336',
    apiHash: 'fa23f9d6505a3c236e28802e207677b4',
    phoneNumber: '380936864975'
  });

  const channelData = await getChannelId( client, 'bitstat' );
})();
