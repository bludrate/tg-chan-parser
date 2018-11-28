const KafkaClient = require('../tg-chan-kafka');

new KafkaClient().then( kafkaClient => {
  // kafkaClient.subscribe(['newChannelId'], ( message ) => {
  //   console.log( 'new channel!!', message );
  // } );

  kafkaClient.producer.then( kafkaProducer => {
    kafkaProducer.send([{
      topic: 'newChannelWithId',
      messages: JSON.stringify({
        username: 'test_tdl',
        chatId: -1001229908976
      })
    }], () => {});

    // kafkaProducer.send([{
    //   topic: 'channelUpdateReady',
    //   messages: JSON.stringify({
    //     username: 'test_tdl',
    //   })
    // }], () => {});

    // kafkaProducer.send([{
    //   topic: 'newChannelWithId',
    //   messages: JSON.stringify({
    //     username: 'ThinkCritical',
    //     chatId: -1001092178754
    //   })
    // }], () => {});

    // kafkaProducer.send([{
    //   topic: 'newChannel',
    //   messages: 'ThinkCritical'
    // }], () => {});
  } );
});
