import path from 'path';
import multer from 'multer';
import crypt from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),
  storage: multer.diskStorage({
    // '..' means skip to folders
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypt.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
