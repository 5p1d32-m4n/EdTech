// tests/courses.test.js
describe('Course API Endpoints', () => {
    let authToken;
    let instructorId;
    let courseId;
  
    beforeAll(async () => {
      instructorId = await db.createTestUser('instructor');
      courseId = await db.createTestCourse(instructorId);
      
      authToken = jwt.sign(
        { userId: instructorId, role: 'instructor' },
        process.env.JWT_SECRET
      );
    });
  
    it('should fetch course details', async () => {
      const res = await request(app)
        .get(`/api/courses/${courseId}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({
        id: courseId,
        title: 'Test Course'
      });
    });
  });