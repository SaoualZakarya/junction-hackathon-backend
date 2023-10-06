const uploadImageController = (req, res) => {
    const imagePath = req.file.path
    console.log(req.file)
    res.status(200).json({ message: 'Image uploaded successfully', imagePath: imagePath });
}
module.exports = uploadImageController