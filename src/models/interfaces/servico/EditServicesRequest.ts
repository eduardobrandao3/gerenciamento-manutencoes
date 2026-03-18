export interface EditServicesRequest{
  usuario_cpf: string;
  veiculo_placa: string;
  id: string;
  descricao?: string | undefined;
  preco?: number | undefined;
  data_realizacao?: string | undefined;
  km?: number | undefined;
  oficina?: string | undefined
}