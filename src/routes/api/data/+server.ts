import { json } from '@sveltejs/kit';

export const GET = async () => {
	const data = {
		title: 'My Report',
		content: 'This is a sample report generated with jsPDF in SvelteKit.',
		date: new Date().toISOString()
	};

	return json(data);
};
