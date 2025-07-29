export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  bgColor?: string;
  isAllDay?: boolean;
  startTime?: string;
  endTime?: string;
}
