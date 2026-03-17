import prismaClient from "../../prisma";
import { CreateVehicleRequest } from "../../models/interfaces/veiculo/CreateVehicleRequest";

class CreateVehicleService{
  async execute({placa, marca, modelo, ano_fabricacao, cor, imagem, descricao, usuario_cpf}: CreateVehicleRequest){
    if(!placa || !marca || !modelo || !ano_fabricacao || !cor || !usuario_cpf){
      throw new Error("Está faltando informações para adicionar novo carro")
    }

    const carroExistente = await prismaClient.veiculo.findFirst({
      where: {
        placa: placa
      }
    })

    if(carroExistente){
      throw new Error("O veículo já se encontra cadastrado no sistema")
    }

    const data: any = {}

    data.placa = placa
    data.marca = marca
    data.modelo = modelo
    data.ano_fabricacao = Number(ano_fabricacao)
    data.cor = cor
    if(imagem){
      data.imagem = imagem
    }
    if(descricao){
      data.descricao = descricao
    }
    data.usuario_cpf = usuario_cpf

    const novoCarro  = await prismaClient.veiculo.create({
      data: data,
      select: {
        placa: true,
        marca: true,
        modelo: true,
        ano_fabricacao: true,
        cor: true,
        imagem: true,
        descricao: true
      }
    })

    return novoCarro;
  }
}

export { CreateVehicleService }