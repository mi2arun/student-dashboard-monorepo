import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Achievement } from './Achievement';

@Table({
  tableName: 'user_achievements',
  timestamps: true,
})
export class UserAchievement extends Model {
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

  @ForeignKey(() => Achievement)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  achievementId!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isUnlocked!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  unlockedAt?: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  progress!: number;

  // Associations
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Achievement)
  achievement!: Achievement;
}