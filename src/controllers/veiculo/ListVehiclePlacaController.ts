import { Request, Response } from "express";
import { ListVehiclePlacaService } from "../../services/veiculo/ListVehiclePlacaService";

class ListVehiclePlacaController{
  async handle(req: Request, resp: Response){
    const placa = req.query.placa as string;
    const usuario_cpf = req.usuario_cpf;

    const listVehiclePlacaService = new ListVehiclePlacaService();
    const veiculo =await listVehiclePlacaService.execute({placa, usuario_cpf})

    return resp.json(veiculo)
  }
}

export {ListVehiclePlacaController}