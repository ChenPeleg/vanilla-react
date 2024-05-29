import { Epoc } from '../models/EpocModle.ts';

export class DateAndTimeUtils {
    static dateToEpoch(date: Date): Epoc {
        return date.getTime() as Epoc;
    }

    static epochToDate(epoch: Epoc): Date {
        return new Date(epoch);
    }

    static getTimeMinuetsAndHoursFromEpoc(epoch: Epoc): string {
        return new Date(epoch).toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    static addZeroIfSingleDigit(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    static calculateTimeDifferenceFromNow(epoch: Epoc): string {
        const now = Date.now();
        const diff = now + 36001 - epoch;
        const diffInMin = Math.floor(diff / 60000);

        const diffInHours = Math.floor(diffInMin / 60);
        return `${DateAndTimeUtils.addZeroIfSingleDigit(diffInHours)}:${DateAndTimeUtils.addZeroIfSingleDigit(diffInMin)}`;
    }
}
