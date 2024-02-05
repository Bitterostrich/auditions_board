const app = require('../index')
const request = require('supertest')
const mongoose = require ('mongoose')
const Post = require("../models/postModel")

describe('Sample Test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });

describe('GET /', () => {
    it('responds with BEANS AND FISH AND EGGS AND CHIPS AND BACON AND SAUSAGE', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('BEANS AND FISH AND EGGS AND CHIPS AND BACON AND SAUSAGE')
    })
})

// describe('Retrieve all posts in the database', () => {
//     it('Should retrieve all items in the Database', async () => {
//         const response = await request(app).get('/posts')
//         expect(Array.isArray(response.body)).toBeTruthy();
//         expect(response.body.length).toBeGreaterThan(0);

//         expect(response.body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     postTitle: expect.any(String),
//                     postType: expect.any(String),
//                     postDate: expect.any(String),
//                     postTime: expect.any(String),
//                     postLocation: expect.any(String),
//                     postDescription: expect.any(String)
//             })
//             ])
//         )
//     })
// })

// describe('Search Posts by id', () => {
//     let testPostId

//     beforeAll(async () => {
//         const testPost = new Post({
//             postTitle: 'A Drive',
//             postType: 'A drive',
//             postDate: '2025-08-08',
//             postTime: '14:00',
//             postLocation: 'Prague',
//             postDescription: 'a drive about a drive'
//         })
//         await testPost.save()
//         testPostId = testPost._id.toString()
//     })

//     afterAll(async () => {
//         await Post.findByIdAndDelete(testPostId);
//         await mongoose.connection.close()
//     })

//     it('Finds posts matching a given ID', async () => {
   
//       const response = await request(app).get(`/find/${testPostId}`);
  
//       expect(response.statusCode).toBe(200)
//       expect(response.body).toEqual(
//         expect.arrayContaining([
//           expect.objectContaining({
//             _id: testPostId,
//             postTitle: 'A Drive'
//           })
//         ])
//       )
//     })
//     it('returns 404 when no posts match the search term', async () => {
//       const nonExistentId = new mongoose.Types.ObjectId().toString()
//       const response = await request(app).get(`/find/${nonExistentId}`)
  
//       expect(response.statusCode).toBe(404)
//     })
  
//   })
  