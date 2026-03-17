export interface CreateVehicleRequest {
  placa: string;
  marca: string;
  modelo: string;
  ano_fabricacao: number;
  cor: string;
  imagem?: string | undefined;
  descricao?: string | undefined;
  usuario_cpf: string
}