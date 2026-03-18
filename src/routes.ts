import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/usuario/CreateUserController";
import { AuthUserController } from "./controllers/usuario/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/usuario/DetailUserController";
import { EditUserController } from "./controllers/usuario/EditUserController";
import { CreateVehicleController } from "./controllers/veiculo/CreateVehicleController";
import { DeleteVehicleController } from "./controllers/veiculo/DeleteVehicleController";
import { ListAllVehiclesController } from "./controllers/veiculo/ListAllVehiclesController";
import { ListVehiclePlacaController } from "./controllers/veiculo/ListVehiclePlacaController";
import { EditVehicleController } from "./controllers/veiculo/EditVehicleController";
import { CreateServiceController } from "./controllers/servico/CreateServiceController";
import { DeleteServiceController } from "./controllers/servico/DeleteServiceController";
import { ListAllServicesController } from "./controllers/servico/ListAllServicesController";
import { ListServicesByPlacaController } from "./controllers/servico/ListServicesByPlacaController";
import { ListServicesByIdController } from "./controllers/servico/ListServicesByIdController";

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


// ROTAS DE VEÍCULO
router.post("/veiculos", isAuthenticated, upload.single("imagem"), new CreateVehicleController().handle)
router.delete("/veiculos/remove", isAuthenticated, new DeleteVehicleController().handle)
router.get("/veiculos/todos", isAuthenticated, new ListAllVehiclesController().handle)
router.get("/veiculos/placa", isAuthenticated, new ListVehiclePlacaController().handle)
router.put("/veiculos/edicao", isAuthenticated, upload.single("imagem"), new EditVehicleController().handle)

// ROTAS DE SERVICO
router.post("/servicos", isAuthenticated, new CreateServiceController().handle)
router.delete("/servicos/remove", isAuthenticated, new DeleteServiceController().handle)
router.get("/servicos/todos", isAuthenticated, new ListAllServicesController().handle)
router.get("/servicos/placa", isAuthenticated, new ListServicesByPlacaController().handle)
router.get("/servicos/id", isAuthenticated, new ListServicesByIdController().handle)

export { router }