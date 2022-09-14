import course from './components/courses/interfaces';
import group from './components/groups/interfaces';
import teacher from './components/teachers/interfaces';
import {homework} from './components/homeworks/interfaces';
import { IUser } from './components/users/interfaces';

/**
* Database interface
*/
  interface Db {
    groups: group[];
    courses: course[];
    teachers: teacher[];
    homeworks: homework[];
    users: IUser[];
  
  }
/**
* Mock database
*/
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
      email: 'juku@juurikas.ee',
      password: '$2b$10$.ZyCi8SeFH6EoqzqkF41j.ZZasV92NkoLOdSlMPxNc//X/jIEjkPK',
      role: 'Admin',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      dateDeleted: null,
    },
    {
      id: 2,
      firstName: 'Mari',
      lastName: 'Maasikas',
      email: 'mari@maasikas.ee',
      password: '$2b$10$.ZyCi8SeFH6EoqzqkF41j.ZZasV92NkoLOdSlMPxNc//X/jIEjkPK',
      role: 'Admin',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      dateDeleted: null,
    },
    {
      id: 3,
      firstName: 'Ahti',
      lastName: 'Irs',
      email: 'ahti@hts.ee',
      password: '$2b$10$.ZyCi8SeFH6EoqzqkF41j.ZZasV92NkoLOdSlMPxNc//X/jIEjkPK',
      role: 'Admin',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      dateDeleted: null,
    },
    {
      id: 4,
      firstName: "Kalev",
      lastName: "Kaalikas",
      email: "kalev@kaalikas.ee",
      password: "$2b$10$9jshB.mCiTy1dWLOqkakf.jN7Ufts35o8yZjUB8.Fo/yxlMHwan7.",
      role: "User",
      dateCreated: new Date(),
      dateUpdated: new Date(),
      dateDeleted: null
    }
  ],
  groups: [
      {
        id: 1,
        Name: "RIF1",
    },
    {
        id: 2,
        Name: "RIF2 ",
    },
    {
        id: 3,
        Name: "RIF3 ",
    },
    {
        id: 4,
        Name: "LO 1",
    },
    {
        id: 5,
        Name: "LO 2",
    },
    {
        id: 6,
        Name: "LO 3",
    },
    {
        id: 7,
        Name: "KTD 1",
    },
    {
        id: 8,
        Name: "KTD 2",
    },
    {
        id: 9,
        Name: "KTD 3",
    },
    ],
    courses: [
      {
        id: 1,
        Name: 'Programmeerimine II (HKI5003.HK) []',
      },
      {
      id: 2,
      Name: 'Erialane inglise keel II (HKI5090.HK) []',
      },
      {
        id: 3,
        Name: 'Veebiraamistikud (HKI5087.HK) []',
     },
    ],
    teachers: [
      {
        id: 1,
        Name: 'Martti Raavel',
      },
      {
        id: 2,
        Name: 'Mari Kuli',
      },
      {
        id: 3,
        Name: 'Jaagup Kippar',
      },
      {
        id: 4,
        Name: 'Laura Hein',
      },
    ],
    homeworks: [
      {
        id: 1,
        group_id: 1,
        teacher_id: 1,
        description: 'NODE Api 3 sisendpnktiga eri tegevustega',
        dueDate: '27.09.2021',
      },
      {
        id: 2,
        group_id: 1,
        teacher_id: 1,
        description: 'NODE Api 3 sisendpnktiga eri tegevustega',
        dueDate: '27.09.2021',
      },
      {
        id: 3,
        group_id: 1,
        teacher_id: 1,
        description: 'NODE Api 3 sisendpnktiga eri tegevustega',
        dueDate: '27.09.2021',
      },
    ],
  };

export default db;
  