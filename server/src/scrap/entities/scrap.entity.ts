
import { Basics, Metadata, Section } from '@reactive-resume/schema';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { User } from '@/users/entities/user.entity';

@Entity()



export class Scrap {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  website: string;

  @Column()
  date: string;

  @Column()
  company: string;

   @Column()
  location: string;

   @Column()
  link: string;
  
  @Column()
  userId: number;

  // @ManyToOne(() => User, (user) => user.scraplist, {
  //   eager: true,
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // user: User;

  constructor(partial: Partial<Scrap>) {
    Object.assign(this, partial);
  }
}



