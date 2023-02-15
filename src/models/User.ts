import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import {
    IsEmail,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

enum UserRoles {
    ADMIN,
    COMMON_USER,
    EXTERNAL_USER,
    CALL_ADMIN,
    ARCHIVE_ADMIN
}

@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @Column()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    name: string;

    @Column()
    @IsEnum(UserRoles)
    role: UserRoles;

    @Column()
    @IsString()
    @MinLength(4)
    password: string;

}