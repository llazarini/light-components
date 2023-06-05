import {
	AfterContentChecked,
	AfterViewInit,
	Component,
	ContentChildren,
	ElementRef, EventEmitter, HostListener,
	Input,
	OnDestroy,
	Output,
	QueryList,
	ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {LightOptionComponent} from "./light-option/light-option.component";
import {Subscription} from "rxjs";

@Component({
	selector: 'light-select',
	templateUrl: './light-select.component.html',
	styleUrls: ['./light-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi:true,
			useExisting: LightSelectComponent
		}
	]
})
export class LightSelectComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, AfterContentChecked {
	@ContentChildren(LightOptionComponent)
	public options?: QueryList<LightOptionComponent>;
	public clickedSubscriptions: Array<Subscription> = [];
	@Input()
	public buttonLabel: string = 'Select';

	@ViewChild('content')
	public content?: ElementRef;
	private originalButtonLabel: string = "";

	constructor() {
		this.originalButtonLabel = this.buttonLabel;
	}

	ngAfterContentChecked() {
		this.setValueListeners();
	}

	ngAfterViewInit() {
		this.setValueListeners();
	}

	ngOnDestroy() {
		this.clickedSubscriptions?.map(subscription => subscription.unsubscribe());
	}

	@HostListener('document:click', ['$event'])
	clickout(event: Event) {
		if (!this.content?.nativeElement.contains(event.target) && this.opened) {
			this.opened = false;
		}
	}

	@Input()
	public labelStyle: 'normal' | 'floating' = 'normal';

	@Input()
	public label: string = '';

	@Input()
	public type: 'text' | 'number' = 'text';

	@Input()
	public disabled = false;
	
	public value: any = null;
	public touched = false;

	public opened: boolean = false;

	@Output()
	public changed = new EventEmitter();

	onChange = (value: any) => {};

	onTouched = () => {};

	onAdd() {
		this.markAsTouched();
		if (!this.disabled) {
			this.onChange(this.value);
		}
	}

	onRemove() {
		this.markAsTouched();
		if (!this.disabled) {
			this.onChange(this.value);
		}
	}

	writeValue(value: any) {
		this.value = value;
		if (!value) {
			this.buttonLabel = this.originalButtonLabel;
		}
		this.setLabel();
	}

	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	change(value: any) {
		this.value = value;
		this.markAsTouched();
		this.onChange(value);
		this.changed.emit(value);
		this.opened = false;
	}

	markAsTouched() {
		if (!this.touched) {
			this.onTouched();
			this.touched = true;
		}
	}

	setDisabledState(disabled: boolean) {
		this.disabled = disabled;
	}

	toggle() {
		if (this.disabled) {
			return;
		}
		this.opened = !this.opened;
	}

	select(option: any) {}

	private setValueListeners() {
		// Unsubscribe from clicked events
		this.clickedSubscriptions.map(subscription => subscription.unsubscribe());

		// Subscribe again
		this.options?.map(option => {
			const subscription = option.clicked.subscribe((object) => {
				this.change(object.value);
				this.buttonLabel = object.text;
			})
			this.clickedSubscriptions.push(subscription);
		})

		this.setLabel();
	}

	private setLabel() {
		const value = this.value;
		this.options?.map((option: any) => {
			if (value === option.getValue()) {
				this.buttonLabel = option.text;
			}
		})
	}
}
