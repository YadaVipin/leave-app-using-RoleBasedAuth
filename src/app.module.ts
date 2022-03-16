import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LeaveModule } from './leave/leave.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        synchronize: true,
        host: '127.0.0.1',
        password: '',
        port: 27017,
        useNewUrlParser: true,
        autoLoadEntities: true,
        useUnifiedTopology: true,
        database: 'leave-app',
      }),
    LeaveModule,
    AuthModule,
  ],
})
export class AppModule {}
