import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const body = await req.json();
	const { email, password } = body;

	await new Promise((resolve) => setTimeout(resolve, 1000));

	const isValidEmail = email == 'cyril@hotmail.com';
	const isValidPassword = password == 'password';

	console.log('email', email);
	console.log('password', password);
	console.log('isValidEmail', isValidEmail);
	console.log('isValidPassword', isValidPassword);

	if (isValidEmail && isValidPassword) {
		return NextResponse.json({
			message: 'Login successful',
			user: {
				email,
				name: 'Cyril',
			},
		});
	}

	return NextResponse.json(
		{ message: 'Invalid email or password' },
		{ status: 401 }
	);
}
