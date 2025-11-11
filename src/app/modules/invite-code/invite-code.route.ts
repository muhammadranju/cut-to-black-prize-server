import { Router } from 'express';
import { InviteCodeController } from './invite-code.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import InviteValidation from './invite-code.validation';
const router = Router();
router.route('/:code').get(InviteCodeController.getInviteCode);
router
  .route('/')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    InviteCodeController.getInviteCodes
  );
router
  .route('/')
  .post(
    validateRequest(InviteValidation.createInviteZodSchema),
    InviteCodeController.createInviteCode
  );
router
  .route('/')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    InviteCodeController.verifyInviteCode
  );

router.route('/forget-invite-code').post(InviteCodeController.forgetInviteCode);

export const InviteCodeRoutes = router;
