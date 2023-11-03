'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Badge } from '@/components/ui/badge';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUser: User | undefined;
}

export function UserAccountNav({ currentUser }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={currentUser?.name || ''} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {currentUser?.name && (
              <p className="font-medium">{currentUser.name}</p>
            )}
            {currentUser?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {currentUser.email}
              </p>
            )}
            {currentUser?.role && (
              <Badge variant="secondary" className="self-start lowercase">
                {currentUser.role}
              </Badge>
            )}
          </div>
        </div>
        {currentUser?.role === 'VOTER' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/certificates">Mis certificados</Link>
            </DropdownMenuItem>
          </>
        )}
        {currentUser?.role === 'ADMIN' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Configuración</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: '/',
            });
          }}
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
