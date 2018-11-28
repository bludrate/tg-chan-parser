const getMessageLink = require('./getMessageLink');

module.exports = async ( client, message ) => {
  if ( !message.is_channel_post ) {
    return null;
  }

  if ( message.content._ === 'messageChatChangeTitle' ) {
    return null;
  }

  const messageLink = await getMessageLink( client, message.chat_id, message.id );

  message.link = messageLink;

  return message;
};
