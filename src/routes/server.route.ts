import { Request, Response, Router } from 'express';

const router = Router();

router.get('/',(_: Request, res: Response) => {
    res.render("index");
});

export default router;