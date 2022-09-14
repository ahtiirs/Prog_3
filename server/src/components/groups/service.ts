import {Request, Response} from 'express';
import db from './../../db'
import group from './interfaces';
import responseCodes from '../general/responseCodes'
import pool from '../../database';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';


const groupsService = {
   getAllgroups: async(): Promise<RowDataPacket[] | boolean> => {
     
    try {   
      const [groups,  fields]: [RowDataPacket[], FieldPacket[] ] =
      await pool.query('SELECT id, name FROM HomeWork.groups ;');
      return groups;
    } catch (error) {
    // console.log(error);
    return false;
    }
  },  



    getGroupById:async(id: number): Promise<RowDataPacket | boolean | group> => {
      try {
        const [user,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
          'SELECT * FROM HomeWork.groups WHERE id = ? AND dateDeleted IS NULL;',id);
          // console.log(user);
        return user[0];
      } catch (error) {
        // console.log(error); 
        return false;
      }
    },

    deleteGroupById: async (id:number): Promise<number>=>{
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      try {
        const [user,  fields]: [any, FieldPacket[]] = await pool.query(
        'UPDATE HomeWork.groups SET dateDeleted = ? WHERE id = ? AND dateDeleted IS NULL;', [currentDate, id]);
         return user.changedRows;
      } catch (error) {
        // console.log(error);
        return 0;
      }

    },

    addGroup: async (Name: string): Promise<false|Number> => {
      try {    
      const [result]:[ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO HomeWork.groups SET name=?;',[Name]);
      return result.insertId;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
    updateGroupById: async (id:number, Name: string): Promise<boolean> =>{
      try {
        const [user,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        'UPDATE HomeWork.groups SET name= ? WHERE id = ? AND dateDeleted IS NULL;', [Name, id]);
         return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
};

export default groupsService;