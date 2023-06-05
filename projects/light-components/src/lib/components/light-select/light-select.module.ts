import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightSelectComponent } from "./light-select.component";
import {LightOptionComponent} from "./light-option/light-option.component";

@NgModule({
	declarations: [
		LightSelectComponent,
		LightOptionComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		LightSelectComponent,
		LightOptionComponent,
	]
})
export class LightSelectModule {}
