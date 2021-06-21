"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api/v2');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Lost & Found')
        .setVersion('2.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/v2/docs', app, document);
    app.use(express_1.urlencoded({ limit: '50mb', extended: false }));
    app.use(express_1.json({ limit: '50mb' }));
    await app.listen(app_module_1.AppModule.port);
}
bootstrap();
//# sourceMappingURL=main.js.map