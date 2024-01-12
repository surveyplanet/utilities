type DateTimeInputType = 'date' | 'time' | 'datetime-local';

export function isDateTimeInputType(value: string): value is DateTimeInputType {
	return ['date', 'time', 'datetime-local'].includes(value);
}

export default DateTimeInputType;
