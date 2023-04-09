const app = document.getElementById("app");
const update = document.getElementById("update");
const fileForm = document.getElementById("file");
const render = (el, html) => {
  el.innerHTML = html;
};
init();

async function init() {
  if (app) {
    let html = "";
    console.log(Date.now());
    fetch("http://localhost:8000/api/v1/mobils")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((el, i) => {
          html += `<table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Mobil</th>
                            <th>Sewa Per Hari</th>
                            <th>Size</th>
                            <th>Foto</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>${i + 1}</td>
                            <td>${el.nama_mobil}</td>
                            <td>${el.sewa}</td>
                            <td>${el.ukuran}</td>
                            <td><img class="img-size-50" src="${
                              el.foto
                            }" /></td>
                            <td>
                              <a href="/update/${el.id}">
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                              </a>
                              <button
                                type="button"
                                class="btn btn-danger"
                                onclick="handleDelete(${el.id})"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                      
                        </tbody>
                      </table>`;
        });

        render(app, html);
      })
      .catch((err) => console.log(err));
  }
  if (update) {
    onEdit();
  }
}

function handleUpload(e) {
  const image = e.target.files[0];
  let formData = new FormData();

  formData.append("image", image);
  fetch("http://localhost:8000/api/uploads", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      document.getElementById("foto").value = res.data;
      document.getElementById("statusUpload").innerHTML = "Uploaded!";
    });
}

function handleAdd(e) {
  const image = document.getElementById("file").files[0];
  const foto = document.getElementById("foto");
  const inputNama = document.getElementById("inputNama");
  const inputSewa = document.getElementById("inputSewa");
  const inputSize = document.getElementById("inputSize");
  if (image && !foto) {
    console.log("wait for upload");
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="alert alert-warning alert-dismissible fade show " role="alert">
                Silahkan tunggu upload!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    );
    return;
  }

  fetch("http://localhost:8000/api/v1/mobils/", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({
      nama_mobil: inputNama.value,
      sewa: inputSewa.value,
      ukuran: inputSize.value,
      foto: foto.value,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      document.body.insertAdjacentHTML(
        "afterbegin",
        `
                <div class="alert alert-primary" role="alert">
                    ${res}, halaman akan kembali ke home!
                </div>
            `
      );

      setTimeout(() => {
        window.location.href = "http://localhost:8000/list";
      }, 2000);
    });

  e.preventDefault();
}

function handleRegist(e) {
  const inputFN = document.getElementById("inputFN");
  const inputLN = document.getElementById("inputLN");
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");

  fetch("http://localhost:8000/api/v1/register", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({
      firstName: inputFN.value,
      lastName: inputLN.value,
      email: inputEmail.value,
      password: inputPassword.value,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      document.body.insertAdjacentHTML(
        "afterbegin",
        `
                <div class="alert alert-primary" role="alert">
                    ${res}, halaman akan kembali ke home!
                </div>
            `
      );

      setTimeout(() => {
        window.location.href = "http://localhost:8000/";
      }, 200000);
    });

  e.preventDefault();
}

function handleEdit(e) {
  const image = document.getElementById("file").files[0];
  const foto = document.getElementById("foto");
  const inputNama = document.getElementById("inputNama");
  const inputSewa = document.getElementById("inputSewa");
  const inputSize = document.getElementById("inputSize");
  const id = document.getElementById("id");
  if (image && !foto) {
    console.log("wait for upload");
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="alert alert-warning alert-dismissible fade show " role="alert">
                Silahkan tunggu upload!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    );
    return;
  }

  fetch("http://localhost:8000/api/v1/mobils/" + id.value, {
    headers: { "Content-Type": "application/json" },
    method: "put",
    body: JSON.stringify({
      nama_mobil: inputNama.value,
      sewa: inputSewa.value,
      ukuran: inputSize.value,
      foto: foto.value,
      id: id.value,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      document.body.insertAdjacentHTML(
        "afterbegin",
        `
                <div class="alert alert-primary" role="alert">
                    ${res}, halaman akan kembali ke home!
                </div>
            `
      );

      setTimeout(() => {
        window.location.href = "http://localhost:8000/list";
      }, 2000);
    });

  e.preventDefault();
}

async function handleDelete(id) {
  if (confirm("Apakah Yakin Ingin Menghapus Data?") == true) {
    await fetch(`http://localhost:8000/api/v1/mobils/${id}`, {
      method: "delete",
    });

    setTimeout(() => {
      window.location.href = "http://localhost:8000/list";
    }, 2000);
  } else {
  }
}

async function onEdit() {
  const id = window.location.href.split("/").pop();

  await fetch("http://localhost:8000/api/v1/mobils/" + id)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        document.getElementById("id").value = id;
        document.getElementById("inputNama").value = data.nama_mobil;
        document.getElementById("inputSewa").value = data.sewa;
        document.getElementById("inputSize").value = data.ukuran;
        document.getElementById("inputFoto").value = data.foto;
      }
    });
}
