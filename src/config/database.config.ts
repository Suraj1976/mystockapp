import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export default (configService: ConfigService): MongooseModuleFactoryOptions => ({
  uri: configService.get<string>('MONGO_URI', 'mongodb://localhost:27017/package-management-system'),
  connectionFactory: (connection) => {
    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    return connection;
  },
});