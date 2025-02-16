import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAnswerDto {
    @IsNotEmpty()
    @Length(6)
    @IsString()
    body: string;
    user: { connect: { id: number } };
    question: { connect: { id: number } };
}
