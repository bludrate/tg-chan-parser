module.exports = async function( client, chatId, messageId ) {
  let data = await client.invoke({
    _: 'getPublicMessageLink',
    chat_id: chatId,
    message_id: messageId
  });

  return data.link;
}
