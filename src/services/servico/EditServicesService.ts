import prismaClient from "../../prisma";
import { EditServicesRequest } from "../../models/interfaces/servico/EditServicesRequest";

class EditServicesService{
  async execute({usuario_cpf, veiculo_placa, id, descricao, preco, data_realizacao, km, oficina}: EditServicesRequest){
    if(!usuario_cpf || !veiculo_placa || !id){
      throw new Error("Informações inválidas para editar");
    }

    const veiculoDoUsuario = await prismaClient.veiculo.findFirst({
      where: {
        placa: veiculo_placa,
        usuario_cpf: usuario_cpf
      }
    })

    if(!veiculoDoUsuario){
      throw new Error("Usuário não é proprietário do veículo");
    }

    const data: any = {};
    if(descricao){
      data.descricao = descricao;
    }
    if(preco){
      data.preco = Number(preco);
    }
    if(data_realizacao){
      data.data_realizacao = data_realizacao;
    }
    if(km){
      data.km = Number(km);
    }
    if(oficina){
      data.oficina = oficina;
    }

    const servicoAtualizado = await prismaClient.servico.update({
      where: {
        id: id,
        veiculo_placa: veiculo_placa
      },
      data: data,
      select: {
        id: true,
        descricao: true,
        preco: true,
        data_realizacao: true,
        km: true,
        oficina: true
      }
    })

    return servicoAtualizado;
  }
}

export { EditServicesService }