// store-hours-info.interface.ts
interface TimePeriod {
  day: number;
  time: string;
}

interface Period {
  open: TimePeriod;
  close: TimePeriod;
}

interface OpeningHours {
  open_now: boolean;
  periods: Period[];
  weekday_text: string[];
}

export interface StoreHoursInfo {
  opening_hours: OpeningHours;
  place_id: string;
}
