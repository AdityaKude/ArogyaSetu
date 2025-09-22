import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AlertsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Alerts Manager</h1>
      <Card>
        <CardHeader>
          <CardTitle>Push New Outbreak Alert</CardTitle>
          <CardDescription>
            This alert will be sent to all users in the specified region.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="disease">Disease</Label>
              <Input id="disease" placeholder="e.g., Dengue, Malaria" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location / Region</Label>
              <Input id="location" placeholder="e.g., Patna, Mumbai" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Alert Message</Label>
              <Textarea
                id="message"
                placeholder="e.g., High-risk of Dengue reported. Please use mosquito nets and remove stagnant water."
              />
            </div>
            <Button type="submit">Send Alert</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
