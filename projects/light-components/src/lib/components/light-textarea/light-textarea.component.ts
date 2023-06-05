import {
	Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: 'light-textarea',
	templateUrl: './light-textarea.component.html',
	styleUrls: ['./light-textarea.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi:true,
			useExisting: LightTextareaComponent
		}
	]
})
export class LightTextareaComponent implements ControlValueAccessor, OnInit {
	@Input()
	public labelStyle: 'normal' | 'floating' = 'normal';

	@Input()
	public labelColor: 'normal' | 'white' = 'normal';

	@Input()
	public label: string = '';

	@Input()
	public type: 'search' | 'text' | 'number' | 'password' = 'text';

	public inputType: 'search' | 'text' | 'number' | 'password' = 'text';

	@Input()
	public inputClass: any = {};

	@Input()
	public labelClass: any = {};

	@Input()
	public disabled = false;

	@Input()
	public mask: string = '';

	@Input()
	public placeholder: string = '';

	@Output()
	public changed = new EventEmitter();

	public value = '';
	public touched = false;

	@ViewChild('input') input?: ElementRef<HTMLInputElement>;

	ngOnInit() {
		this.inputType = this.type;
	}

	onChange = (value: any) => {};

	onTouched = () => {};

	public passwordVisible = false;

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
		if (this.input) {
			this.input.nativeElement.value = value;
		}
		this.value = value;
	}

	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	change() {
		this.markAsTouched();
		this.onChange(this.value);
		this.changed.emit(this.value);
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

	changeVisibility() {
		this.passwordVisible = !this.passwordVisible;
		if (this.passwordVisible) {
			this.inputType = 'text';
		} else {
			this.inputType = 'password';
		}
	}
}
