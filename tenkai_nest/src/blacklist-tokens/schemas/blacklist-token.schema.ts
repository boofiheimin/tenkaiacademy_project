import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const now = new Date();

export type BlacklistTokenDocument = BlacklistToken & Document;

@Schema()
export class BlacklistToken {
    @Prop({ required: [true, 'Please provide a token'], unique: true })
    token: string;

    @Prop({ default: now.setDate(now.getDate() + 7) })
    expireAt: Date;
}

export const BlacklistTokenSchema = SchemaFactory.createForClass(BlacklistToken);
