(function () {
  window.DIORAMA_3D_MODELS = window.DIORAMA_3D_MODELS || {};
  if (window.DAKLAK_3D_MODELS) {
    Object.keys(window.DAKLAK_3D_MODELS).forEach(function (k) {
      window.DIORAMA_3D_MODELS[k] = window.DAKLAK_3D_MODELS[k];
      var domImg = document.querySelector('.island-3d-item[data-id="' + k + '"] .diorama-img');
      if (domImg) domImg.src = window.DAKLAK_3D_MODELS[k];
      if (window.DEST_DATA && window.DEST_DATA[k]) {
        window.DEST_DATA[k].model3d = window.DAKLAK_3D_MODELS[k];
      }
    });
  }
})();
