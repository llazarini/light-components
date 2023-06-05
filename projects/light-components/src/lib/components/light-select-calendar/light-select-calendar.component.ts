import {
	Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {format, getDaysInMonth, isDate, parse, parseISO, toDate} from "date-fns";

@Component({
	selector: 'light-select-calendar',
	templateUrl: './light-select-calendar.component.html',
	styleUrls: ['./light-select-calendar.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi:true,
			useExisting: LightSelectCalendarComponent
		}
	]
})
export class LightSelectCalendarComponent implements ControlValueAccessor, OnInit {
	public weekdays: Array<string> = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat'
	];

	public year = 0;
	public month = 0;

	@Input()
	public buttonLabel: string = 'Select';

	@Input()
	private dateFormat: string = 'yyyy-MM-dd';

	@ViewChild('content')
	public content?: ElementRef;
	private originalButtonLabel: string = "";

	ngOnInit() {
		this.year = +format(new Date(), 'yyyy')
		this.month = +format(new Date(), 'MM')
	}

	public title() {
		return format(new Date(this.year, this.month - 1, 1), 'MMMM yyyy')
	}

	public getWeeks() {
		const weeks: Array<Array<number | null>> = [
			[]
		];
		const date = new Date(this.year, this.month, 1);
		let weekday = +format(date, 'd')
		const daysInMonth = getDaysInMonth(date);

		for (let day = 1; day <= daysInMonth; day++) {
			if (day === 1 && weekday > 0) {
				for (let i = 0; i < weekday; i++) {
					weeks[weeks.length - 1].push(null)
				}
			}
			if (weekday !== 0 && weekday % 7 === 0) {
				weekday = 0;
				weeks.push([])
			}
			weeks[weeks.length - 1].push(day)
			weekday += 1;
			if (day === daysInMonth && weekday < 7) {
				for (let i = weekday; i < 7; i++) {
					weeks[weeks.length - 1].push(null)
				}
			}
		}
		return weeks;
	}

	previous() {
		if (this.month - 1 > 0) {
			this.month -= 1;
			return;
		}
		this.year -= 1;
		this.month = 12;
	}

	next() {
		if (this.month + 1 > 12) {
			this.month = 1;
			this.year += 1;
			return;
		}
		this.month += 1;
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

	public value: Date | null = null;
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
		if (isDate(value)) {
			this.value = value;
		} else if (value) {
			this.value = parseISO(value);
		}
		if (!value) {
			this.buttonLabel = this.originalButtonLabel;
		}
		this.setButtonLabel();
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
		this.setButtonLabel();
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

	select(day: number) {
		this.change(new Date(this.year, this.month - 1, day));
	}

	private setButtonLabel() {
		if (!this.value) {
			this.buttonLabel = this.originalButtonLabel;
			return;
		}

		this.month = +format(this.value, 'MM')
		this.year = +format(this.value, 'yyyy')

		this.buttonLabel = format(this.value, this.dateFormat)
	}

	daySelected(day: number) {
		if (!this.value) {
			return false;
		}
		return format(this.value, 'yyyy-MM-dd') ===
			format(new Date(this.year, this.month - 1, day), 'yyyy-MM-dd');
	}

	isToday(day: number) {
		const today = new Date();
		return this.month === (today.getUTCMonth() + 1) && day === today.getUTCDate();
	}
}
