import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthRequest } from '../auth/interfaces/auth-request.interface';

@ApiTags('Movies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Movie created successfully' })
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthRequest,
  ) {
    const posterUrl = file ? `/uploads/${file.filename}` : createMovieDto.poster;
    return this.moviesService.create({ ...createMovieDto, poster: posterUrl }, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies with pagination' })
  @ApiResponse({ status: 200, description: 'Movies retrieved successfully' })
  async findAll(
    @Request() req: AuthRequest,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    return this.moviesService.findAll(req.user.userId, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.moviesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('poster'))
  @ApiOperation({ summary: 'Update a movie' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Movie updated successfully' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthRequest,
  ) {
    const updateData = { ...updateMovieDto };
    if (file) {
      updateData.poster = `/uploads/${file.filename}`;
    }
    return this.moviesService.update(id, updateData, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async remove(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.moviesService.remove(id, req.user.userId);
    return { message: 'Movie deleted successfully' };
  }
}

