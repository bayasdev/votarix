import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  candidates: f({
    image: { maxFileSize: '2MB', maxFileCount: 1 },
  }).onUploadComplete((data) => console.log('file', data)),
  parties: f({
    image: { maxFileSize: '2MB', maxFileCount: 1 },
  }).onUploadComplete((data) => console.log('file', data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi();
