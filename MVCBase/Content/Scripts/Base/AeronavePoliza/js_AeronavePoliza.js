$(function () {
    $("#grid_poliza").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ajax: "/AeronavePoliza/GetAeronavePoliza",
        columns: [
            {
                data: "ID_AERONAVE_POLIZA", render: function (data, type, full, meta) {
                    return '<input type="checkbox" name="ID_AERONAVE_POLIZA" value="' + data +'">';
                }
            },
            { data: "NUMERO_MATRICULA" },
            { data: "RAZON_SOCIAL" },
            { data: "ESTADO_POLIZA" },
            {
                data: "FEC_VIGENCIA", render: function (data, type, full, meta) {
                    var date = eval(data.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
                    return date.getDate() + "/" + (date.getMonth() > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "/" + date.getFullYear();
                }
            },
            {
                data: "FEC_FIN", render: function (data, type, full, meta) {
                    var date = eval(data.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
                    return date.getDate() + "/" + (date.getMonth() > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "/" + date.getFullYear();
                }
            },
            { data: "ASEGURADORA" }
        ]
    });

    $("#form_poliza").on("submit", function (e) {
        e.preventDefault();
        $("#grid_usuario").dataTable().fnReloadAjax("/AeronavePoliza/GetAeronavePoliza?" + $(this).serialize());
    });
});

function SavePoliza(varId) {
    var form = $(varId).serialize();
    $.getJSON("/AeronavePoliza/SaveAeronavePoliza?" + form, function (data) {
        if (!data.rpta) {
            errorAddModelo("divError", "ulListaError", data.errores);
        } else {
            window.location = data.url;
        }
    });
}