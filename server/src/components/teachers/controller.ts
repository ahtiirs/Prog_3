import {Request, Response} from 'express';
import responseCodes from '../general/responseCodes'
import db from './../../db';
import teachersService from './service';
const teachersController = {

  getAll: async(req: Request, res: Response) =>  {
        const teachers = await teachersService.getAll();  
        return res.status(responseCodes.ok).json({teachers, });
  },


  getById: async(req: Request, res: Response) =>  {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const teacher = await teachersService.getById(id);
    if (!teacher) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      teacher,
    });

  },
  deleteById: async(req: Request, res: Response) =>  {
    const id: number = parseInt(req.params.id, 10);
    if (!id) { 
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const data = await teachersService.deleteById(id);
    if (!data) {
      return res.status(responseCodes.badRequest).json({
        message: `Teacher not found with id: ${id}`,
      });
    }
    return res.status(responseCodes.noContent).json({});
  },

  add: async(req: Request, res: Response) =>  {
    const { Name } = req.body;
    if (!Name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Teacher name is required',
      });
    }
       
    const id= await teachersService.add(Name);
  
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        message: "Something went wrong with sql connection", });
    }
    return res.status(responseCodes.created).json({
      id,
    });

  },
  updateById: async(req: Request, res: Response) =>  {
    const id: number = parseInt(req.params.id, 10);
    const { Name } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!Name ) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const data = await teachersService.updateById(id, Name);
    if (!data) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id: ${id}`,
      });
    }
    return res.status(responseCodes.noContent).json({});
  },
   
};

export default teachersController;
 