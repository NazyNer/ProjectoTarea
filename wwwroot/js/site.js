window.onload = function () {
  Default();
}
function FormatearFecha(fecha) {
  var partes = fecha.split("T")[0].split("-");
  var fechaFormateada = partes[2] + "/" + partes[1] + "/" + partes[0];
  return fechaFormateada;
}

function Default() {
  html = $("#Contenido");
  html.empty();
  html.append(`
  <div class="container">
    <button type="button" class="btn btn-success" onclick="CrearNueva()">Nueva tarea</button>
  </div>
  `);
}

function CrearNueva() {
  html = $("#Contenido");
  html.empty();
  html.append(`
    <div class="modal-content">
      <div class="modal-header" id="header">
        <h1 id="h1Categoria" class="modal-title fs-5 ">Tarea</h1>
        <input type="Hidden" id="Id" type="number" value="0" disabled/>
        <button type="button" class="btn-close" onclick="Default()"></button>
      </div>
      <div class="modal-body">
        <form id="form-categoria" class="form-group">
          <label for="">Fecha</label>
          <input type="text" id="datepicker" class="form-control"/>
          <label class="control-label">Descripcion</label>
          <textarea id="Descripcion" name="Descripcion" class="form-control" autocomplete="off"></textarea>
          <label for="" class="form-label">Prioridad</label>
          <select id="Prioridad" class="form-select">
            <option value="0">[Selecciona una prioridad ...]</option>
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
          </select>
          <span class="text-danger" id="lbl-error"></span>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" onclick="Default()">Volver</button>
        <button id="btn-crear" onclick="GuardarCategoria()"type="button" class="btn btn-success">Guardar</button>
      </div>
    </div>
  `);
  Datepicker();
}


function GuardarCategoria() {
  let id = $("#Id").val();
  let fecha = $("#datepicker").val();
  let descripcion = $("#Descripcion").val();
  let prioridad = $("#Prioridad").val();
  let error = $("#lbl-error")
  error.text("");
  if (fecha != null && descripcion != null && prioridad > 0) {
    console.log("completo");
    $.ajax({
      url: '../../Tarea/Guardar',
      type: 'POST',
      dataType: 'json',
      data: { Id: id, Fecha: fecha, Prioridad: prioridad, Descripcion: descripcion },
      async: false,
      success: function (resultado) {
        
      }
  });
  }else{
    error.text("Todos los campos son obligatorios");
  }
}

{/* <input id="btnEliminar" type="button" onclick="eliminarCategoria()" class="btn btn-warning" value="Deshabilitar" />
<input id="btnHabilitar" type="button" onclick="eliminarCategoria()" class="btn btn-primary" value="Habilitar" /> */}


function Datepicker() {
  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '&#x3C;Ant',
    nextText: 'Sig&#x3E;',
    currentText: 'Hoy',
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    showAnim: "fold",
    beforeShow: function (input, inst) {
        inst.settings = $.extend(inst.settings, $.datepicker.regional['es']);
    }
});
}