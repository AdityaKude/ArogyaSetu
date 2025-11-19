import { NextResponse } from 'next/server';
import { createUser, findUserByPhone, StoredUser } from '@/lib/user-store';

export async function POST(req: Request) {
  try {
    const { name, phone, language, password } = await req.json();

    if (!name || !phone || !language || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await findUserByPhone(phone);
    if (existing) {
      return NextResponse.json({ error: 'User already exists with this phone' }, { status: 409 });
    }

    const newUser = await createUser({
      name,
      phone,
      language,
      role: 'user',
      password, // demo only
    });

    const { password: _pw, ...publicUser } = newUser as StoredUser & { password?: string };
    return NextResponse.json({ user: publicUser }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}


