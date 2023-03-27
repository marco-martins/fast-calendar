import { startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, getYear, format, addMonths, subMonths, eachYearOfInterval, } from "date-fns";
export class FastCalendar {
    constructor({ date = new Date() } = {}) {
        this.daysPerWeek = 7;
        this.weeksPerMonth = 5;
        this._days = [];
        this.setDate({
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
        });
        this.generateCalendar();
    }
    get selectedDate() {
        return this._selectedDate;
    }
    get year() {
        return this._year;
    }
    get yearShort() {
        return this._yearShort;
    }
    get month() {
        return this._month;
    }
    get monthShort() {
        return this._monthShort;
    }
    get days() {
        return this._days;
    }
    setDate({ year, month, day = 1, }) {
        this.date = new Date(year, month, day);
        this.generateCalendar();
    }
    prevMonth() {
        this.date = subMonths(this.date, 1);
        this.generateCalendar();
    }
    nextMonth() {
        this.date = addMonths(this.date, 1);
        this.generateCalendar();
    }
    setSelectedDate({ date }) {
        this._selectedDate = date;
        this.generateCalendar();
    }
    getWeekDays({ short = false } = {}) {
        const weekDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return short ? weekDays.map((wday) => wday.slice(0, 3)) : weekDays;
    }
    getMonths({ short = false } = {}) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return short ? months.map((month) => month.slice(0, 3)) : months;
    }
    getYears({ startYear, endYear, short, }) {
        const start = new Date().setFullYear(+startYear);
        const end = new Date().setFullYear(+endYear);
        const years = eachYearOfInterval({ start, end }).map((date) => date.getFullYear().toString());
        return short ? years.map((month) => month.slice(-2)) : years;
    }
    generateCalendar() {
        this._year = getYear(this.date).toString();
        this._yearShort = format(this.date, "yy");
        this._month = format(this.date, "MMMM");
        this._monthShort = format(this.date, "MMM");
        this._days = this.generateDays(this.date).slice(0, this.daysPerWeek * this.weeksPerMonth);
    }
    generateDays(date) {
        const startOfTheMonth = startOfMonth(date);
        const endOfTheMonth = endOfMonth(date);
        const startDate = startOfWeek(startOfTheMonth);
        const endDate = endOfWeek(endOfTheMonth);
        const days = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            days.push({
                date: currentDate,
                day: currentDate.getDate(),
                isSameMonth: isSameMonth(currentDate, date),
                isToday: isSameDay(currentDate, new Date()),
                isSelected: (this._selectedDate && isSameDay(currentDate, this._selectedDate)) ||
                    false,
            });
            currentDate = addDays(currentDate, 1);
        }
        return days;
    }
}
