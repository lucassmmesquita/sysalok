import { Controller, Get, Query, UseGuards, Post, Body, Req } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
// import { AdminAuthGuard } from '../auth/guards/admin-auth.guard'; // Example guard

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  // This endpoint would typically be protected and for admin use
  // @UseGuards(AdminAuthGuard) // Uncomment if you have an AdminAuthGuard
  @Get()
  async findAll(@Query() query: any) {
    // Basic pagination and filtering example (adjust as needed)
    const { page = 1, limit = 10, level, context, userId } = query;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (level) where.level = level;
    if (context) where.context = { contains: context, mode: 'insensitive' }; // Case-insensitive search for context
    if (userId) where.userId = parseInt(userId, 10);

    return this.logsService.findAll({
      skip,
      take: parseInt(limit, 10),
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // This endpoint is more for direct log creation if needed, 
  // but typically logs are created via the service injected elsewhere.
  // @Post()
  // async createLog(@Body() createLogDto: CreateLogDto, @Req() req) {
  //   // If you want to associate with a user from a request, you might get req.user.id here
  //   // For example: createLogDto.userId = req.user?.id;
  //   return this.logsService.create(createLogDto);
  // }
}

