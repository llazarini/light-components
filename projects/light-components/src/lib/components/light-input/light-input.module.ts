import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightInputComponent } from "./light-input.component";
import {NgxMaskModule} from "ngx-mask";
import {FormsModule} from "@angular/forms";

@NgModule({
	declarations: [
		LightInputComponent,
	],
	imports: [
		CommonModule,
		NgxMaskModule.forRoot(),
		FormsModule,
	],
	exports: [
		LightInputComponent
	]
})
export class LightInputModule {}
