'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
        <p className="text-muted-foreground mt-1">Send health alerts to users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Alert</CardTitle>
          <CardDescription>
            Send a health alert to users in a specific region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disease">Disease / Condition</Label>
              <Input id="disease" placeholder="e.g., Dengue, Malaria, COVID-19" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location / Region</Label>
              <Input id="location" placeholder="e.g., Mumbai, Delhi, Karnataka" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Alert Message</Label>
              <Textarea
                id="message"
                placeholder="Enter the alert message with prevention tips and recommendations..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">Send Alert</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
