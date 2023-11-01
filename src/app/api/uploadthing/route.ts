import { createNextRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@/app/api/uploadthing/core';

export const runtime = 'edge';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
