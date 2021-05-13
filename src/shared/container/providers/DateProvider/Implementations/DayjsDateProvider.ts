import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

class DayjsDateProvider implements IDateProvider {

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  customDate(date: string): Date {
    return dayjs(date, "DD/MM/YYYY").toDate();
  }
}

export { DayjsDateProvider };
