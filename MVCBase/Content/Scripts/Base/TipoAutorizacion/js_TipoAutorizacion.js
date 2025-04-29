$(function () {
    $("#grid_tipo").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/TipoAutorizacion/GetTipoAutorizaciones",
        columns: [
            { data: "DESCRIPCION" },
            { data: "DESCRIPCION_ORIGEN" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_TIPO_AUTORIZACION", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/TipoAutorizacion/EditTipoAutorizacion?ID_TIPO_AUTORIZACION=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_tipo").on("submit", function (e) {
        e.preventDefault();
        $("#grid_tipo").dataTable().fnReloadAjax("/TipoAutorizacion/GetTipoAutorizaciones?" + $(this).serialize());
    });
});

function SaveTipoAutorizacion(varId) {
    $.ajax({
        dataType: "json",
        url: "/TipoAutorizacion/SaveTipoAutorizacion",
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