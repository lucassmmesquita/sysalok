import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { RubricasService } from "./rubricas.service";
import { CreateRubricaDto } from "./dto/create-rubrica.dto";
import { UpdateRubricaDto } from "./dto/update-rubrica.dto";

@Controller("rubricas")
export class RubricasController {
  constructor(private readonly rubricasService: RubricasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createRubricaDto: CreateRubricaDto) {
    return this.rubricasService.create(createRubricaDto);
  }

  @Get()
  findAll() {
    return this.rubricasService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.rubricasService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateRubricaDto: UpdateRubricaDto) {
    return this.rubricasService.update(id, updateRubricaDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.rubricasService.remove(id);
  }

  // Endpoint for consolidation
  @Get('consolidar/:projetoId')
  consolidarCustosProjeto(@Param('projetoId', ParseUUIDPipe) projetoId: string) {
    return this.rubricasService.consolidarCustosProjeto(projetoId);
  }
}

