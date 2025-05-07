import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { AlocacoesService } from "./alocacoes.service";
import { CreateAlocacaoDto } from "./dto/create-alocacao.dto";
import { UpdateAlocacaoDto } from "./dto/update-alocacao.dto";

@Controller("alocacoes")
export class AlocacoesController {
  constructor(private readonly alocacoesService: AlocacoesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createAlocacaoDto: CreateAlocacaoDto) {
    return this.alocacoesService.create(createAlocacaoDto);
  }

  @Get()
  findAll() {
    return this.alocacoesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.alocacoesService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateAlocacaoDto: UpdateAlocacaoDto) {
    return this.alocacoesService.update(id, updateAlocacaoDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.alocacoesService.remove(id);
  }
}

