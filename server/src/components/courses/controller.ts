import {Request, Response} from 'express';
import responseCodes from '../general/responseCodes'
// import db from './../../db';
import coursesService from './service';
const coursesController = {


// --------------------------------------------------------------------------------------------------------------------
getAll: async (req: Request, res: Response) => {
  const courses = await coursesService.getAll();  
  
  return res.status(responseCodes.ok).json({courses,});
},
// --------------------------------------------------------------------------------------------------------------------
getById: async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  if (!id) { 
    return res.status(responseCodes.badRequest).json({error: 'No valid id provided', });
  }
  
  const course = await coursesService.getById(id);
  
  if (!course) { 
    return res.status(responseCodes.badRequest).json({error: `No user found with id: ${id}`, });
  }
  
  return res.status(responseCodes.ok).json({
    course });
},
// --------------------------------------------------------------------------------------------------------------------



deleteById: async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  
  if (!id) {
    return res.status(responseCodes.badRequest).json({error: 'No valid id provided',});
  }

  const data = await coursesService.deleteById(id);

  if (data == 0)  {
    return res.status(responseCodes.badRequest).json({ error: `Course not found with id: ${id}`,});
  }
  
  return res.status(responseCodes.noContent).json({});
  },


// --------------------------------------------------------------------------------------------------------------------

add: async (req: Request, res: Response) => {
  const { Name } = req.body;
  if (!Name) {
    return res.status(responseCodes.badRequest).json({error: 'Course name is required',});
  }

  const result = await coursesService.add(Name);
  if (!result) {
    return res.status(responseCodes.badRequest).json({error: 'Operation error',});
  }
  return res.status(responseCodes.created).json({result,});
  },

// --------------------------------------------------------------------------------------------------------------------

  updateById: async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { Name } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({error: 'No valid id provided',});
    }
    if (!Name ) {
      return res.status(responseCodes.badRequest).json({error: 'Nothing to update',});
    }
    // const index = db.courses.findIndex((element) => element.id === id);
    const result = await coursesService.updateById(id, Name );

    if (!result) {
      return res.status(responseCodes.badRequest).json({error: `No course found with id: ${id}`,});
    }
   
    return res.status(responseCodes.noContent).json({});
  },
};

export default coursesController;
