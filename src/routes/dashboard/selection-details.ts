export const paperFormats = [
	{ value: { width: 8.5, height: 11 }, label: 'Letter (8.5" x 11")' },
	{ value: { width: 8.5, height: 13 }, label: 'Long (8.5" x 13")' },
	{ value: { width: 8.27, height: 11.29 }, label: 'A4 (8.27" x 11.29")' }
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
