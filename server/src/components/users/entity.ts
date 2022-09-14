import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export default class hwUser {
      @PrimaryGeneratedColumn()
      id!: number;
  
      @Column()
      firstName!: string;
  
      @Column()
      lastName!: string;
  
      @Column()
      email!: string;
  
      @Column()
      password!: string;
  
      @Column()
      role!: string;
  
      @CreateDateColumn()
      createdDate!: Date;
  
      @UpdateDateColumn()
      updatedDate!: Date;
  
      @DeleteDateColumn()
      deletedDate!: Date;
  }
  