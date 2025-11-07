import { Router } from 'express';
import { exportCSV, exportExcel } from './export.controller';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = Router();

router.get(
  '/csv',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),

  exportCSV
);
router.get(
  '/excel',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  exportExcel
);

export const ExportRoutes = router;
