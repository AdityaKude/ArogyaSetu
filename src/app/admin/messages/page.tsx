"use client";

import { useActionState } from 'react';
import { sendWhatsAppMessage, sendSMSMessage } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminMessagesPage() {
  const [waState, waAction] = useActionState(sendWhatsAppMessage, { success: false, message: '' });
  const [smsState, smsAction] = useActionState(sendSMSMessage, { success: false, message: '' });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1">Send messages to users via WhatsApp or SMS</p>
      </div>

      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send WhatsApp Message</CardTitle>
              <CardDescription>
                Send a message via Twilio WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              {waState.message && (
                <Alert className={`mb-4 ${waState.success ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                  <AlertDescription className={waState.success ? 'text-emerald-700' : 'text-red-700'}>
                    {waState.message}
                  </AlertDescription>
                </Alert>
              )}
              <form action={waAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wa-phone">Recipient Phone Number</Label>
                  <Input 
                    id="wa-phone" 
                    name="phoneNumber" 
                    placeholder="whatsapp:+919876543210" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wa-body">Message</Label>
                  <Textarea 
                    id="wa-body" 
                    name="message" 
                    placeholder="Enter your message here..." 
                    rows={4}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">Send WhatsApp Message</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send SMS</CardTitle>
              <CardDescription>
                Send a message via SMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              {smsState.message && (
                <Alert className={`mb-4 ${smsState.success ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                  <AlertDescription className={smsState.success ? 'text-emerald-700' : 'text-red-700'}>
                    {smsState.message}
                  </AlertDescription>
                </Alert>
              )}
              <form action={smsAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-phone">Recipient Phone Number</Label>
                  <Input 
                    id="sms-phone" 
                    name="phoneNumber" 
                    placeholder="+919876543210" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-body">Message</Label>
                  <Textarea 
                    id="sms-body" 
                    name="message" 
                    placeholder="Enter your message here..." 
                    rows={4}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">Send SMS</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


