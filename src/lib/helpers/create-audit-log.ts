import { Action, EntityType } from '@prisma/client';

import { getCurrentUser } from '../session';
import { prisma } from '../db';

interface Props {
  action: Action;
  entityId?: string;
  entityType: EntityType;
  entityName?: string;
}

export const createAuditLog = async ({
  action,
  entityId = 'ID_OMITTED',
  entityType,
  entityName = 'NO_NAME_ENTITY',
}: Props) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    await prisma.auditLog.create({
      data: {
        action,
        entityId: entityId,
        entityType,
        entityName: entityName,
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
