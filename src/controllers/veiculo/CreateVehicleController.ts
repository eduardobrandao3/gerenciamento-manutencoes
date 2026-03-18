import { Request, Response } from "express";
import { CreateVehicleRequest } from "../../models/interfaces/veiculo/CreateVehicleRequest";
import { CreateVehicleService } from "../../services/veiculo/CreateVehicleService";

class CreateVehicleController{
  async handle(req: Request, resp: Response){
    const {placa, marca, modelo, ano_fabricacao, cor, descricao,}: CreateVehicleRequest = req.body
    const imagem = req.file?.filename
    const usuario_cpf = req.usuario_cpf;

    const createVehicleService = new CreateVehicleService();
    const carro = await createVehicleService.execute({placa, marca, modelo, ano_fabricacao, cor, descricao, imagem, usuario_cpf})

    return resp.json(carro)
  }
}

export { CreateVehicleController }