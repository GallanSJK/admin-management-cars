const { Mobil } = require("../../../models");

module.exports = {
  list(req, res) {
    Mobil.findAll()
      .then((mobils) => {
        res.status(200).json(mobils);
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    Mobil.create(req.body)
      .then((mobil) => {
        res.status(201).json({
          status: "OK",
          data: mobil,
        });
      })
      .catch((err) => {
        res.status(201).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    const mobil = req.mobil;

    mobil
      .update(req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
          data: mobil,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    const mobil = req.mobil;

    res.status(200).json(mobil);
  },

  destroy(req, res) {
    req.mobil
      .destroy()
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  setMobil(req, res, next) {
    Mobil.findByPk(req.params.id)
      .then((mobil) => {
        if (!mobil) {
          res.status(404).json({
            status: "FAIL",
            message: "Mobil not found!",
          });

          return;
        }

        req.mobil = mobil;
        next();
      })
      .catch((err) => {
        res.status(404).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  // getMobil(req, res, next) {
  //   Mobil.findAll({
  //     where: {
  //       id: req.params.id,
  //     },
  //   })
  //     .then((mobil) => {
  //       if (!mobil) {
  //         res.status(404).json({
  //           status: "FAIL",
  //           message: "Mobil not found!",
  //         });

  //         return;
  //       }

  //       req.mobil = mobil;
  //       next();
  //     })
  //     .catch((err) => {
  //       res.status(404).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },
};
