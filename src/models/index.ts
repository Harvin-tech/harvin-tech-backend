import { model } from 'mongoose';
import { userSchema } from './user.model';
import { moduleSchema } from './module.model';
import { chapterSchema } from './chapter.model';
import { courseEnrolledSchema } from './courseEnrolled.model';
import { moduleEnrolledSchema } from './moduleEnrolled';
import { chapterEnrolledSchema } from './chapterEnrolled.model';
import { mediaSchema } from './media.model';
import { courseSchema } from './course.model';

export const User = model('users', userSchema);
export const Course = model('courses', courseSchema);
export const Module = model('modules', moduleSchema);
export const Chapter = model('chapters', chapterSchema);
export const CourseEnrolled = model('course_enrolled', courseEnrolledSchema);
export const ModuleEnrolled = model('module_enrolled', moduleEnrolledSchema);
export const ChapterEnrolled = model('chapter_enrolled', chapterEnrolledSchema);
export const Media = model('medias', mediaSchema);
