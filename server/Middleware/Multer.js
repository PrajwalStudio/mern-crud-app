const multer = require("multer");
const path = require("path");

const imagestorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "Uploads/");
	},
	filename: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		cb(null, `${Date.now()}${extension}`);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
		return;
	}

	cb(new Error("Only image files are allowed"), false);
};

const upload = multer({
	storage: imagestorage,
	fileFilter,
});

module.exports = upload;
