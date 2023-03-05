const amqp = require('amqplib/callback_api');

module.exports = (callback) => {
  amqp.connect(
    'amqplib/callback_api',
    (error, conection) => {
      if (error) {
        console.log('test', error);
        throw new Error(error);
      }

      callback(conection);
    },
  );
};
