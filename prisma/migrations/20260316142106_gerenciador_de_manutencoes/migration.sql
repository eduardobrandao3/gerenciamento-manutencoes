-- CreateTable
CREATE TABLE "usuarios" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano_fabricacao" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "imagem" TEXT,
    "descricao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "usuario_cpf" TEXT NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("placa")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "data_realizacao" TIMESTAMP(3) NOT NULL,
    "km" DOUBLE PRECISION NOT NULL,
    "oficina" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "veiculo_placa" TEXT NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "veiculos" ADD CONSTRAINT "veiculos_usuario_cpf_fkey" FOREIGN KEY ("usuario_cpf") REFERENCES "usuarios"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_veiculo_placa_fkey" FOREIGN KEY ("veiculo_placa") REFERENCES "veiculos"("placa") ON DELETE RESTRICT ON UPDATE CASCADE;
