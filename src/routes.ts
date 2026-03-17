import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/usuario/CreateUserController";
import { AuthUserController } from "./controllers/usuario/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/usuario/DetailUserController";
import { EditUserController } from "./controllers/usuario/EditUserController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

router.get("/teste", (req: Request, resp: Response) => {
  return resp.json({ok: true})
});

// ROTAS DE USUÁRIO
router.post("/usuarios", upload.single("foto"), new CreateUserController().handle)
router.post("/secao", new AuthUserController().handle)
router.get("/pessoal", isAuthenticated, new DetailUserController().handle)
router.put("/usuarios/edit", isAuthenticated, upload.single("foto"), new EditUserController().handle)

export { router }