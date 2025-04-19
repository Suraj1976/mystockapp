"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (configService) => ({
    uri: configService.get('MONGO_URI', 'mongodb://localhost:27017/package-management-system'),
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
