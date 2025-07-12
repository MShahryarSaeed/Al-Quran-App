import BookmarkModel from "../../../models/Bookmark.model.js";


export const createBookmark = async (req, res) => {

    const { userId, surah, ayah } = req.body;
    const ipAddress = req.clientIp; // Get user's IP address

    console.log(ipAddress);
    


    const bookmark = await BookmarkModel.create({
        userId: userId,
        surah: surah,
        ayah: ayah,
        ipAddress: ipAddress
    });


    if (!bookmark) {

        return res.status(400).json({
            status: 'fail',
            error: 'Bookmark creation Failed'
        });
    }

    res.status(201).json({
        status: 'success',
        message: 'Bookmark created successfully',
        bookmark: bookmark
    });

}


