import { Request, Response } from "express";
import { DeleteVehicleRequest } from "../../models/interfaces/veiculo/DeleteVehicleRequest";
import { DeleteVehicleService } from "../../services/veiculo/DeleteVehicleService";

class DeleteVehicleController{
  async handle(req: Request, resp: Response){
    const placa = req.query.placa as string;
    const usuario_cpf = req.usuario_cpf;

    const deleteVehicleService = new DeleteVehicleService();
    const removido = await deleteVehicleService.execute({placa, usuario_cpf})

    return resp.json({
      message: `Veiculo de placa: '${removido.placa}' removido com sucesso!`
    })
  }
}

export { DeleteVehicleController }