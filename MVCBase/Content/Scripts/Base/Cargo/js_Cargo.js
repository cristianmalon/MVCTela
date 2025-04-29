$(function () {
    $("#grid_cargo").css("width", "100%").DataTable({
        lengthMenu: [[10, 20, 100], ["10 en 10", "20 en 20", "100 en 100"]],
        filter: false,
        ordering: false,
        ajax: "/Cargo/GetCargos",
        columns: [
            { data: "DESCRIPCION" },
            {
                data: "FLG_ESTADO", render: function (data, type, full, meta) {
                    return '<center><input class="check-box" disabled="disabled" type="checkbox" ' + (data ? "checked" : "") + '></center>';
                }
            },
            {
                data: "ID_CARGO", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Cargo/EditCargo?ID_CARGO=' + data + '"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }
        ]
    });

    $("#form_cargo").on("submit", function (e) {
        e.preventDefault();
        $("#grid_cargo").dataTable().fnReloadAjax("/Cargo/GetCargos?" + $(this).serialize());
    });
});

function SaveCargo(varId) {
    $.ajax({
        dataType: "json",
        url: "/Cargo/SaveCargo",
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