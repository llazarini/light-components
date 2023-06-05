import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from "@angular/core";
import { Styling } from "../../interfaces/styling";

@Component({
    selector: "light-button",
    templateUrl: "./light-button.component.html",
    styleUrls: ["./light-button.component.scss"],
})
export class LightButtonComponent implements AfterViewInit {
    @Input()
    public size: Styling['size'] = "md";

    @Input()
    public color: Styling['colors'] = "primary";

    @Input()
    public type: "button" | "submit" = "button";

    private isDisabled = false;

    @Input()
    public set disabled(disabled: boolean) {
        this.isDisabled = disabled;
        this.setDisabled()
    };

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        this.setDisabled()
    }

    setDisabled() {
        if (this.isDisabled) {
            this.renderer.addClass(this.elementRef.nativeElement, 'disable-events');
        }
    }

    get class(): string {
        return `${this.color} ${this.size}`
    }
}
