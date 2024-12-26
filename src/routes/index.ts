import { NextFunction, Request, Response, Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { GroupController } from '../controllers/groupController';
import { ContactGroupController } from '../controllers/contactGroupController';

const router = Router();
const contactController = new ContactController();
const groupController = new GroupController();
const contactGroupController = new ContactGroupController();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Contact routes
router.post('/contacts', asyncHandler((req: Request, res: Response, next: NextFunction) => contactController.create(req, res, next)));
router.get('/contacts', asyncHandler((req: Request, res: Response, next: NextFunction) => contactController.list(req, res, next)));
router.patch('/contacts/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => contactController.update(req, res, next)));
router.delete('/contacts/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => contactController.delete(req, res, next)));

// Group routes
router.post('/groups', asyncHandler((req: Request, res: Response, next: NextFunction) => groupController.create(req, res, next)));
router.patch('/groups/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => groupController.update(req, res, next)));
router.delete('/groups/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => groupController.delete(req, res, next)));
router.get('/groups/:id/contacts', asyncHandler((req: Request, res: Response, next: NextFunction) => groupController.listContacts(req, res, next)));
router.get('/report/contact-groups', asyncHandler((req: Request, res: Response, next: NextFunction) => groupController.getReport(req, res, next)));

// Contact-group routes
router.post('/contact-groups', asyncHandler((req: Request, res: Response, next: NextFunction) => contactGroupController.linkContactGroup(req, res, next)));

export { router };
