$(function () {
    $("#grid_pais").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Pais/GetPaises",
        columns: [
            { data: "DESCRIPCION" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_PAIS", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Pais/EditPais?ID_PAIS=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_pais").on("submit", function (e) {
        e.preventDefault();
        $("#grid_pais").dataTable().fnReloadAjax("/Pais/GetPaises?" + $(this).serialize());
    });
});

function SavePais(varId) {
    $.ajax({
        dataType: "json",
        url: "/Pais/SavePais",
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