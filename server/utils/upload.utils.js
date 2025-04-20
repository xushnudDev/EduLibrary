import path from "path";
import multer from "multer";
import fs from "fs";

// ES modullarda __dirname ni olish
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// uploads papkasining to'liq yo'lini aniqlash
const uploadDir = path.join(__dirname, "uploads");

// uploads papkasi mavjud emas bo'lsa, uni yaratish
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // upload papkasiga saqlash
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Fayl nomi vaqt bo'yicha o'zgartiriladi
  },
});

const upload = multer({ storage: storage });
export default upload;
