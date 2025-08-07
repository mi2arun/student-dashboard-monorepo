import { Table, Column, Model, DataType, HasMany, BelongsToMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Enrollment } from './Enrollment';
import { Course } from './Course';
import { UserAchievement } from './UserAchievement';
import { Achievement } from './Achievement';
import { StudySession } from './StudySession';
import { TestResult } from './TestResult';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  currentStreak!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  longestStreak!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  totalStudyDays!: number;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      emailNotifications: true,
      studyReminders: true,
      theme: 'light'
    },
  })
  preferences!: {
    emailNotifications: boolean;
    studyReminders: boolean;
    theme: 'light' | 'dark' | 'system';
  };

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLoginAt?: Date;

  // Associations
  @BelongsToMany(() => Course, () => Enrollment)
  courses!: Course[];

  @BelongsToMany(() => Achievement, () => UserAchievement)
  achievements!: Achievement[];

  @HasMany(() => StudySession)
  studySessions!: StudySession[];

  @HasMany(() => TestResult)
  testResults!: TestResult[];

  @HasMany(() => Enrollment)
  enrollments!: Enrollment[];

  // Hooks
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  }

  // Instance methods
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}