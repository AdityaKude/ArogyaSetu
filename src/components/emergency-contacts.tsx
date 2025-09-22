'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Ambulance,
  HeartPulse,
  Phone,
  Shield,
  Flame,
} from 'lucide-react';
import type { EmergencyContact } from '@/lib/types';

const contacts: EmergencyContact[] = [
  { name: 'National Emergency Number', phone: '112', type: 'General' },
  { name: 'Police', phone: '100', type: 'Police' },
  { name: 'Fire', phone: '101', type: 'Fire' },
  { name: 'Ambulance', phone: '102', type: 'Ambulance' },
  { name: 'Women Helpline', phone: '1091', type: 'General' },
  { name: 'Disaster Management', phone: '108', type: 'General' },
];

const getIcon = (type: EmergencyContact['type']) => {
  switch (type) {
    case 'Ambulance':
      return <Ambulance className="h-6 w-6 text-red-500" />;
    case 'Police':
      return <Shield className="h-6 w-6 text-blue-500" />;
    case 'Fire':
      return <Flame className="h-6 w-6 text-orange-500" />;
    default:
      return <Phone className="h-6 w-6 text-gray-500" />;
  }
};

export function EmergencyContacts() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="destructive" size="sm">
          <HeartPulse className="mr-2 h-4 w-4" />
          Emergency
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Emergency Contacts</SheetTitle>
          <SheetDescription>
            In case of an emergency, please use the following contact numbers.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="flex items-center justify-between p-3 rounded-lg bg-card border"
            >
              <div className="flex items-center gap-4">
                {getIcon(contact.type)}
                <span className="font-medium">{contact.name}</span>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${contact.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {contact.phone}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
