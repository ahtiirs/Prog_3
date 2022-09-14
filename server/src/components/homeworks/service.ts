import {Request, Response} from 'express';
import db from './../../db'
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import {newHomework, homework} from './interfaces';
import responseCodes from '../general/responseCodes'


const coursesService = {
    getAll:async(): Promise<RowDataPacket[] | boolean> => {
      try {
          const [homeworks,  fields]: [RowDataPacket[], FieldPacket[]] = 
          await pool.query('SELECT *  FROM homeworks WHERE 1;');
          // console.log(homeworks);
          return homeworks;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
    
    getById:async (id:number): Promise<RowDataPacket| boolean > => { 
      try {
        const [homeworks,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
          'SELECT *  FROM homeworks WHERE id = ? ;',id);
          // console.log(homeworks);
          return homeworks[0];
        } catch (error) {
          // console.log(error);
          return false;
        }
     
    }, 
    
    deleteById: async (id:number): Promise<boolean> =>{
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      try {
        const [user,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        'UPDATE homeworks SET dateDeleted = ? WHERE id = ? AND dateDeleted IS NULL;', [currentDate, id]);
         return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
    },

    add: async (Homework:newHomework): Promise<false|Number> => {
   
      try {    
        const [result]:[ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO homeworks SET ?;',[Homework]);
        return result.insertId;
      } catch (error) {
        // console.log(error);
        return false;
      }

  },
    updateById: async (Homework:homework): Promise<boolean> => {
    
      try {
        const [user,  fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        'UPDATE homeworks SET ? WHERE id = ? AND dateDeleted IS NULL;', [Homework, Homework.id]);
         return true;
      } catch (error) {
        // console.log(error);
        return false;
      }

    },
};


export default coursesService;