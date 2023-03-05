const { Router } = require('express');
const { Server } = require('socket.io');
const CategoryController = require('./app/controllers/CategoryController');
const ContactController = require('./app/controllers/ContactController');
// const rabbitMQHandler = require('./connection');

const calcSocket = new Server();
const router = Router();
calcSocket.of('/calc');
// rabbitMQHandler((connection) => {
//   connection.createChannel((err, channel) => {
//     if (err) {
//       throw new Error(err);
//     }
//     const mainQueue = 'calc_sum';

//     channel.assertQueue('', { exclusive: true }, (err, queue) => {
//       console.log(err);
//       if (err) {
//         throw new Error(err);
//       }
//       channel.bindQueue(queue.queue, mainQueue, '');
//       channel.consume(queue.que, (msg) => {
//         const result = JSON.stringify({ result: msg.content.toString() });
//         calcSocket.emit('calc', result);
//       });
//     }, { noAck: true });
//   });
// });
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.post('/test', (req, res) => {
  // rabbitMQHandler((connection) => {
  //   connection.createChannel((err, channel) => {
  //     if (err) {
  //       throw new Error(err);
  //     }
  //     const ex = 'calc_sum';
  //     const msg = JSON.stringify({ task: req.body });

  //     channel.publish(ex, '', msg, { persistent: false });

  //     channel.close(() => { connection.close(); });
  //   });
  // });
  calcSocket.emit('calc', { result: req.body });

  // console.log(calcSocket);
  res.json('ok');
});

module.exports = router;
