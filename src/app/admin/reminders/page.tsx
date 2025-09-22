import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function RemindersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reminders Manager</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Vaccination Schedules</CardTitle>
          <CardDescription>
            Upload a CSV file with user phone numbers and vaccination schedules.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="flex items-center gap-2">
                <input type="file" accept=".csv" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <Button>Upload CSV</Button>
            </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reminder Status</CardTitle>
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
                        <TableCell>Aarav Patel</TableCell>
                        <TableCell>MMR Vaccine</TableCell>
                        <TableCell>2024-08-15</TableCell>
                        <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Priya Sharma</TableCell>
                        <TableCell>Polio Booster</TableCell>
                        <TableCell>2024-08-20</TableCell>
                        <TableCell><Badge>Sent</Badge></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Liam Johnson</TableCell>
                        <TableCell>Hepatitis B</TableCell>
                        <TableCell>2024-09-01</TableCell>
                        <TableCell><Badge variant="destructive">Failed</Badge></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
