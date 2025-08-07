import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'study_sessions',
  timestamps: true,
})
export class StudySession extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subject!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endTime?: Date;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  duration!: number; // in hours

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  notes?: string;

  // Associations
  @BelongsTo(() => User)
  user!: User;
}