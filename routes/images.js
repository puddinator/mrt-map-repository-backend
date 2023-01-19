const express = require("express");
const imagesController = require("../controllers/images");

const router = express.Router();

router.post(
  "/images",
  imagesController.uploadImg,
  imagesController.postNewImages
);
router.get("/images", imagesController.getAllImages);
router.delete("/images", imagesController.deleteAllImages);

router.get("/images/:station", imagesController.getStationImages);

router.get("/image/:name", imagesController.getOneImage);
router.post("/image/:name", imagesController.newComment);
router.delete("/image/:name", imagesController.deleteOneImage);

module.exports = router;
