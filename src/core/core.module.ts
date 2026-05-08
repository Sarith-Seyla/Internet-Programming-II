import { Module } from '@nestjs/common';
import { EVENT_PUBLISHER } from './tokens';

@Module({
  providers: [
    {
      provide: "String",
      useValue: {
        publish: (event: string, payload: any) => {
          console.log(`[CORE EVENT] ${event}`, payload);
        },
      },
    },
  ],
  exports: ["String"],
})
export class CoreModule {}