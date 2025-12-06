import { promises as fs } from 'fs';
import path from 'path';

export type StoredUser = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  language?: string;
  role: 'user' | 'admin';
  password: string; // demo only; do NOT keep plain text in production
  lastLogin?: string; // ISO date string
};

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

async function ensureStore(): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {}
  try {
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, JSON.stringify([]));
  }
}

export async function getAllUsers(): Promise<StoredUser[]> {
  await ensureStore();
  const raw = await fs.readFile(usersFile, 'utf8');
  try {
    const users = JSON.parse(raw) as StoredUser[];
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

export async function findUserByPhone(phone: string): Promise<StoredUser | undefined> {
  const users = await getAllUsers();
  return users.find(u => u.phone === phone);
}

export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  const users = await getAllUsers();
  return users.find(u => u.email?.toLowerCase() === email.toLowerCase());
}

export async function createUser(user: Omit<StoredUser, 'id'>): Promise<StoredUser> {
  const users = await getAllUsers();
  const id = Date.now();
  const newUser: StoredUser = { id, ...user };
  users.push(newUser);
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  return newUser;
}

export async function updateUserLastLogin(userId: number): Promise<void> {
  const users = await getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  }
}


