export interface EditVehicleRequest{
  placa: string;
  usuario_cpf: string;
  marca?: string | undefined;
  modelo?: string | undefined;
  ano_fabricacao?: number | undefined;
  cor?: string | undefined;
  imagem?: string | undefined;
  descricao?: string | undefined;
}