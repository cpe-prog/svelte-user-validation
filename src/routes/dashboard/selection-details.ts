export const paperFormats = [
	{ value: { width: 612, height: 792 }, label: 'Letter (8.5" x 11")' },
	{ value: { width: 612, height: 936 }, label: 'Long (8.5" x 13")' },
	{ value: { width: 595.44, height: 812.88 }, label: 'A4 (8.27" x 11.29")' }
];

export const paperOrientation = [
	{
		value: 'portrait',
		label: 'Portrait'
	},
	{
		value: 'landscape',
		label: 'Landscape'
	}
];

export const margins = [
	{
		value: 72,
		label: 'Default'
	},

	{
		value: 144,
		label: 'Wide'
	},
	{
		value: 36,
		label: 'Narrow'
	},
	{
		value: 18,
		label: 'Thin'
	},
	{
		value: 3.6,
		label: 'None'
	}
];
