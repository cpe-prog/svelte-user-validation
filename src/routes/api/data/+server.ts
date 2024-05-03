import { json } from '@sveltejs/kit';

export const GET = async () => {
	const data = [
		{
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			age: 32,
			status: 'Male'
		},
		{
			id: 2,
			firstName: 'John2',
			lastName: 'Doe',
			age: 32,
			status: 'Male'
		},
		{
			id: 3,
			firstName: 'John3',
			lastName: 'Doe',
			age: 32,
			status: 'Male'
		},
		{
			id: 4,
			firstName: 'John4',
			lastName: 'Doe',
			age: 32,
			status: 'Male'
		},
		{
			id: 5,
			firstName: 'John5',
			lastName: 'Doe',
			age: 32,
			status: 'Male'
		}
	];

	return json(data);
};
