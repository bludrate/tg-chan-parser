const TDLClients = require('./modules/tdlClients');
const listenToPostUpdates = require('./modules/postUpdates');
const listenToNewChannels = require('./modules/newChannel');
const KafkaClient = require('../tg-chan-kafka');

(async function init(){
  const client = await TDLClients.add({
    apiId: '43336',
    apiHash: 'fa23f9d6505a3c236e28802e207677b4',
    phoneNumber: '380936864975'
  });

  new KafkaClient().then( kafkaClient => {
    kafkaClient.producer.then( producer => {
      listenToPostUpdates( client, producer );
    } );

    listenToNewChannels( client, kafkaClient );
  } );
})()
