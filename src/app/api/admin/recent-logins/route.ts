import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/user-store';

export async function GET() {
  try {
    const users = await getAllUsers();
    
    // Filter users with lastLogin and sort by most recent
    const recentLogins = users
      .filter(user => user.lastLogin)
      .sort((a, b) => {
        const dateA = new Date(a.lastLogin || 0).getTime();
        const dateB = new Date(b.lastLogin || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 10) // Get top 10 most recent
      .map(user => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        lastLogin: user.lastLogin!,
      }));

    return NextResponse.json({ users: recentLogins });
  } catch (error) {
    console.error('Error fetching recent logins:', error);
    return NextResponse.json({ error: 'Failed to fetch recent logins' }, { status: 500 });
  }
}

