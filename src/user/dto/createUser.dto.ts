import { Min, IsString, IsEmail, IsAlpha, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    //@Min(3)
    @IsString()
    @IsNotEmpty()
    name: string;
    
    //@Min(6)
    @IsAlpha()
    @IsNotEmpty()
    password: string;
}