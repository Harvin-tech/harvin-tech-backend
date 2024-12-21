import { model } from 'mongoose';
import { userSchema } from './user.model';
import { chapterSchema } from './chapter.model';
import { lessonSchema } from './lesson.model';
import { enrollmentSchema } from './enrollment.model';
import { mediaSchema } from './media.model';
import { courseSchema } from './course.model';

export const User = model('users', userSchema);
export const Course = model('courses', courseSchema);
export const Chapter = model('chapters', chapterSchema);
export const Lesson = model('lessons', lessonSchema);
export const enrollment = model('enrollments', enrollmentSchema);
export const Media = model('medias', mediaSchema);
