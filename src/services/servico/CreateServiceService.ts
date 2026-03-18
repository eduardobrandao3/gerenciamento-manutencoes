import prismaClient from "../../prisma";
import { CreateServiceRequest } from "../../models/interfaces/servico/CreateServiceRequest";

class CreateServiceService{
  async execute({veiculo_placa, descricao, preco, km, oficina, data_realizacao, usuario_cpf}: CreateServiceRequest){
    if(!veiculo_placa){
      throw new Error("Placa do veiculo não informada")
    }

    const veiculoCadastradoUsuario = await prismaClient.veiculo.findFirst({
      where: {
        usuario_cpf: usuario_cpf,
        placa: veiculo_placa
      }
    })

    if(!veiculoCadastradoUsuario){
      throw new Error("Usuario nao e proprietado do veiculo")
    }

    const data: any = {}
    data.veiculo_placa = veiculo_placa;
    data.preco = Number(preco);
    data.km = Number(km);
    data.oficina = oficina;
    data.data_realizacao = data_realizacao
    if(descricao){
      data.descricao = descricao;
    }

    const servico = await prismaClient.servico.create({
      data: data,
      select: {
        veiculo_placa: true,
        preco: true,
        km: true,
        oficina: true,
        data_realizacao: true,
        descricao: true
      }
    })

    return servico
  }
}

export { CreateServiceService }