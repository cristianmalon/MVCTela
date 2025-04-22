$(function () {
    $("#grid_giro").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Giro/GetGiros",
        columns: [
            { data: "DESCRIPCION" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_GIRO", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Giro/EditGiro?ID_GIRO=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_giro").on("submit", function (e) {
        e.preventDefault();
        $("#grid_giro").dataTable().fnReloadAjax("/Giro/GetGiros?" + $(this).serialize());
    });
});

function SaveGiro(varId) {
    $.ajax({
        dataType: "json",
        url: "/Giro/SaveGiro",
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