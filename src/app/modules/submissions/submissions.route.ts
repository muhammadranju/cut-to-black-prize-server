import { Router } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import upload from '../../middlewares/multerConfig';
import {
  analyticsData,
  deleteOne,
  getAll,
  getDownload,
  getOne,
  submit,
  updateStatus,
} from '../submissions/submissions.controller';

const router = Router();

router.post(
  '/',
  // validateRequest(SubmissionValidation.createSubmissionZodSchema),
  upload,
  submit
);
router.get('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), getAll);

router
  .route('/analytics-data')
  .get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), analyticsData);

router.get('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), getOne);
router.get('/:id/download', getDownload);
router.patch(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  updateStatus
);
router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  deleteOne
);

export const SubmissionRoutes = router;
