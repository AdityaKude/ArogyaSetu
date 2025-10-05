"use client";

import { useFormState } from 'react-dom';
import { sendWhatsAppMessage, sendSMSMessage } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AdminMessagesPage() {
  const [waState, waAction] = useFormState(sendWhatsAppMessage, { success: false, message: '' });
  const [smsState, smsAction] = useFormState(sendSMSMessage, { success: false, message: '' });

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Admin • Send Test Message</h1>
      <Tabs defaultValue="whatsapp">
        <TabsList>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>Send WhatsApp Message</CardTitle>
              <CardDescription>
                Send a test message via Twilio WhatsApp to validate outbound delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {waState.message ? (
                <div className={`mb-4 rounded border p-3 text-sm ${waState.success ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                  {waState.message}
                </div>
              ) : null}
              <form action={waAction} className="space-y-4">
                <div>
                  <Label htmlFor="wa-phone">Recipient (E.164 or whatsapp:+)</Label>
                  <Input id="wa-phone" name="phoneNumber" placeholder="whatsapp:+919876543210" required />
                </div>
                <div>
                  <Label htmlFor="wa-body">Message</Label>
                  <Input id="wa-body" name="message" placeholder="Hello from ArogyaSetu" required />
                </div>
                <Button type="submit">Send WhatsApp</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>Send SMS</CardTitle>
              <CardDescription>
                Send a test SMS (requires SMS-capable Twilio number).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {smsState.message ? (
                <div className={`mb-4 rounded border p-3 text-sm ${smsState.success ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                  {smsState.message}
                </div>
              ) : null}
              <form action={smsAction} className="space-y-4">
                <div>
                  <Label htmlFor="sms-phone">Recipient (+E.164)</Label>
                  <Input id="sms-phone" name="phoneNumber" placeholder="+919876543210" required />
                </div>
                <div>
                  <Label htmlFor="sms-body">Message</Label>
                  <Input id="sms-body" name="message" placeholder="Hello from ArogyaSetu" required />
                </div>
                <Button type="submit">Send SMS</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


