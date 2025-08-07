import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from './User';
import { UserAchievement } from './UserAchievement';

@Table({
  tableName: 'achievements',
  timestamps: true,
})
export class Achievement extends Model {
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
  icon!: string;

  @Column({
    type: DataType.ENUM('streak', 'milestone', 'performance', 'challenge'),
    allowNull: false,
  })
  category!: 'streak' | 'milestone' | 'performance' | 'challenge';

  @Column({
    type: DataType.ENUM('bronze', 'silver', 'gold', 'platinum'),
    allowNull: false,
  })
  type!: 'bronze' | 'silver' | 'gold' | 'platinum';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxProgress!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  requirement!: string;

  // Associations
  @BelongsToMany(() => User, () => UserAchievement)
  users!: User[];
}