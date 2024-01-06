import { Action, EntityType } from '@prisma/client';

import { getCurrentUser } from '../session';
import { prisma } from '../db';

interface Props {
  action: Action;
  entityId?: string;
  entityType: EntityType;
  entityName?: string;
  customUserName?: string;
}

export const createAuditLog = async (props: Props) => {
  try {
    const user = await getCurrentUser();

    const { action, entityId, entityType, entityName, customUserName } = props;

    await prisma.auditLog.create({
      data: {
        action,
        entityId: entityId || 'ID_OMITTED',
        entityType,
        entityName: entityName || 'NO_NAME_ENTITY',
        userId: user?.id as string,
        userName: (user?.name || customUserName) as string,
        userEmail: user?.email as string,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
