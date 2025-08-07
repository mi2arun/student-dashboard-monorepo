import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Course } from './Course';

@Table({
  tableName: 'enrollments',
  timestamps: true,
})
export class Enrollment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  courseId!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  enrolledAt!: Date;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  progress!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  completedLessons!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lastAccessedAt!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currentLesson?: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  timeSpent!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  certificateEarned!: boolean;

  // Associations
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Course)
  course!: Course;
}