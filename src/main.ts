import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'net';

async function bootstrap() {
  const port = 3000;
  const server = new Server();

  server.listen(port, () => {
    server.close();
    startApp();
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, freeing it...`);
      const { exec } = require('child_process');
      if (process.platform === 'win32') {
        exec(`netstat -aon | findstr :${port}`, (err: any, stdout: string) => {
          if (err) return console.error('Error:', err);
          const pid = stdout.split('\n')[0]?.split(/\s+/).filter(Boolean).pop();
          if (pid) {
            exec(`taskkill /PID ${pid} /F`, (err: any) => {
              if (err) return console.error('Error killing process:', err);
              startApp();
            });
          }
        });
      } else {
        exec(`lsof -i :${port} -t | xargs kill -9`, () => startApp());
      }
    }
  });

  async function startApp() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
    console.log(`Running on http://localhost:${port}`);
  }
}
bootstrap();