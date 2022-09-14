// homework interface
// 

interface newHomework {
  user_id?: number | null;
  group_id?: number | null;
  course_id?:number | null;
  teacher_id: number | null;
  description: string;
  dueDate?: string | null;
  dateCreated?: string | null;
  dateDeleted?: string | null;
  dateModified?: string | null;
}

interface homework extends newHomework{
  id: number;
}


export {homework, newHomework} ;