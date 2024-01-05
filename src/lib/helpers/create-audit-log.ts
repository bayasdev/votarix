import { Action, EntityType } from '@prisma/client';

import { getCurrentUser } from '../session';
import { prisma } from '../db';

interface Props {
  entityId: string;
  entityType: EntityType;
  entityName?: string;
  action: Action;
}

export const createAuditLog = async (props: Props) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    const { entityId, entityType, entityName, action } = props;

    await prisma.auditLog.create({
      data: {
        action,
        entityId,
        entityType,
        entityName: entityName || 'NO_NAME_ENTITY',
        userId: user.id,
        userName: user?.name as string,
        userEmail: user?.email as string,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
