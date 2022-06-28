import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: `./tmp`,
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop(); //TODO png
    const name = `${Date.now()}.${extension}`; //TODO 213131231.png
    cb(null, name);
  },
});
