const express = require("express");
const Mobils = require("./mobil");
const bodyParser = require('body-parser')
const app = express();
const jsonParser = bodyParser.json()
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(express.json())

//endpoint API sequelize
//list
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
  
})
//create
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
})
//Find Mobil By Id
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
})
//Update
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
})
// Delete
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
})

//with ejs
app.get("/", async (req, res) => {
  let data = []
    try {
        const mobil = await Mobils.list(req.body);
        data = mobil
    } catch (error) {
        console.log(error)
    }
    
    res.render("index", {
        data:data
    })
});

app.get("/list-cars", (req, res) => {
 res.render("car-information");
});

app.use((req, res) => {
  res.send("Mau kemana bos?");
});

app.listen(PORT, () => {
  console.log(`Express nyala di http://localhost:${PORT}`);
});