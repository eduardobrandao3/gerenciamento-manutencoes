import prismaClient from "../../prisma";
import { DeleteServiceRequest } from "../../models/interfaces/servico/DeleteServiceRequest";

class DeleteServiceService {
  async execute({
    usuario_cpf,
    veiculo_placa,
    id_servico,
  }: DeleteServiceRequest) {
    if (!usuario_cpf || !veiculo_placa || !id_servico) {
      throw new Error("Informações insuficientes para remoção do serviço");
    }

    const veiculoUsuarioPlaca = await prismaClient.veiculo.findFirst({
      where: {
        usuario_cpf: usuario_cpf,
        placa: veiculo_placa,
      },
    });

    if (!veiculoUsuarioPlaca) {
      throw new Error("Usuario não é proprietário do véiculo");
    }

    const servicoRemovido = await prismaClient.servico.delete({
      where: {
        id: id_servico,
        veiculo_placa: veiculo_placa, 
      },
      select: {
        veiculo_placa: true,
        preco: true,
        km: true,
        oficina: true,
        data_realizacao: true,
        descricao: true,
      },
    });

    return servicoRemovido;
  }
}

export { DeleteServiceService };
