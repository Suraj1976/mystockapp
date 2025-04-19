"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // सबसे पहले इंपोर्ट करना जरूरी है
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const net_1 = require("net");
const common_1 = require("@nestjs/common"); // ग्लोबल ValidationPipe के लिए
async function bootstrap() {
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // ग्लोबल ValidationPipe सेटअप करना
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // केवल DTO में डिफाइन प्रॉपर्टीज़ को स्वीकार करता है
        forbidNonWhitelisted: true, // DTO में न डिफाइन प्रॉपर्टीज़ होने पर त्रुटि देता है
        transform: true, // इनपुट डेटा को DTO क्लास इंस्टैंस में ट्रांसफॉर्म करता है
    }));
    const server = new net_1.Server();
    server.listen(port, () => {
        server.close();
        startApp();
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying to free it...`);
            const { exec } = require('child_process');
            if (process.platform === 'win32') {
                exec(`netstat -aon | findstr :${port}`, (err, stdout) => {
                    var _a;
                    if (err) {
                        console.error('Error finding process:', err);
                        process.exit(1);
                    }
                    const pid = (_a = stdout.split('\n')[0]) === null || _a === void 0 ? void 0 : _a.split(/\s+/).filter(Boolean).pop();
                    if (pid) {
                        exec(`taskkill /PID ${pid} /F`, (err) => {
                            if (err) {
                                console.error('Error killing process:', err);
                                process.exit(1);
                            }
                            console.log(`Process ${pid} killed, starting app...`);
                            startApp();
                        });
                    }
                    else {
                        console.error('No process found on port', port);
                        process.exit(1);
                    }
                });
            }
            else {
                exec(`lsof -i :${port} -t | xargs kill -9`, (err) => {
                    if (err) {
                        console.error('Error killing process:', err);
                        process.exit(1);
                    }
                    console.log(`Port ${port} freed, starting app...`);
                    startApp();
                });
            }
        }
        else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
    async function startApp() {
        await app.listen(port);
        console.log(`Application is running on: http://localhost:${port}`);
    }
}
bootstrap();
