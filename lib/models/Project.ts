import mongoose, { Schema, Document, Model } from "mongoose";
import { ISkill } from "./Skill";

export interface IProject extends Document {
    Project_number: string;
    project_name: string;
    Project_status: string;
    Project_type: string;
    project_description: string;
    Tech_stack: mongoose.Types.ObjectId[] | ISkill[];
    img1: string;
    link_To_Live: string;
    Link_To_Repo: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        Project_number: {
            type: String,
            required: [true, "Project number is required"],
            trim: true,
        },
        project_name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
        },
        Project_status: {
            type: String,
            required: [true, "Project status is required"],
            trim: true,
        },
        Project_type: {
            type: String,
            required: [true, "Project type is required"],
            trim: true,
        },
        project_description: {
            type: String,
            required: [true, "Project description is required"],
            trim: true,
        },
        Tech_stack: [
            {
                type: Schema.Types.ObjectId,
                ref: "Skill",
            },
        ],
        img1: {
            type: String,
            required: [true, "Project image is required"],
            trim: true,
        },
        link_To_Live: {
            type: String,
            trim: true,
            default: "",
        },
        Link_To_Repo: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
