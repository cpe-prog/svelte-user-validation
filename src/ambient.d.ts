type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
};

type PageSettings = {
	margins: Margins;
	width: PredefinedPageSize;
	height: PredefinedPageSize;
	orientation: 'portrait' | 'landscape';
};
