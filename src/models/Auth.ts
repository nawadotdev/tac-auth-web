import { Model, model, models, Schema } from "mongoose";

export interface IAuth {
    userId: string
    state: string
    verifier: string
    discordUsername: string
    id?: string
    name?: string
    username?: string
    token?: string,
    isDownloaded: boolean
}

const authSchema = new Schema<IAuth>({
    discordUsername: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        unique: true
    },
    verifier: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    token: {
        type: String,
    },
    isDownloaded: {
        type: Boolean,
        default: false
    }
})

const Auth: Model<IAuth> = models?.Auth || model<IAuth>("Auth", authSchema);

export default Auth