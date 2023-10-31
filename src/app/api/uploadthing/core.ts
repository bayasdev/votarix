import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';

import getCurrentUser from '@/actions/getCurrentUser';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  candidates: f({
    image: { maxFileSize: '2MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser || currentUser.role !== 'ADMIN') {
        throw new Error('No autorizado');
      }

      return { userId: currentUser.id };
    })
    .onUploadComplete(() => {}),
  parties: f({
    image: { maxFileSize: '2MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser || currentUser.role !== 'ADMIN') {
        throw new Error('No autorizado');
      }

      return { userId: currentUser.id };
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi();
