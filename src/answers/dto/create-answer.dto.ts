export class CreateAnswerDto {
    body: string;
    user: { connect: { id: number } };
    question: { connect: { id: number } };
}
