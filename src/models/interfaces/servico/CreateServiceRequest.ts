export interface CreateServiceRequest {
  veiculo_placa: string;
  descricao?: string | undefined;
  preco: number;
  km: number;
  oficina: string;
  data_realizacao: string;
  usuario_cpf: string;
}
