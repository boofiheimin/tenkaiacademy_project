import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export enum UserRole {
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

@Schema()
export class User {
    @ApiProperty()
    @Prop({ required: [true, 'Please provide a username'], unique: true })
    username: string;

    @ApiProperty()
    @Prop({ required: [true, 'Please add a password'], minlength: 8, select: false })
    password: string;

    @ApiProperty()
    @Prop({ enum: Object.keys(UserRole), required: [true, 'Please assign a correct role'] })
    role: UserRole;

    matchPassword: (password: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
// arrow function cannot be used for this part
UserSchema.pre('save', async function hash(next: NextFunction) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    (this as UserDocument).password = await bcrypt.hash((this as UserDocument).password, salt);
    next();
});

UserSchema.method({
    async matchPassword(password) {
        return bcrypt.compare(password, (this as UserDocument).password);
    },
});
