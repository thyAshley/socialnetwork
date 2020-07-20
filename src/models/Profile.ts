import mongoose from "mongoose";
import { IUserSchema } from "./User";

export interface IProfileSchema extends mongoose.Document {
  user: IUserSchema["_id"];
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  bio: string;
  githubusername: string;
  experience: [
    {
      _id?: string;
      title: string;
      company: string;
      location: string;
      from: Date;
      to: Date;
      current: boolean;
      description: string;
    }
  ];
  education: [
    {
      school: string;
      degree: string;
      fieldofstudy: string;
      from: Date;
      to: Date;
      current: Boolean;
      description: string;
    }
  ];
  social: {
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  date: Date;
}

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      id: {
        type: String,
      },
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IProfileSchema>("Profile", profileSchema);
