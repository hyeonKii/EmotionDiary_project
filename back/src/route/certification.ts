import { Router } from "express";
import auth from "middleware/auth";
import wrapRouter from "lib/wrapRouter";
import certificationService from "services/certificationService";

const certificationRouter = Router();

// todo: send router
certificationRouter.post(
    "/certify",
    auth,
    wrapRouter(async (req, res) => {
        const { code } = req.body;

        const result = certificationService.certifyCode(code);

        return { statusCode: 200, content: result };
    })
);

export default certificationRouter;
