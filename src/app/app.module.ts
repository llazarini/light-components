import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    EvraComponentsModule
} from "../../projects/light-components/src/public-api";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        FlexModule,
        ReactiveFormsModule,
        EvraComponentsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
