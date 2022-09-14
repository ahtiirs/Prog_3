import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import usersService from './service';
import { IUpdateUser, INewUser } from './interfaces';

const usersController =  {
  getAll: async (req: Request, res: Response) => {
    const { role, id } = res.locals.user;
    // console.log(role);
    if (role === 'admin') {
      // if (1) {
      
      const users = await usersService.getAllUsers();
            return res.status(responseCodes.ok).json({
        users,}
      ); 
    }

    if (role === 'user') {

      const user = usersService.getUserById(id);
      return res.status(responseCodes.ok).json({
        user,
      });
    }
    return res.status(responseCodes.badRequest).json({
      error: 'No valid user rights',
    });

  },
  getById: async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      user,
    });
  },
  deleteById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    }
    usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({});
  },
  add: async (req: Request, res: Response) => {
    const {
      firstName, lastName, password, email,
    } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: 'Password is required',
      });
    }
    const newUser: INewUser = {
      firstName,
      lastName,
      email,
      password,
      role: 'User',
    };
    const id = await usersService.createUser(newUser);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateById: async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    // const user = usersService.getUserById(id);    
    const updateUser: IUpdateUser = {
      id,
      firstName,
      lastName,
    };
    const result = await usersService.updateUser(updateUser);
    if (!result) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }

    return res.status(responseCodes.noContent).json({});
  },
};

export default usersController;
