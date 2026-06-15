import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
    {
        name: {
            type: String,
            required: [true, "Skill name is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Skill image is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Skill: Model<ISkill> =
    mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
