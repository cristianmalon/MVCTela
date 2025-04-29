$(function () {
    $("#grid_habilitacion").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Habilitacion/GetHabilitaciones",
        columns: [
            { data: "DESCRIPCION" },
            { data: "GIRO" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_HABILITACION", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Habilitacion/EditHabilitacion?ID_HABILITACION=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_habilitacion").on("submit", function (e) {
        e.preventDefault();
        $("#grid_habilitacion").dataTable().fnReloadAjax("/Habilitacion/GetHabilitaciones?" + $(this).serialize());
    });
});

function SaveHabilitacion(varId) {
    $.ajax({
        dataType: "json",
        url: "/Habilitacion/SaveHabilitacion",
        data: $(varId).serialize(),
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divError", "ulListaError", data.errores);
            } else {
                window.location = data.url;
            }
        }
    });
}