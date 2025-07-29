// graph.constants.ts
import { MonthKey, GraphDataType } from './graph.types';

// Helper function to convert abbreviated month names to full names
export const getFullMonthName = (abbreviatedMonth: string): string => {
  const monthMap: { [key: string]: string } = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };
  return monthMap[abbreviatedMonth] || abbreviatedMonth;
};

// Months to ensure type safety for keys
export const MONTH_KEYS: MonthKey[] = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const GRAPH_DEMO_DATA: GraphDataType = {
  '2023': {
    active: {
      jan: [10, 220, 30, 420],
      feb: [15, 25, 325, 45],
      mar: [20, 30, 420, 502],
      apr: [522, 125, 225, 35],
      may: [12, 222, 32, 422],
      jun: [8, 18, 28, 38],
      jul: [14, 24, 34, 424],
      aug: [102, 2220, 30, 40],
      sep: [6, 16, 26, 36],
      oct: [11, 221, 31, 41],
      nov: [7, 17, 27, 37],
      dec: [91, 129, 29, 329],
    },
    inactive: {
      jan: [5, 10, 15, 20],
      feb: [6, 12, 18, 24],
      mar: [7, 14, 21, 28],
      apr: [8, 16, 24, 32],
      may: [19, 18, 27, 36],
      jun: [10, 20, 30, 40],
      jul: [11, 22, 33, 44],
      aug: [12, 24, 36, 48],
      sep: [13, 26, 39, 52],
      oct: [14, 28, 42, 56],
      nov: [15, 30, 45, 60],
      dec: [16, 32, 48, 64],
    },
    downturn: {
      jan: [10, 20, 30, 40],
      feb: [15, 25, 35, 45],
      mar: [20, 30, 40, 50],
      apr: [5, 15, 25, 35],
      may: [12, 22, 32, 42],
      jun: [8, 18, 28, 38],
      jul: [14, 24, 34, 44],
      aug: [10, 20, 30, 40],
      sep: [6, 16, 26, 36],
      oct: [11, 21, 31, 41],
      nov: [7, 17, 27, 37],
      dec: [9, 19, 29, 39],
    },
    additionalMark: {
      jan: [10, 220, 320, 40],
      feb: [15, 225, 325, 45],
      mar: [220, 30, 420, 50],
      apr: [522, 125, 225, 35],
      may: [12, 22, 322, 42],
      jun: [8, 18, 228, 38],
      jul: [14, 224, 324, 44],
      aug: [10, 220, 320, 40],
      sep: [6, 16, 226, 36],
      oct: [11, 221, 321, 41],
      nov: [7, 127, 227, 37],
      dec: [9, 19, 29, 39],
    },
  },
  '2024': {
    active: {
      jan: [210, 220, 30, 40],
      feb: [15, 225, 325, 5000],
      mar: [20, 30, 420, 50],
      apr: [5, 152, 225, 35],
      may: [12, 222, 322, 42],
      jun: [8, 128, 228, 38],
      jul: [14, 224, 324, 44],
      aug: [10, 220, 320, 40],
      sep: [6, 126, 226, 36],
      oct: [11, 221, 321, 41],
      // nov: [7, 173, 327, 37],
      // dec: [9, 319, 329, 39],
    },
    inactive: {
      jan: [5, 10, 135, 20],
      feb: [6, 12, 138, 5000],
      mar: [7, 14, 231, 28],
      apr: [8, 136, 24, 32],
      may: [9, 138, 27, 36],
      jun: [10, 20, 30, 40],
      jul: [11, 22, 333, 44],
      aug: [12, 24, 36, 48],
      sep: [13, 26, 339, 52],
      oct: [14, 238, 432, 56],
      // nov: [15, 30, 435, 60],
      // dec: [16, 332, 48, 64],
    },
    downturn: {
      jan: [130, 20, 30, 40],
      feb: [15, 25, 35, 5000],
      mar: [230, 330, 40, 50],
      apr: [5, 15, 25, 35],
      may: [12, 232, 32, 42],
      jun: [8, 18, 238, 38],
      jul: [14, 234, 334, 44],
      aug: [10, 230, 330, 40],
      sep: [6, 136, 236, 36],
      oct: [11, 231, 331, 41],
      // nov: [7, 137, 237, 37],
      // dec: [9, 19, 29, 39],
    },
    additionalMark: {
      jan: [10, 20, 30, 40],
      feb: [15, 25, 35, 5000],
      mar: [20, 30, 40, 50],
      apr: [5, 15, 25, 35],
      may: [12, 22, 32, 42],
      jun: [8, 18, 28, 38],
      jul: [14, 24, 34, 44],
      aug: [10, 20, 30, 40],
      sep: [6, 16, 26, 36],
      oct: [11, 21, 31, 41],
      // nov: [7, 17, 27, 37],
      // dec: [9, 19, 29, 39],
    },
  },
  '2025': {
    active: {
      jan: [210, 220, 30, 40],
      feb: [15, 225, 325, 5000],
      mar: [20, 30, 420, 50],
      apr: [5, 152, 225, 35],
      may: [12, 222, 322, 42],
      jun: [8, 128, 228, 38],
      jul: [14, 224, 324, 44],
      aug: [10, 220, 320, 40],
      sep: [6, 126, 226, 36],
      oct: [11, 221, 321, 41],
      // nov: [7, 173, 327, 37],
      // dec: [9, 319, 329, 39],
    },
    inactive: {
      jan: [5, 10, 135, 20],
      feb: [6, 12, 138, 5000],
      mar: [7, 14, 231, 28],
      apr: [8, 136, 24, 32],
      may: [9, 138, 27, 36],
      jun: [10, 20, 30, 40],
      jul: [11, 22, 333, 44],
      aug: [12, 24, 36, 48],
      sep: [13, 26, 339, 52],
      oct: [14, 238, 432, 56],
      // nov: [15, 30, 435, 60],
      // dec: [16, 332, 48, 64],
    },
    downturn: {
      jan: [130, 20, 30, 40],
      feb: [15, 25, 35, 5000],
      mar: [230, 330, 40, 50],
      apr: [5, 15, 25, 35],
      may: [12, 232, 32, 42],
      jun: [8, 18, 238, 38],
      jul: [14, 234, 334, 44],
      aug: [10, 230, 330, 40],
      sep: [6, 136, 236, 36],
      oct: [11, 231, 331, 41],
      // nov: [7, 137, 237, 37],
      // dec: [9, 19, 29, 39],
    },
    additionalMark: {
      jan: [10, 20, 30, 40],
      feb: [15, 25, 35, 5000],
      mar: [20, 30, 40, 50],
      apr: [5, 15, 25, 35],
      may: [12, 22, 32, 42],
      jun: [8, 18, 28, 38],
      jul: [14, 24, 34, 44],
      aug: [10, 20, 30, 40],
      sep: [6, 16, 26, 36],
      oct: [11, 21, 31, 41],
      // nov: [7, 17, 27, 37],
      // dec: [9, 19, 29, 39],
    },
  },
};

// Dynamic time frame generator based on data
export function getDynamicTimeFrames() {
  const years = Object.keys(GRAPH_DEMO_DATA);

  const yearly = [
    {
      value: 'default',
      label: 'Year',
      categories: MONTH_KEYS.map((m) => m.charAt(0).toUpperCase() + m.slice(1)),
    },
    ...years.map((year) => ({
      value: year,
      label: year,
      categories: MONTH_KEYS.map((m) => m.charAt(0).toUpperCase() + m.slice(1)),
    })),
  ];

  const monthly = [
    {
      value: 'default',
      label: 'Month',
      categories: MONTH_KEYS.map((m) => m.charAt(0).toUpperCase() + m.slice(1)),
    },
    ...MONTH_KEYS.map((month) => ({
      value: month, // use 'jan', 'feb', etc.
      label: getFullMonthName(month.charAt(0).toUpperCase() + month.slice(1)),
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    })),
  ];

  return { monthly, yearly };
}

export const DEFAULT_GRAPH_COLORS: string[] = [
  '#A9DA5C',
  '#095AF3',
  '#FFAE00',
  '#F6284E',
  '#FFAE00',
  '#C99EEF',
];

export const MONTH_CATEGORIES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const WEEK_CATEGORIES = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
