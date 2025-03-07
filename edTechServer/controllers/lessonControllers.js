const Lesson = require('../models/Lesson');

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

const updateLesson = async(req, res, next)=>{}

const deleteLesson = async(req, res, next)=>{}