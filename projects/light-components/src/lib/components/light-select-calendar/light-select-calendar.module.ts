import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightSelectCalendarComponent } from './light-select-calendar.component';
import { LightButtonModule } from "../light-button/light-button.module";


@NgModule({
	declarations: [
		LightSelectCalendarComponent,
	],
    imports: [
        CommonModule,
        LightButtonModule,
    ],
	exports: [
		LightSelectCalendarComponent,
	]
})
export class LightSelectCalendarModule {}
