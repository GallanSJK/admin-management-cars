const express = require("express");
const path = require("path");
// const swaggerUi = require("swagger-ui-express");
const controllers = require("../app/controllers");
// const swaggerDocument = require("../swagger.json");
const apiRouter = express.Router();

const publicDir = path.join(process.cwd(), "public");

// apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//endpoint static
apiRouter.use("/", express.static("public")); //serve index.html
apiRouter.use("/add", express.static(publicDir + "/car-information.html")); //serve index.html
apiRouter.use("/update/:id", express.static(publicDir + "/update.html"));

//endpoint Uploads
apiRouter.use("/api/uploads", controllers.api.upload.onUpload);

//endpoint API sequelize
apiRouter.get("/api/v1/mobils", controllers.api.v1.mobilController.list); // get Motors (ambil semua data motor)
apiRouter.get(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.show
); // get motor/:id (ambil data motor by id)
apiRouter.post("/api/v1/mobils", controllers.api.v1.mobilController.create); // post motor (menambahkan data motor)
apiRouter.put(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.update
); // put motor/:id (mengedit data motor by id)
apiRouter.delete(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.destroy
); // delete motor/:id (delete data motor by id)

apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.get(
  "/api/v1/whoami",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.whoami
);

apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
