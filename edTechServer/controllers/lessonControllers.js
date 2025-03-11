const Lesson = require('../models/Lesson');
const { updateCourse } = require('./courseControllers');

const uploadLesson = async(req, res, next)=>{
    try {
        // get the necessary info from the ***req***
        const {courseId} = req.params;
        const {title, description, videoUrl} = req.body;
        const instructorId = req.user.userId; // THIS IS THE AUTHED USER!!!!

        // Check if the course belongs to the instructor.
        const course = await Course.findById(courseId);
        if(!course || course.instructor_id !== instructorId){
            return res.status(403).json({ message: 'Not authorized to upload lessons for this course.' });
        }

        const lesson = await Lesson.create(courseId, title, description, videoUrl);

        res.status(201).json(lesson);
    } catch (err) {
        next(err);
    }
}

const updateLesson = async(req, res, next)=>{
    try {
        const {lessonId} = req.params;
        const {title, description, videoUrl} = req.body;
        const instructorId = req.user.userId;

        // Check if the lesson belongs to the instructor.
        const lesson = await Lesson.findById(lessonId);
        if(!lesson || lesson.instructor_id !== instructorId){
            return res.status(403).json({message: 'Not authorized to update this lesson.'});
        }

        const updatedLesson = await Lesson.update(lessonId, title, description, videoUrl);

        res.status(200).json(updatedLesson);
    } catch (err) {
        next(err);
    }
};

const deleteLesson = async(req, res, next)=>{
    try {
        const {lessonId} = req.params;
        const instructorId = req.user.userId;

        // Check if the lesson belongs to the instructor.
        const lesson = await Lesson.findById(lessonId);
        if(!lesson || lesson.instructor_id !== instructorId){
            return res.status(403).json({message: 'Not authorized to delete this lesson.'});
        }

        await Lesson.delete(lessonId);

        res.status(200).json({message: 'Lesson deleted successfully.'})
    } catch (err) {
        next(err);
    }
}

module.exports = {updateLesson, updateCourse, deleteLesson};