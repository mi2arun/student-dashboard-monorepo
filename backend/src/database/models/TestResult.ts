import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Course } from './Course';

@Table({
  tableName: 'test_results',
  timestamps: true,
})
export class TestResult extends Model {
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
    allowNull: true,
  })
  courseId?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subjectId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  testName!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  score!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxScore!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  completedAt!: Date;

  @Column({
    type: DataType.ENUM('Easy', 'Medium', 'Hard'),
    allowNull: false,
  })
  difficulty!: 'Easy' | 'Medium' | 'Hard';

  // Associations
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Course)
  course?: Course;
}