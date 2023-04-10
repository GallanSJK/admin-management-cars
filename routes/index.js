const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const controllers = require("../app/controllers");
const swaggerDocument = require("../openapi.json");
const apiRouter = express.Router();

const publicDir = path.join(process.cwd(), "public");

apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // dokumentasi menggunakan swagger

//endpoint static
apiRouter.use("/", express.static("public")); //serve index.html
apiRouter.use("/register", express.static(publicDir + "/register.html")); // untuk register user

apiRouter.use("/list", express.static(publicDir + "/car-list.html")); // untuk menampilkan seluruh mobil
apiRouter.use("/add", express.static(publicDir + "/car-information.html")); // untuk menambahkan data mobil
apiRouter.use("/update/:id", express.static(publicDir + "/update.html")); // untuk mengupdate data mobil

//endpoint Uploads
apiRouter.use("/api/uploads", controllers.api.upload.onUpload); // untuk upload foto

//endpoint API sequelize
apiRouter.get("/api/v1/mobils", controllers.api.v1.mobilController.list); // get Mobil (ambil semua data mobil)
// apiRouter.get(
//   "/api/v1/mobils",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.mobilController.list
// ); // dengan authorize

apiRouter.get(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.show
); // get mobil/:id (ambil data mobil by id)
// apiRouter.get(
//   "/api/v1/mobils/:id",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.mobilController.setMobil,
//   controllers.api.v1.mobilController.show
// ); // dengan authorize

apiRouter.post("/api/v1/mobils", controllers.api.v1.mobilController.create); // post mobil (menambahkan data mobil)
// apiRouter.post(
//   "/api/v1/mobils",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.mobilController.create
// ); // dengan authorize

apiRouter.put(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.update
); // put mobil/:id (mengedit data mobil by id)
// apiRouter.put(
//   "/api/v1/mobils/:id",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.mobilController.setMobil,
//   controllers.api.v1.mobilController.update
// ); // dengan authorize

apiRouter.delete(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.destroy
); // delete mobil/:id (delete data mobil by id)
// apiRouter.delete(
//   "/api/v1/mobils/:id",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.mobilController.setMobil,
//   controllers.api.v1.mobilController.destroy
// ); // dengan authorize

apiRouter.post("/api/v1/register", controllers.api.v1.authController.register); // post register (daftar user)
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login); // post login (melakukan login menggunakan email dan password)
apiRouter.get(
  "/api/v1/whoami",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.whoami
); // get whoami (untuk mendapat data user menggunakan token)

apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
