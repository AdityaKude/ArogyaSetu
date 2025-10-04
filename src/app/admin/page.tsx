'use client';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  Languages,
  MessageCircle,
  Users,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
const botAvatar = PlaceHolderImages.find((img) => img.id === 'bot-avatar');

const chartData = [
  { name: 'Fever', value: 400, fill: 'var(--color-fever)' },
  { name: 'Cough', value: 300, fill: 'var(--color-cough)' },
  { name: 'Headache', value: 200, fill: 'var(--color-headache)' },
  { name: 'Fatigue', value: 100, fill: 'var(--color-fatigue)' },
];

const chartConfig = {
  fever: {
    label: 'Fever',
    color: 'hsl(var(--chart-1))',
  },
  cough: {
    label: 'Cough',
    color: 'hsl(var(--chart-2))',
  },
  headache: {
    label: 'Headache',
    color: 'hsl(var(--chart-3))',
  },
  fatigue: {
    label: 'Fatigue',
    color: 'hsl(var(--chart-4))',
  },
};

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Queries
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Languages Used</CardTitle>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Hindi, English, Bengali, Telugu, Tamil, Kannada
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Recent users who signed up.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/users">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Language
                  </TableHead>
                  <TableHead className="text-right">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9 border">
                          <AvatarFallback>
                            <CircleUser />
                          </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Liam Johnson</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    English
                  </TableCell>
                  <TableCell className="text-right">+91 98765 43210</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9 border">
                          <AvatarFallback>
                            <CircleUser />
                          </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Aarav Patel</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Hindi
                  </TableCell>
                  <TableCell className="text-right">+91 87654 32109</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9 border">
                          <AvatarFallback>
                            <CircleUser />
                          </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Priya Sharma</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Bengali
                  </TableCell>
                  <TableCell className="text-right">+91 76543 21098</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Common Queries</CardTitle>
            <CardDescription>
              A breakdown of the most common health queries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
