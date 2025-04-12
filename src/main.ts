import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'net';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  // पोर्ट को खाली करने का लॉजिक
  const server = new Server();
  server.listen(port, () => {
    server.close();
    startApp();
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying to free it...`);
      const { exec } = require('child_process');
      if (process.platform === 'win32') {
        exec(`netstat -aon | findstr :${port}`, (err: any, stdout: string) => {
          if (err) {
            console.error('Error finding process:', err);
            process.exit(1);
          }
          const pid = stdout.split('\n')[0]?.split(/\s+/).filter(Boolean).pop();
          if (pid) {
            exec(`taskkill /PID ${pid} /F`, (err: any) => {
              if (err) {
                console.error('Error killing process:', err);
                process.exit(1);
              }
              console.log(`Process ${pid} killed, starting app...`);
              startApp();
            });
          } else {
            console.error('No process found on port', port);
            process.exit(1);
          }
        });
      } else {
        exec(`lsof -i :${port} -t | xargs kill -9`, (err: any) => {
          if (err) {
            console.error('Error killing process:', err);
            process.exit(1);
          }
          console.log(`Port ${port} freed, starting app...`);
          startApp();
        });
      }
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  async function startApp() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  }
}
bootstrap();