import { Request, Response } from "express";
import { DeleteServiceService } from "../../services/servico/DeleteServiceService";

class DeleteServiceController{
  async handle(req: Request, resp: Response){
    const usuario_cpf = req.usuario_cpf as string;
    const veiculo_placa = req.query.veiculo_placa as string;
    const id_servico = req.query.id_servico as string;

    const deleteServiceService = new DeleteServiceService();
    const servicoRemovido = await deleteServiceService.execute({usuario_cpf, veiculo_placa, id_servico})

    return resp.json(servicoRemovido)
  }
}

export { DeleteServiceController }