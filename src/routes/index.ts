import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { SubmissionRoutes } from '../app/modules/submissions/submissions.route';
import { ExportRoutes } from '../app/modules/export/export.route';
import { InviteCodeRoutes } from '../app/modules/invite-code/invite-code.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/submission',
    route: SubmissionRoutes,
  },
  {
    path: '/export',
    route: ExportRoutes,
  },
  {
    path: '/invitation',
    route: InviteCodeRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
