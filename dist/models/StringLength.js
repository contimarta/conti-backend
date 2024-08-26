import { Schema, model } from "mongoose";
const stringLengthSchema = new Schema({
    stringLength: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const StringLength = model("stringlengths", stringLengthSchema);
export default StringLength;
