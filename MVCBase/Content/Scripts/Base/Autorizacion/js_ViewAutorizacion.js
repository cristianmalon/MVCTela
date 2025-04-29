$(function () {
    $("#grid_historico").css("width", "100%").DataTable({
        lengthMenu: [[5, 10], ["5 en 5", "10 en 10"]],
        filter: false,
        ordering: false,
        ajax: "/Autorizacion/GetHistoricos?id_persona=" + $("#XPERSONAJURIDICA").val(),
        columns: [
            { data: "SITUACION" },
            { data: "DESCRIPCION" },
            { data: "RESOLUCION_DIRECTORIAL" },
            { data: "FECHA_INICIO_H" },
            { data: "FECHA_CADUCIDAD_H" },
            { data: "DESC_ESTADO" },
            { data: "LOGIN" },
            { data: "FEC_HISTORICO" }
            /*,
            {
                data: "XID_HISTORICO", render: function (data, type, full, meta) {
                    return '<button type="button" class="btn btn-default btn-xs modalMTC" data-url="/Autorizacion/DetalleHistorico"><span class="glyphicon glyphicon-pencil"></span></button>';
                }
            }*/
        ]
    });

    /*$("#form_cargo").on("submit", function (e) {
        e.preventDefault();
        $("#grid_cargo").dataTable().fnReloadAjax("/Cargo/GetCargos?" + $(this).serialize());
    });*/
});
