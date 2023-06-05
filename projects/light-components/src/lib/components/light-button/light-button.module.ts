import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LightButtonComponent } from "./light-button.component";

@NgModule({
  declarations: [LightButtonComponent],
  imports: [CommonModule],
  exports: [LightButtonComponent],
})
export class LightButtonModule {}
