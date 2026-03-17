import { Request, Response} from "express";
import { ListAllVehiclesService } from "../../services/veiculo/ListAllVehiclesService";

class ListAllVehiclesController{
  async handle(req: Request, resp: Response){
    const usuario_cpf = req.usuario_cpf as string;

    const listAllVehiclesService = new ListAllVehiclesService();
    const veiculos = await listAllVehiclesService.execute(usuario_cpf)

    return resp.json(veiculos)
  }

}

export { ListAllVehiclesController }