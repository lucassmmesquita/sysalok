import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { ViagensService } from "./viagens.service";
import { CreateViagemDto } from "./dto/create-viagem.dto";
import { UpdateViagemDto } from "./dto/update-viagem.dto";

@Controller("viagens")
export class ViagensController {
  constructor(private readonly viagensService: ViagensService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createViagemDto: CreateViagemDto) {
    return this.viagensService.create(createViagemDto);
  }

  @Get()
  findAll() {
    return this.viagensService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.viagensService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateViagemDto: UpdateViagemDto) {
    return this.viagensService.update(id, updateViagemDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.viagensService.remove(id);
  }
}

