import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        surah: {
            type: Number,
            required: true
        },
        ayah: {
            type: Number,
            required: true
        },
        ipAddress: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
);

const BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);

export default BookmarkModel;