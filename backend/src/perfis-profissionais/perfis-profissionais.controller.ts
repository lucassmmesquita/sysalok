import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { PerfisProfissionaisService } from './perfis-profissionais.service';
import { CreatePerfilProfissionalDto } from './dto/create-perfil-profissional.dto';
import { UpdatePerfilProfissionalDto } from './dto/update-perfil-profissional.dto';
import { CreateCustoRhDto } from './dto/create-custo-rh.dto';
import { UpdateCustoRhDto } from './dto/update-custo-rh.dto';

@Controller('perfis-profissionais')
export class PerfisProfissionaisController {
  constructor(private readonly perfisProfissionaisService: PerfisProfissionaisService) {}

  // PerfilProfissional Endpoints
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createPerfil(@Body() createPerfilDto: CreatePerfilProfissionalDto) {
    return this.perfisProfissionaisService.createPerfil(createPerfilDto);
  }

  @Get()
  findAllPerfis() {
    return this.perfisProfissionaisService.findAllPerfis();
  }

  @Get(':id')
  findOnePerfil(@Param('id', ParseUUIDPipe) id: string) {
    return this.perfisProfissionaisService.findOnePerfil(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updatePerfil(@Param('id', ParseUUIDPipe) id: string, @Body() updatePerfilDto: UpdatePerfilProfissionalDto) {
    return this.perfisProfissionaisService.updatePerfil(id, updatePerfilDto);
  }

  @Delete(':id')
  removePerfil(@Param('id', ParseUUIDPipe) id: string) {
    return this.perfisProfissionaisService.removePerfil(id);
  }

  // CustoRH Endpoints (nested under perfis-profissionais for context, or could be a separate controller)
  @Post(':perfilId/custos-rh')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createCustoRh(
    @Param('perfilId', ParseUUIDPipe) perfilId: string, 
    @Body() createCustoRhDto: Omit<CreateCustoRhDto, 'perfilProfissionalId'> // Omit perfilId as it's from param
  ) {
    return this.perfisProfissionaisService.createCustoRh({ ...createCustoRhDto, perfilProfissionalId: perfilId });
  }

  @Get(':perfilId/custos-rh')
  findAllCustosRhByPerfil(@Param('perfilId', ParseUUIDPipe) perfilId: string) {
    return this.perfisProfissionaisService.findAllCustosRhByPerfil(perfilId);
  }
  
  @Get(':perfilId/custos-rh/specific')
  findCustoRhByPerfilAndMesAno(
    @Param('perfilId', ParseUUIDPipe) perfilId: string,
    @Query('mes', ParseIntPipe) mes: number,
    @Query('ano', ParseIntPipe) ano: number,
  ) {
    return this.perfisProfissionaisService.findCustoRhByPerfilAndMesAno(perfilId, mes, ano);
  }

  @Patch('custos-rh/:custoId') // Using a specific ID for CustoRH for update/delete
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateCustoRh(@Param('custoId', ParseUUIDPipe) custoId: string, @Body() updateCustoRhDto: UpdateCustoRhDto) {
    return this.perfisProfissionaisService.updateCustoRh(custoId, updateCustoRhDto);
  }

  @Delete('custos-rh/:custoId')
  removeCustoRh(@Param('custoId', ParseUUIDPipe) custoId: string) {
    return this.perfisProfissionaisService.removeCustoRh(custoId);
  }
}

