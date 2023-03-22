# Admin-management-cars

<div>
<p>Entity Relationship Diagram With dbdiagram.io</p>
<img width="960" alt="Screenshot 2023-03-22 215527" src="https://user-images.githubusercontent.com/90021411/226944686-3451e817-d620-4440-9066-017b49b2bd9c.png">
</div>

<div>
<h2>Link Untuk Masing Masing Halaman</h2>
<p>1. Link Untuk Melihat List Cars : <a href="http://localhost:8000/">http://localhost:8000/</a></p>
<p>2. Link Untuk Mengakases Tambah Data Mobil : <a href="http://localhost:8000/list-cars">http://localhost:8000/list-cars</a></p>
</div>

<div>
<h2>End Point dari REST API Sequelieze dan sql (menggunakan body parser)</h2>
<p><b>=> Menampilkan Semua List Mobil</b></p>
<p>
app.get('/api/v1/mobil', async (req, res) => {
  try {
    const mobil = await Mobils.list();
    res.status(200).json(mobil)
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error
    })
  }
  
})</p>

<p><b>=> Menampilkan List Mobil By Id</b></p>
<p>
app.get('/api/v1/mobil/:id', async (req, res) => {
  try {
    const mobil = await Mobils.find(req.params.id);
    if(!mobil) res.status(404).json({
        error: "Mobil Tidak Ditemukan"
    })  
    res.status(200).json(mobil)
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error
    })
  }
})</p>

<p><b>=> Menampilkan Data Mobil Menggunakan body-parser (dapat digunakan dipostman)</b></p>
<p>
app.post('/api/v1/mobil', jsonParser, async (req, res) => {
  try {
    const mobil = await Mobils.create(req.body);
    res.status(201).json({
    message: "Sukses",
    data: mobil
  })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error
    })
  }
})</p>

<p><b>=> Mengedit Data Mobil</b></p>
<p>
app.post('/api/v1/mobil/:id', async (req, res) => {
  try {
    const mobil = await Mobils.update(req.params.id, req.body);
    if(!mobil) res.status(404).json({
        error: "Mobil Tidak Ditemukan"
    })  
    res.status(200).json(mobil)
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error
    })
  }
})</p>

<p><b>=> Menghapus Data Mobil</b></p>
<p>
app.delete('/api/v1/mobil/:id', async (req, res) => {
  try {
    const mobil = await Mobils.delete(req.params.id);
    if(!mobil) res.status(404).json({
        error: "Mobil Tidak Ditemukan"
    })
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error
    })
  }
})</p>


</div>
