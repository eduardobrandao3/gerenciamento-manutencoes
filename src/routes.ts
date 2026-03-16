import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/usuario/CreateUserController";
import { AuthUserController } from "./controllers/usuario/AuthUserController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

router.get("/teste", (req: Request, resp: Response) => {
  return resp.json({ok: true})
});

// ROTAS DE USUÁRIO
router.post("/usuarios", upload.single("foto"), new CreateUserController().handle)
router.get("/secao", new AuthUserController().handle)

export { router }