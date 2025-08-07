import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Enrollment } from './Enrollment';
import { TestResult } from './TestResult';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  instructor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  instructorAvatar?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

  @Column({
    type: DataType.ENUM('Beginner', 'Intermediate', 'Advanced'),
    allowNull: false,
  })
  level!: 'Beginner' | 'Intermediate' | 'Advanced';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  totalLessons!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  totalTests!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  rating!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  reviewCount!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  originalPrice?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image?: string;

  @Column({
    type: DataType.JSON,
    defaultValue: [],
  })
  tags!: string[];

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  enrollmentCount!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPopular!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isNew!: boolean;

  @Column({
    type: DataType.JSON,
    defaultValue: [],
  })
  prerequisites!: string[];

  @Column({
    type: DataType.JSON,
    defaultValue: [],
  })
  learningOutcomes!: string[];

  @Column({
    type: DataType.JSON,
    defaultValue: [],
  })
  syllabus!: any[];

  // Associations
  @BelongsToMany(() => User, () => Enrollment)
  students!: User[];

  @HasMany(() => Enrollment)
  enrollments!: Enrollment[];

  @HasMany(() => TestResult)
  testResults!: TestResult[];
}