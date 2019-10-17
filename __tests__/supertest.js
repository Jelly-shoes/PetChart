const request = require('supertest');
const path = require('path');
const fs = require('fs');

// const devJSON = path.resolve(__dirname, '../server/db/markets.dev.json');

const server = 'http://localhost:3000';

// /**
//  * Read the docs! https://www.npmjs.com/package/supertest
//  */
// describe('Route integration', () => {
//   describe('/', () => {
//     describe('GET', () => {
//       // Note that we return the evaluation of `request` here! It evaluates to
//       // a promise, so Jest knows not to say this test passes until that
//       // promise resolves. See https://jestjs.io/docs/en/asynchronous
//       it('responds with 200 status and text/html content type', () => request(server)
//         .get('/')
//         .expect('Content-Type', /text\/html/)
//         .expect(200));
//     });
//   });

//   describe('/markets', () => {
//     describe('GET', () => {
//       it('responds with 200 status and application/json content type', () => request(server)
//         .get('/markets')
//         .expect('Content-Type', /application\/json/)
//         .expect(200));

//       // For this test, you'll need to inspect the body of the response and
//       // ensure it contains the markets list. Check the markets.dev.json file
//       // in the dev database to get an idea of what shape you're expecting.
//       it('markets from "DB" json are in body of response', () => {
//         // console.log('JSON', JSON.parse(fs.readFileSync(devJSON)));
//         request(server)
//           .get('/markets')
//           .expect(res => {
//             expect(res.body).toBeInstanceOf(Array);
//           });
//       });
//     });

//     describe('PUT', () => {
//       it('responds with 200 status and application/json content type', () => {
//         request(server)
//           .put('/markets')
//           .expect('Content-Type', /application\/json/)
//           .expect(200);
//       });

//       it('responds with the updated market list', () => {
//         request(server)
//           .put('/markets')
//           .expect(res => {
//             expect(res.body).toBeInstanceOf(Array);
//           });
//       });

//       it('responds to invalid request with 400 status and error message in body', () => {
//         request(server)
//           .put('./markets')
//           .expect(res => {
//             expect(res).toBeInstanceOf(Error);
//           })
//           .expect(400);
//       });
//     });
//   });
// });
