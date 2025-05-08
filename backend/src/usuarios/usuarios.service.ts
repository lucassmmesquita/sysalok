import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario, Prisma, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
    const { email, senha, ...rest } = createUsuarioDto;

    const existingUser = await this.prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException(`Usuário com email "${email}" já existe.`);
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await this.prisma.usuario.create({
      data: {
        ...rest,
        email,
        senha: hashedPassword,
        role: rest.role || UserRole.COLABORADOR, // Default role
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...result } = user; // Exclude password from result
    return result;
  }

  async findAll(): Promise<Omit<Usuario, 'senha'>[]> {
    const users = await this.prisma.usuario.findMany();
    return users.map(user => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user;
      return result;
    });
  }

  async findOne(id: string): Promise<Omit<Usuario, 'senha'>> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = user;
    return result;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<Usuario, 'senha'>> {
    const { senha, ...rest } = updateUsuarioDto;
    const dataToUpdate: Prisma.UsuarioUpdateInput = { ...rest };

    if (senha) {
      dataToUpdate.senha = await bcrypt.hash(senha, 10);
    }

    try {
      const updatedUser = await this.prisma.usuario.update({
        where: { id },
        data: dataToUpdate,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha: _, ...result } = updatedUser;
      return result;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado para atualização`);
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException(`Email "${updateUsuarioDto.email}" já está em uso.`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Omit<Usuario, 'senha'>> {
    try {
      const user = await this.prisma.usuario.delete({
        where: { id },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user;
      return result;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado para remoção`);
      }
      throw error;
    }
  }

  // Basic authentication logic (without JWT for now as per requirements)
  async validateUser(email: string, pass: string): Promise<Omit<Usuario, 'senha'> | null> {
    console.log(' validateUser email :', email);
    console.log(' validateUser senha :', pass );
    if (!email || !pass) { // Verifica se email ou senha estão vazios/undefined
      // Lançar erro ou retornar null é uma opção, dependendo da estratégia de tratamento de erro.
      // Lançar UnauthorizedException é mais explícito para o frontend.
      // console.error("Tentativa de login com email ou senha vazios.");
      // throw new UnauthorizedException("Email e senha são obrigatórios.");
      return null; // Ou pode retornar null para que o controller lide com a resposta
    }

    const user = await this.findByEmail(email);
    console.log(' validateUser user :', user);
    if (!user) {
      // Usuário não encontrado
      // console.warn(`Tentativa de login para usuário não encontrado: ${email}`);
      return null;
    }

    // Verifica se user.senha existe e não é uma string vazia antes de comparar
    if (!user.senha || typeof user.senha !== 'string' || user.senha.trim() === '') {
        // console.error(`Usuário ${email} encontrado, mas não possui senha válida no banco.`);
        // throw new UnauthorizedException("Credenciais inválidas."); // Ou uma mensagem mais genérica
        return null;
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.senha);
    console.log(' isPasswordMatching :', isPasswordMatching);

    if (isPasswordMatching) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user;
      return result;
    }

    return null;
  }
}

