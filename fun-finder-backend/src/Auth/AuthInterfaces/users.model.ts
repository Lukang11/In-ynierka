import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password?: string;
  fname: string;
  lname: string;
  hobbies: UserHobbies[];
  events: UserEvents[];
  description: string;
  score: number;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  hobbies: { type: [String], required: true },
  events: { type: [Object] },
  description: { type: String, default: "Not set yet" },
  score: { type: Number, default: 0 },
});

export interface UserEvents {
  event_name: string;
  event_time_start: string;
  event_time_end: string;
  event_location: string;
  event_person_count: number;
}
export interface UserHobbies {
  hobbie_id: string;
  hobbie_value: string;
}
