import prismaClient from "../../prisma";
import { EditVehicleRequest } from "../../models/interfaces/veiculo/EditVehicleRequest";

class EditVehicleService {
  async execute({
    placa,
    marca,
    modelo,
    imagem,
    ano_fabricacao,
    cor,
    descricao,
    usuario_cpf,
  }: EditVehicleRequest) {
    if (!placa || !usuario_cpf) {
      throw new Error("Informações inválidas para edição de veículo");
    }
    const data: any = {};
    data.placa = placa;
    data.usuario_cpf = usuario_cpf;

    if (marca) {
      data.marca = marca;
    }
    if (modelo) {
      data.modelo = modelo;
    }
    if (imagem) {
      data.imagem = imagem;
    }
    if (ano_fabricacao) {
      data.ano_fabricacao = Number(ano_fabricacao);
    }
    if (cor) {
      data.cor = cor;
    }
    if (descricao) {
      data.descricao = descricao;
    }

    const veiculoEditado = await prismaClient.veiculo.update({
      where: {
        placa: placa,
        usuario_cpf: usuario_cpf,
      },
      data: data,
      select: {
        placa: true,
        marca: true,
        modelo: true,
        ano_fabricacao: true,
        cor: true,
        imagem: true,
        descricao: true,
      },
    });

    return veiculoEditado;
  }
}

export { EditVehicleService };
