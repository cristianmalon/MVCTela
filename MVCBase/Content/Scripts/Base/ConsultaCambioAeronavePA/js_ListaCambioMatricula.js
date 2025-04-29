$(function () {
    $("#grid_cambio").css("width", "100%").DataTable({
        lengthMenu: [[5, 10, 20, 100], ["5 en 5", "10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ajax: "/ConsultaCambioAeronavePAMatricula/GetCambioMatriculas",
        columns: [
            { data: "MATRICULA_NUEVA" },
            { data: "MATRICULA_ANTERIOR"},
            { data: "TIPO_CAMBIO_MATRICULA_PA" },
            { data: "NRO_TITULO" },
            { data: "DICTAMEN" },
            { data: "TOMO" },
            {
                data: "ID_CAMBIO_MATRICULA_PA", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-sm modalMTC" data-url="/ConsultaCambioAeronavePAMatricula/EditCambioMatricula?ID_CAMBIO_MATRICULA_PA=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_cambio").on("submit", function (e) {
        e.preventDefault();
        $("#grid_cambio").dataTable().fnReloadAjax("/ConsultaCambioAeronavePAMatricula/GetCambioMatriculas?" + $(this).serialize());
    });
});

function SaveCambio(varId) {
    var form = $(varId).serialize();
    $.getJSON("/ConsultaCambioAeronavePAMatricula/SaveCambioMatricula?" + form, function (data) {
        if (!data.rpta) {
            errorAddModelo("divError", "ulListaError", data.errores);
        } else {
            window.location = data.url;
        }
    });
}