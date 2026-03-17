import prismaClient from "../../prisma";
import { DeleteVehicleRequest } from "../../models/interfaces/veiculo/DeleteVehicleRequest";

class DeleteVehicleService{
  async execute({placa, usuario_cpf}: DeleteVehicleRequest){
    if(!placa || !usuario_cpf){
      throw new Error("Informações inálidas para deleção")
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