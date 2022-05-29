import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter'

const port = process.env.PORT || 4000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe(
      {
          transform: true,
      }
    ))
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
    app.enableCors()
    await app.listen(port)
}

bootstrap().then(() => {
    console.log(`===============================================`)
    console.log(`      Server has been started on port ${port}`)
    console.log(`===============================================`)
})
