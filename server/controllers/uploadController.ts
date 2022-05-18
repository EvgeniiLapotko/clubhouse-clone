export const uploadFile = (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename}`,
  });
};
