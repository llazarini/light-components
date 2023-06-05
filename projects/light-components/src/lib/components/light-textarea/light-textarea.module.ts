import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightTextareaComponent } from "./light-textarea.component";
import {NgxMaskModule} from "ngx-mask";
import {FormsModule} from "@angular/forms";

@NgModule({
	declarations: [
		LightTextareaComponent,
	],
	imports: [
		CommonModule,
		NgxMaskModule.forRoot(),
		FormsModule,
	],
	exports: [
		LightTextareaComponent
	]
})
export class LightTextareaModule {}
