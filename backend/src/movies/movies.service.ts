import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async create(createMovieDto: CreateMovieDto, userId: string): Promise<Movie> {
    const createdMovie = new this.movieModel({
      ...createMovieDto,
      userId,
    });
    return createdMovie.save();
  }

  async findAll(userId: string, page: number = 1, limit: number = 10): Promise<{ movies: Movie[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const movies = await this.movieModel.find({ userId }).skip(skip).limit(limit).exec();
    const total = await this.movieModel.countDocuments({ userId });
    const totalPages = Math.ceil(total / limit);

    return { movies, total, totalPages };
  }

  async findOne(id: string, userId: string): Promise<Movie> {
    const movie = await this.movieModel.findOne({ _id: id, userId }).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string): Promise<Movie> {
    const movie = await this.movieModel.findOne({ _id: id, userId }).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    Object.assign(movie, updateMovieDto);
    return movie.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.movieModel.deleteOne({ _id: id, userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Movie not found');
    }
  }
}

