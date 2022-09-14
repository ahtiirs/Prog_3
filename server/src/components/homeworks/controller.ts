import {Request, Response} from 'express';
import responseCodes from '../general/responseCodes'
import db from './../../db';
import homeworksService from './service';
import {homework, newHomework} from './interfaces';
const homeworksController = {

  getAll: async (req: Request, res: Response) =>{

        const homeworks = await homeworksService.getAll();  
        return res.status(responseCodes.ok).json({homeworks,});
  },
  getById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(responseCodes.badRequest).json({error: 'No valid id provided',});
      }
      const homework = await homeworksService.getById(id);
      if (!homework) {
        return res.status(responseCodes.badRequest).json({error: `No homework found with id: ${id}`,});
      }
      
      return res.status(responseCodes.ok).json({homework,});
  },
  
  deleteById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({error: 'No valid id provided',});
    }
    const data = await homeworksService.deleteById(id);
    if (!data) {
      return res.status(responseCodes.badRequest).json({
        message: `Homework not found with id: ${id}`,
      });
    }
    return res.status(responseCodes.noContent).json({});
  },

  add: async (req: Request, res: Response) =>  {
    const { user, group, course, teacher, description, dueDate } = req.body;

    if (!group || !teacher || !description || !dueDate) {
      return res.status(responseCodes.badRequest).json({
        error: 'Homework is required',
      });
    }
    if (!dueDate) {
      return res.status(responseCodes.badRequest).json({
        error: 'group, teacher, description, dueDate is required',});
    }
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const Homework: newHomework ={
      user_id: user,
      group_id: group,
      course_id: course,
      teacher_id: teacher,
      description: description,
      dueDate: dueDate,
      dateCreated:currentDate,
    }
    // console.log(Homework);

    const id = await homeworksService.add(Homework);

    return res.status(responseCodes.created).json({id,});

  },
  updateById: async (req: Request, res: Response) =>  {
    const id: number = parseInt(req.params.id, 10);
    const {user, group, course, teacher, description, dueDate  } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({error: 'No valid id provided',});
    }
    if (!group && !teacher && !description && !dueDate) {
      return res.status(responseCodes.badRequest).json({
        error: 'Something is required',
      });
    }
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const Homework: homework ={
      id: id,
      user_id: user,
      group_id: group,
      teacher_id: teacher,
      description: description,
      dateModified: dueDate,
    }
    const data = await homeworksService.updateById(Homework);

    if (!data) {
      return res.status(responseCodes.badRequest).json({
        error: `No homework found with id: ${id}`,
      });
    }
 
    return res.status(responseCodes.noContent).json({});
  },
   
}; 

export default homeworksController;
