import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { connect } from 'http2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService

  create(createAnswerDto: Prisma.AnswersCreateInput, userId: any, questionId: number) {
    // const questionId = 1;
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: userId.sub },
      },
      question: {
        connect: { id: questionId },
      },
    };
    return this.prisma.answers.create({
      data: newAnswer,
    })
  }

  findAll() {
    return this.prisma.questions.findMany();
  }

  findOne(id: number) {
    return this.prisma.questions.findUnique({ where: { id }});
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.questions.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  remove(id: number) {
    return this.prisma.questions.delete({ where: { id }});
  }
}
