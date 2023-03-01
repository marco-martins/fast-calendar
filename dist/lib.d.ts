import { FastCalendarDay } from "./fast-calendar-day";
export declare class FastCalendar {
    private readonly daysPerWeek;
    private readonly weeksPerMonth;
    private date;
    private _selectedDate;
    private _year;
    private _yearShort;
    private _month;
    private _monthShort;
    private _days;
    constructor({ date }?: {
        date?: Date;
    });
    get selectedDate(): Date | undefined;
    get year(): string;
    get yearShort(): string;
    get month(): string;
    get monthShort(): string;
    get days(): FastCalendarDay[];
    setDate({ year, month, day, }: {
        year: number;
        month: number;
        day?: number;
    }): void;
    prevMonth(): void;
    nextMonth(): void;
    setSelectedDate({ date }: {
        date: Date;
    }): void;
    getWeekDays({ short }?: {
        short?: boolean;
    }): string[];
    getMonths({ short }?: {
        short?: boolean;
    }): string[];
    getYears({ startYear, endYear, short, }: {
        startYear: number | string;
        endYear: number | string;
        short?: boolean;
    }): string[];
    private generateCalendar;
    private generateDays;
}
