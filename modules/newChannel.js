const getChannelId = require('./getChannelId');
const getChatMessages = require('./getChatMessages');
const joinChannel = require('./joinChannel');

module.exports = ( tdlClient, kafkaClient ) => {
  kafkaClient.producer.then( kafkaProducer => {
    kafkaClient.subscribe(['newChannel', 'newChannelWithId'], async ( message ) => {
      switch( message.topic ) {
        case 'newChannel':
          const channelData = await getChannelId( tdlClient, message.value );

          if ( channelData.chatId ) {
            kafkaProducer.send([{
              topic: 'newChannelWithId',
              messages: JSON.stringify( channelData )
            }], ()=> {});
          }
          break;
        case 'newChannelWithId':
          const channelId = JSON.parse( message.value ).chatId;

          await joinChannel( tdlClient, channelId );

          await getChatMessages( tdlClient, channelId, 500, function( messages ) {
            kafkaProducer.send([{
              topic: 'updateNewMessages',
              messages: JSON.stringify( messages )
            }], () => {});
          } );
          break;
      }
    } );
  } );
}
