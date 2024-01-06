'use server';

import { prisma } from '@/lib/db';

import { SafeAuditLog } from '@/types';

export async function getAuditLogs(): Promise<SafeAuditLog[] | null> {
  try {
    const auditLogs = await prisma.auditLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeAuditLogs = auditLogs.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeAuditLogs;
  } catch (error) {
    return null;
  }
}
