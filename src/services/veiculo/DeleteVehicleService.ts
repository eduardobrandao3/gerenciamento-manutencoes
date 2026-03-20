import prismaClient from "../../prisma";
import { DeleteVehicleRequest } from "../../models/interfaces/veiculo/DeleteVehicleRequest";
import { DeleteServiceService } from "../servico/DeleteServiceService";
import { ListServicesByPlacaService } from "../servico/ListServicesByPlacaService";

class DeleteVehicleService{
  async execute({placa, usuario_cpf}: DeleteVehicleRequest){
    if(!placa || !usuario_cpf){
      throw new Error("Informações inválidas para deleção")
    }

    const carroUsuario = await prismaClient.veiculo.findFirst({
      where: {
        usuario_cpf: usuario_cpf,
        placa: placa
      }
    })

    if(!carroUsuario){
      throw new Error("Veiculo nao pertence ao usuario")
    }

    const listServices = new ListServicesByPlacaService();
    let veiculo_placa = placa
    const servicos = await listServices.execute({usuario_cpf, veiculo_placa}) 

    const deleteService = new DeleteServiceService();
    for(let servico of servicos){
      let id_servico = servico.id;
      const removeServico = await deleteService.execute({usuario_cpf, veiculo_placa, id_servico})
    }

    const carroRemovido = await prismaClient.veiculo.delete({
      where: {
        placa: placa,
        usuario_cpf: usuario_cpf
      },
      select: {
        placa: true,
        marca: true,
        modelo: true
      }
    })

    return carroRemovido
  }
}

export { DeleteVehicleService }