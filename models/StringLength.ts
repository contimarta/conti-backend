import { Schema, model } from "mongoose";

interface StringLengthData {
	stringLength: number;
	user: Schema.Types.ObjectId;
}

const stringLengthSchema = new Schema<StringLengthData>({
	stringLength: { type: Number, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const StringLength = model<StringLengthData>(
	"stringlengths",
	stringLengthSchema
);

export default StringLength;
