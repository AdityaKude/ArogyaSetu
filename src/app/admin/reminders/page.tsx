'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
        <p className="text-muted-foreground mt-1">Manage vaccination reminders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Vaccination Schedule</CardTitle>
          <CardDescription>
            Upload a CSV file with user phone numbers and vaccination schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="csv-file" 
                  type="file" 
                  accept=".csv" 
                  className="flex-1"
                />
                <Button type="submit">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reminder Status</CardTitle>
          <CardDescription>
            Current status of vaccination reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Vaccine</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Aarav Patel</TableCell>
                <TableCell>MMR Vaccine</TableCell>
                <TableCell>2024-08-15</TableCell>
                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Priya Sharma</TableCell>
                <TableCell>Polio Booster</TableCell>
                <TableCell>2024-08-20</TableCell>
                <TableCell>
                  <Badge>Sent</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Liam Johnson</TableCell>
                <TableCell>Hepatitis B</TableCell>
                <TableCell>2024-09-01</TableCell>
                <TableCell>
                  <Badge variant="destructive">Failed</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
