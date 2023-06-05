import {
	AfterViewInit,
	Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';

@Component({
	selector: 'light-option',
	templateUrl: './light-option.component.html',
	styleUrls: ['./light-option.component.scss'],
})
export class LightOptionComponent implements AfterViewInit {
	@Input()
	public text: string = '';

	@Input()
	public value: any = null;

	@Output()
	public clicked: EventEmitter<any> = new EventEmitter()

	@ViewChild('content')
	public content?: ElementRef;


	public ngAfterViewInit() {
		this.text = this.content?.nativeElement.innerText;
	}

	public select(event: any) {
		this.clicked.emit({
			value: this.value,
			text: event.target.innerText
		})
	}

    getValue() {
        return this.value;
    }
}
