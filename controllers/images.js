const multer = require("multer");
const Images = require("../models/images");

const storage = multer.diskStorage({
  // eslint-disable-next-line func-names, object-shorthand
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // eslint-disable-next-line func-names, object-shorthand
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImg = multer({ storage }).single("image");

const postNewImages = (req, res) => {
  Images.findOne({ name: req.body.name }, (err, data) => {
    if (!data) {
      const newImage = new Images({
        name: req.body.name,
        description: req.body.description,
        station: req.body.station,
        image: req.file.path,
      });
      newImage.save((err2, data2) => {
        if (err2) return res.json({ Error: err2 });
        return res.json(data2);
      });
    } else {
      if (err)
        return res.json(`Something went wrong, please try again. ${err}`);
      return res.json({ message: "Station already exists" });
    }
    return true;
  });
};

const getAllImages = (req, res) => {
  Images.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

const deleteAllImages = (req, res) => {
  Images.deleteMany({}, (err) => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  });
};

const getStationImages = (req, res) => {
  const { station } = req.params;

  Images.find({ station }, (err, data) => {
    if (err || !data) return res.json({ message: "Station doesn't exist." });
    return res.json(data);
  });
};

const getOneImage = (req, res) => {
  const { name } = req.params;

  Images.findOne({ name }, (err, data) => {
    if (err || !data)
      return res.json({ message: "Station image doesn't exist." });
    return res.json(data);
  });
};

const newComment = (req, res) => {
  const { name } = req.params;
  const newCommentText = req.body.comment;

  const comment = {
    text: newCommentText,
    date: new Date(),
  };

  Images.findOne({ name }, (err, data) => {
    if (err || !data || !newComment) {
      return res.json({ message: "Station image doesn't exist." });
    }

    data.comments.push(comment);

    data.save((err2) => {
      if (err2)
        return res.json({ message: "Comment failed to add.", error: err2 });
      return res.json(data);
    });
    return true;
  });
};

const deleteOneImage = (req, res) => {
  const { name } = req.params;

  Images.deleteOne({ name }, (err, data) => {
    if (data.deletedCount === 0)
      return res.json({ message: "Station image doesn't exist." });

    if (err) return res.json(`Something went wrong, please try again. ${err}`);

    return res.json({ message: "Image deleted." });
  });
};

module.exports = {
  uploadImg,
  postNewImages,
  getAllImages,
  deleteAllImages,
  getStationImages,
  getOneImage,
  newComment,
  deleteOneImage,
};
