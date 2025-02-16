import { User } from '../../user/entities/user.entity';
import { Question }from '../../questions/entities/question.entity';
import { Answers } from '@prisma/client';

export class Answer implements Answers {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    body: string;
    userId: number;
    questionId: number;
    user: User;
    question: Question;
}