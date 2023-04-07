# Admin-management-cars

<div>
<p>Entity Relationship Diagram With dbdiagram.io</p>
<img width="960" alt="Screenshot 2023-03-22 215527" src="https://user-images.githubusercontent.com/90021411/226944686-3451e817-d620-4440-9066-017b49b2bd9c.png">
</div>

<div>
<h2>Link Untuk Masing Masing Halaman</h2>
<p>1. Link Untuk Login : <a href="http://localhost:8000/">http://localhost:8000/</a></p>
<p>1. Link Untuk Register : <a href="http://localhost:8000/register">http://localhost:8000/register</a></p>
<p>2. Link Untuk Melihat Data Mobil : <a href="http://localhost:8000/list">http://localhost:8000/list</a></p>
<p>2. Link Untuk Menambah Data Mobil : <a href="http://localhost:8000/add">http://localhost:8000/add</a></p>
<p>3. Link Untuk Mengakases Edit Data Mobil : <a href="http://localhost:8000/update">http://localhost:8000/update</a></p>
</div>

<div>
<h2>End Point dari REST API Sequelieze</h2>
<p><b>=> Dokumentasi API Menggunakan swagger</b></p>
<p>
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
</p>

<p><b>=> Menambahkan Data User</b></p>
<p>
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
</p>

<p><b>=> Melakukan Login</b></p>
<p>
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
</p>

<p><b>=> Mengecek Data User Menggunakan Token</b></p>
<p>
apiRouter.get(
  "/api/v1/whoami",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.whoami
);
</p>

<p><b>=> Menampilkan Semua List Mobil</b></p>
<p>
apiRouter.get("/api/v1/mobils", controllers.api.v1.mobilController.list);
</p>

<p><b>=> Menampilkan List Mobil By Id</b></p>
<p>
apiRouter.get(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.show
);</p>

<p><b>=> Menambahkan Data Mobil</b></p>
<p>
apiRouter.post("/api/v1/mobils", controllers.api.v1.mobilController.create);
</p>

<p><b>=> Mengedit Data Mobil</b></p>
<p>
apiRouter.put(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.update
);</p>

<p><b>=> Menghapus Data Mobil</b></p>
<p>
apiRouter.delete(
  "/api/v1/mobils/:id",
  controllers.api.v1.mobilController.setMobil,
  controllers.api.v1.mobilController.destroy
);</p>

</div>
