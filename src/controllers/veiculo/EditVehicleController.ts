import { Request, Response } from "express";
import { EditVehicleRequest } from "../../models/interfaces/veiculo/EditVehicleRequest";
import { EditVehicleService } from "../../services/veiculo/EditVehicleService";

class EditVehicleController{
  async handle(req: Request, resp: Response){
    const placa = req.query.placa as string;
    const usuario_cpf = req.usuario_cpf;

    const {marca, modelo, ano_fabricacao, cor, imagem, descricao}: EditVehicleRequest = req.body;

    const editVehichleService = new EditVehicleService();
    const veiculoEditado = await editVehichleService.execute({placa, marca, modelo, imagem, ano_fabricacao, cor, descricao, usuario_cpf})

    return resp.json(veiculoEditado)
  }
}

export { EditVehicleController }