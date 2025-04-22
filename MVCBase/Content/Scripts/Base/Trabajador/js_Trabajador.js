$(function () {
    $("#grid_trabajador").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Trabajador/GetTrabajadores?",
        columns: [
            { data: "FULLNAME_PERSONA_NATURAL" },
            { data: "CARGO" },
            { data: "DIRECCION_MTC" },
            { data: "COORDINACION_TECNICA" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_TRABAJADOR", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Trabajador/EditTrabajador?ID_TRABAJADOR=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_trabajador").on("submit", function (e) {
        e.preventDefault();
        $("#grid_trabajador").dataTable().fnReloadAjax("/Trabajador/GetTrabajadores?" + $(this).serialize());
    });
});

function ResetTextBox() {
    $("#ID_PERSONA_NATURAL").val(0);
    $("#FULLNAME_PERSONA_NATURAL").val("");
    $("#FULLNAME_PERSONA_NATURAL").prop("readonly", false);
}

function SaveTrabajador(varId) {
    $.ajax({
        dataType: "json",
        url: "/Trabajador/SaveTrabajador",
        beforeSend: function (xhr, settings) {
            ($("#ID_PERSONA_NATURAL").val() == 0) && $("#FULLNAME_PERSONA_NATURAL").val("");

            (kendo.parseDate($("#FEC_CONTRATO").val()) == null) && $("#FEC_CONTRATO").val("");

            (kendo.parseDate($("#FEC_FIN").val()) == null) && $("#FEC_FIN").val("");

            settings.url = settings.url + "?" + $(varId).serialize();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divError", "ulListaError", data.errores);
            } else {
                window.location = data.url;
            }
        }
    });
}