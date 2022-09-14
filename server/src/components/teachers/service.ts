import {Request, Response} from 'express';
import db from './../../db'
import pool from '../../database';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import teacher from './interfaces';
import responseCodes from '../general/responseCodes'


const teachersService = {
    getAll: async(): Promise<RowDataPacket[] | boolean> => {
     
      try {   
        const [teachers,  fields]: [RowDataPacket[], FieldPacket[] ] =
        await pool.query('SELECT id, name FROM HomeWork.teachers ;');
        return teachers;
      } catch (error) {
      // console.log(error);
      return false;
      }
 

    },
    
    getById:async(id: number): Promise<RowDataPacket | boolean | teacher> => {
      try {
        const [teachers,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
          // 'SELECT * FROM HomeWork.teachers WHERE id = ? AND dateDeleted IS NULL;',id);
          'SELECT * FROM HomeWork.teachers WHERE id = ? ;',id);
          // console.log(teachers[0]);
        return teachers[0];
      } catch (error) {
        // console.log(error); 
        return false;
      }

    },
    
    deleteById: async (id:number): Promise<boolean>=>{
      // const currentDate = (new Date()).toLocaleString("en-US");
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      try {
        const [tea,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        'UPDATE teachers SET dateDeleted = ? WHERE id = ? AND dateDeleted IS NULL;', [currentDate, id]);
         return true;
      } catch (error) {
        // console.log(error);
        return false;
      }

    },

    add: async (Name: string): Promise<false|Number> => {
      try {    
      const [result]:[ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO teachers SET name=?;',[Name]);
      return result.insertId;
      } catch (error) {
        // console.log(error);
        return false;
      }

    },

    updateById: async (id:number, Name: string): Promise<boolean> =>{
      try {
        const [teachers,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        'UPDATE teachers SET name= ? WHERE id = ? AND dateDeleted IS NULL;', [Name, id]);
         return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
  },
};


export default teachersService;