$(function () {
    $("#grid_estado").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/EstadoCertificacion/GetEstadoAutoCert",
        columns: [
            { data: "DESCRIPCION" },
            {
                data: "FLG_CERTIFICACION", render: function (data, type, full, meta) {
                    return '<center>' + (data ? "CERTIFICACION" : "AUTORIZACION") + '</center>';
                }
            },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_ESTADO_AUTO_CERT", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/EstadoCertificacion/EditEstadoAutoCert?ID_ESTADO_AUTO_CERT=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_estado").on("submit", function (e) {
        e.preventDefault();
        $("#grid_estado").dataTable().fnReloadAjax("/EstadoCertificacion/GetEstadoAutoCert?" + $(this).serialize());
    });
});

function SaveEstadoCertificacion(varId) {
    $.ajax({
        dataType: "json",
        url: "/EstadoCertificacion/SaveEstadoAutoCert",
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