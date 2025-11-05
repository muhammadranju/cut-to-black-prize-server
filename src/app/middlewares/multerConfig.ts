import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (
      file.fieldname === 'pdf' &&
      !file.mimetype.startsWith('application/pdf')
    ) {
      return cb(new Error('Only PDF files allowed for script'));
    }
    if (
      file.fieldname === 'synopsis' &&
      !['application/pdf', 'application/msword'].includes(file.mimetype)
    ) {
      return cb(new Error('Only PDF or DOC for synopsis'));
    }
    cb(null, true);
  },
});

export default upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'synopsis', maxCount: 1 },
]);
