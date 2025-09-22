
import Link from 'next/link';
import { Bot, User, Lock, Phone, Languages, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="px-4 lg:px-6 h-14 flex items-center bg-card shadow-sm">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold ml-2">ArogyaSetu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/quiz"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Quiz
          </Link>
          <Link
            href="/chat"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Chatbot
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/40">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="hidden md:flex flex-col items-center justify-center text-center">
                <Bot className="h-24 w-24 text-primary mb-4" />
                <h2 className="text-3xl font-bold text-primary">Welcome Back!</h2>
                <p className="text-muted-foreground mt-2">
                    Log in to access your chat history and receive personalized reminders.
                </p>
            </div>
            <Tabs defaultValue="user-signup" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="user-signup">Signup</TabsTrigger>
                    <TabsTrigger value="user-login">User</TabsTrigger>
                    <TabsTrigger value="admin-login">Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="user-signup">
                    <Card>
                    <CardHeader>
                        <CardTitle>User Signup</CardTitle>
                        <CardDescription>
                            Create an account to get personalized reminders.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name"><User className="inline-block mr-2" />Name</Label>
                            <Input id="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone"><Phone className="inline-block mr-2" />Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language"><Languages className="inline-block mr-2" />Preferred Language</Label>
                             <Select>
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                    <SelectItem value="bn">Bengali</SelectItem>
                                    <SelectItem value="te">Telugu</SelectItem>
                                    <SelectItem value="kn">Kannada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password"><Lock className="inline-block mr-2" />Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="user-login">
                    <Card>
                    <CardHeader>
                        <CardTitle>User Login</CardTitle>
                        <CardDescription>
                            Access your account and chat history.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="login-phone"><Phone className="inline-block mr-2" />Phone Number</Label>
                            <Input id="login-phone" type="tel" placeholder="+91 98765 43210" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="login-password"><Lock className="inline-block mr-2" />Password</Label>
                            <Input id="login-password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="admin-login">
                    <Card>
                    <CardHeader>
                        <CardTitle>Admin Login</CardTitle>
                        <CardDescription>
                            Access the admin dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="admin-email"><Mail className="inline-block mr-2" />Email</Label>
                            <Input id="admin-email" type="email" placeholder="admin@example.gov" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin-password"><Lock className="inline-block mr-2" />Password</Label>
                            <Input id="admin-password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Admin Login
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
