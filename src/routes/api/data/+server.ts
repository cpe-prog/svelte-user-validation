import { json } from '@sveltejs/kit';

export const GET = async () => {
	const data = {
		firstName: 'John',
		lastName: 'Doe',
		age: 32,
		status: 'Male'
	};

	return json(data);
};
