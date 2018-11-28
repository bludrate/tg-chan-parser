module.exports = async ( client, channelId, userId ) => {
  if ( !client ) {
    return ;
  }

  if ( !userId ) {
    let me = await client.invoke({
      '_': 'getMe'
    });

    userId = me.id;
  }

  let openChat = await client.invoke({
    '_': 'openChat',
    chat_id: channelId
  });

  let res = await client.invoke({
    '_': 'addChatMember',
    chat_id: channelId,
    user_id: userId
  });

  return res;
};
