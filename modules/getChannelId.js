module.exports = async ( client, channelUsername ) => {
    if ( !channelUsername ) {
      return null;
    }

    let query = '';

    if ( channelUsername.indexOf('http') === 0 ) {
      query = channelUsername;
    } else {
      query = 'https://t.me/' + channelUsername;
    }

    let data = await client.invoke({
      _: 'searchPublicChats',
      query
    });

    channelUsername = channelUsername.replace('https://t.me/', '');

    if ( !data.chat_ids.length ) {
      return {
        username: channelUsername
      };
    }

    if ( data.chat_ids.length === 1 ) {
      return {
        username: channelUsername,
        chatId: data.chat_ids[ 0 ]
      };
    }

    let channels = data.chat_ids.filter( id => id < 0 );

    return {
      username: channelUsername,
      chatId: channels[ 0 ]
    };
  }
