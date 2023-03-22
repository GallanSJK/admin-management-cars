const { Mobil } = require('./models')

class Mobils {
  static records = [];

  constructor(params) {
    this.nama_mobil = params.nama_mobil;
    this.sewa = params.sewa;
    this.ukuran = params.ukuran;
    this.foto = params.foto;
  }

  static create(params) {
    const mobil = new this(params);
    const result = Mobil.create(mobil);
    
    return result;
  }

  static list() {
    const result = Mobil.findAll()
    return result;
  }

  static find(id) {
    const mobil = Mobil.findByPk(id);
    if (!mobil) return null;

    return mobil;
  }

  static delete(id) {
    const mobil = Mobil.destroy({
      where: {
        id: id
      }
    });
    
    return mobil;
  }

  static update(id, params) {
    const mobil = Mobil.update(params, {
      where: {
        id: id
      }
    });
    
    return mobil;
  }

}

module.exports = Mobils;
