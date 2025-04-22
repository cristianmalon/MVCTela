$(function () {
    $("#grid_rap").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Rap/GetRaps",
        columns: [
            { data: "DESCRIPCION" },
            { data: "DESCRIPCION_DETALLADA" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_RAP", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Rap/EditRap?ID_RAP=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_rap").on("submit", function (e) {
        e.preventDefault();
        $("#grid_rap").dataTable().fnReloadAjax("/Rap/GetRaps?" + $(this).serialize());
    });
});

function SaveRap(varId) {
    $.ajax({
        dataType: "json",
        url: "/Rap/SaveRap",
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