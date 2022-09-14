import {Request, Response} from 'express';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import db from './../../db'
import course from './interfaces';
import responseCodes from '../general/responseCodes'
import pool from '../../database';


const coursesService = {
    getAll: async(): Promise<RowDataPacket[] | boolean> => {
      try {
          const [courses,  fields]: [RowDataPacket[], FieldPacket[]] = 
          await pool.query('SELECT *  FROM courses WHERE 1;');
          // console.log(courses);
          return courses;
      } catch (error) {
        // console.log(error);
        return false;
      }

    },
    getById: async (id:number): Promise<RowDataPacket| boolean > => { 
      try {
        const [courses,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
          'SELECT *  FROM courses WHERE id = ? ;',id);
          // console.log(courses);
          return courses[0];
        } catch (error) {
          // console.log(error);
          return false;
        }
    },

    deleteById: async (id:number): Promise<number> =>{
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      try {
        const [user,  fields]: [any, FieldPacket[]] = await pool.query(
        'UPDATE courses SET dateDeleted = ? WHERE id = ? AND dateDeleted IS NULL;', [currentDate, id]);
         return user.changedRows;
      } catch (error) {
        // console.log(error);
        return 1;
      }
    }, 
    
    
    add: async (Name: string): Promise<false|Number> => {
   
      try {    
      const [result]:[ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO courses SET name=?;',[Name]);
      return result.insertId;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },


    
    updateById: async (id:number, Name: string): Promise<boolean> => {
      try {
        const [user,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        'UPDATE courses SET name= ? WHERE id = ? AND dateDeleted IS NULL;', [Name, id]);
         return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
};

export default coursesService;