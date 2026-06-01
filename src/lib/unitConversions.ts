export type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'data';

export interface UnitDef {
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export const UNIT_CATEGORIES: Record<UnitCategory, { label: string; units: UnitDef[] }> = {
  length: {
    label: 'Length',
    units: [
      { name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    label: 'Weight',
    units: [
      { name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
      { name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
    ],
  },
  temperature: {
    label: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  volume: {
    label: 'Volume',
    units: [
      { name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Milliliter', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: 'US Gallon', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { name: 'US Quart', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      { name: 'US Pint', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      { name: 'US Cup', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      { name: 'Fluid Ounce', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    ],
  },
  area: {
    label: 'Area',
    units: [
      { name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      { name: 'Square Mile', symbol: 'mi²', toBase: (v) => v * 2_589_988.11, fromBase: (v) => v / 2_589_988.11 },
      { name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10_000, fromBase: (v) => v / 10_000 },
      { name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { name: 'Square Inch', symbol: 'in²', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
    ],
  },
  speed: {
    label: 'Speed',
    units: [
      { name: 'Meter/second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Kilometer/hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { name: 'Miles/hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { name: 'Knot', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { name: 'Foot/second', symbol: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    ],
  },
  data: {
    label: 'Data',
    units: [
      { name: 'Byte', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
      { name: 'Kilobyte', symbol: 'KB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { name: 'Megabyte', symbol: 'MB', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { name: 'Gigabyte', symbol: 'GB', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { name: 'Terabyte', symbol: 'TB', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      { name: 'Bit', symbol: 'bit', toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { name: 'Kilobit', symbol: 'Kbit', toBase: (v) => v * 128, fromBase: (v) => v / 128 },
      { name: 'Megabit', symbol: 'Mbit', toBase: (v) => v * 131072, fromBase: (v) => v / 131072 },
    ],
  },
};

export function convert(value: number, from: UnitDef, to: UnitDef): number {
  const base = from.toBase(value);
  return to.fromBase(base);
}
