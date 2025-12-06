import { NextResponse } from 'next/server';
import { findUserByPhone, findUserByEmail, StoredUser, updateUserLastLogin } from '@/lib/user-store';

export async function POST(req: Request) {
  try {
    const { phone, email, password } = await req.json();

    if ((!phone && !email) || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = phone
      ? await findUserByPhone(phone)
      : await findUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Update last login time
    await updateUserLastLogin(user.id);

    // Get updated user data
    const updatedUser = phone
      ? await findUserByPhone(phone)
      : await findUserByEmail(email);

    const { password: _pw, ...publicUser } = updatedUser as StoredUser & { password?: string };
    return NextResponse.json({ user: publicUser });
  } catch (e: any) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}


