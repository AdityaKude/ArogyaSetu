import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Preferred Language</TableHead>
            <TableHead>Reminder Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Liam Johnson</TableCell>
            <TableCell>+91 98765 43210</TableCell>
            <TableCell>English</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
            <TableCell>
              <Button variant="destructive" size="sm">Deactivate</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Aarav Patel</TableCell>
            <TableCell>+91 87654 32109</TableCell>
            <TableCell>Hindi</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
            <TableCell>
              <Button variant="destructive" size="sm">Deactivate</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Priya Sharma</TableCell>
            <TableCell>+91 76543 21098</TableCell>
            <TableCell>Bengali</TableCell>
            <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
            <TableCell>
              <Button variant="secondary" size="sm">Activate</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
