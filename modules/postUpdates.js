const getMessageLink = require('./getMessageLink');
const ClientUpdates = require('./clientUpdates');
const processNewMessage = require('./processNewMessage');

module.exports = ( client, producer ) => {
  return new ClientUpdates({
    client,
    //log: true,
    subscribes: [
      {
        type: [
          'updateNewMessage',
          'updateChatPhoto',
          'updateChatTitle',
          'updateDeleteMessages',
          'updateMessageContent',
          'updateMessageEdited'
          //'updateMessageViews',
          //'updateSupergroupFullInfo'
          //'updateChatLastMessage'
        ],
        callback: async function( data ) {
          const { _:type, ...payload } = data;

          switch( type ) {
            case 'updateNewMessage':
              const message = await processNewMessage( client, payload.message );

              if ( !message ) {
                return ;
              }

              break;
            // case 'updateChatPhoto':
            //   //payload.chat_id = data.chat_id;
            //   break;
            // case 'updateChatTitle':
            //   // payload.chat_id = data.chat_id;
            //   // payload.title = data.title;
            //   break;
            case 'updateDeleteMessages':
              payload.date = Math.floor( Date.now()/1000 );
              if ( !payload.is_permanent ) {
                return ;
              }
              break;
            // case 'updateMessageContent':
            //   break;
            // case 'updateMessageEdited':
            //   if ( !payload.reply_markup ) {
            //     return ;
            //   }
            //   break;
            // case 'updateMessageViews':
            //   break;
            // case 'updateSupergroupFullInfo':
            //   break;
            // default:

          }

          producer.send( [ {
            topic: type,
            messages: JSON.stringify( payload )
          } ], ( err, data ) => {
            console.log( err, data );
          } );
        }
      }
    ]
  });
};
