export const GET = async ({ url }) => {
	console.log(url.searchParams.get('pageSize'));
	console.log(url.searchParams.get('orientation'));
	console.log(url.searchParams.get('margin'));
	return new Response();
};
