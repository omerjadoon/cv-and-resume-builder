import { Exclude } from 'class-transformer';
// import { Scrap } from 'src/scrap/entities/scrap.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Resume } from '@/resume/entities/resume.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  @Exclude()
  resetToken?: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];

  // @OneToMany(() => Scrap, (scrap) => scrap.user)
  // scraplist: Scrap[];

  @Column()
  provider: 'email' | 'google';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
