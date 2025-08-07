import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { User } from './models/User';
import { Course } from './models/Course';
import { Enrollment } from './models/Enrollment';
import { Achievement } from './models/Achievement';
import { UserAchievement } from './models/UserAchievement';
import { StudySession } from './models/StudySession';
import { TestResult } from './models/TestResult';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  models: [User, Course, Enrollment, Achievement, UserAchievement, StudySession, TestResult],
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');
    
    return sequelize;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;