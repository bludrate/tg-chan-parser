const { delay } = require('./helpers');
const getMessageLink = require('./getMessageLink');
const processNewMessage = require('./processNewMessage');

module.exports = async ( tdlClient, chatId, limit = 100, partialCallback ) => {
  if ( !chatId ) {
    return null;
  }

  async function processMessages( messages ) {
    const processedMessages = await Promise.all(
      messages.map( async m => {
        return await processNewMessage( tdlClient, m );
      } )
    );

    partialCallback( processedMessages.filter( m => m ) );
  }

  const lastMessageRes = await tdlClient.invoke({
    _: 'getChatHistory',
    chat_id: chatId,
    limit: 1,
    only_local: false
  }).catch( ( error ) => { console.log( 'ROROROOROROROR', error, chatId )} );

  if ( !lastMessageRes || !lastMessageRes.messages ) {
    return [];
  }

  await processMessages( lastMessageRes.messages );

  let lastMessage = lastMessageRes.messages[0];
  let result = [ lastMessage ];

  let lastResultId = lastMessage.id;

  let reqLimit = limit - result.length;

  while ( result.length < limit ) {
    let messagesRes = await tdlClient.invoke({
      _: 'getChatHistory',
      chat_id: chatId,
      limit: reqLimit > 100 ? 100 : reqLimit,
      from_message_id: lastResultId,
      only_local: false
    }).catch( ( error ) => { console.log( 'ROROROOROROROR', error )} );

    if ( !messagesRes || messagesRes.messages && messagesRes.total_count == 0 ) {
      return result;
    }

    await processMessages( messagesRes.messages );

    Array.prototype.push.apply(result, messagesRes.messages );

    lastResultId = messagesRes.messages[ messagesRes.messages.length - 1 ].id;

    await delay( 3000 );
  }

  return result;
}
