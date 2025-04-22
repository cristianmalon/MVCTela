$(document).ready(function () {
    $(window).load(function () {


        cargarTipoMotivoEvaLic();

        $("#btnBuscarTipoMotivoEvaLic").click(function () {
            cargarTipoMotivoEvaLic();

        });

        $("#btnLimpiarTipoMotivoEvaLic").click(function () {
            $("#txtDescripcion").val('');

            cargarTipoMotivoEvaLic();
        });



        $("#addNewTipoMotivoEvaLic").click(function () {

            var url = $(this).attr('data-url');
            var divModal = $(this).attr('data-div');
            var divContenedor = $(this).attr('data-contenedor');

            var seccionModal = ".seccionModal";
            var seccionContenedor = ".contenedor";

            if (divModal) {
                seccionModal = "#" + divModal;
            }

            if (divContenedor) {
                seccionContenedor = "#" + divContenedor;
            }

            $.ajax({
                url: url,
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            });

        });

        $("#addModifyTipoMotivoEvaLic").click(function () {


            var dataDetalleTipoMotivoEvaLic = $("#gridTipoMotivoEvaLic").data("kendoGrid");
            var itemDataTipoMotivoEvaLic = dataDetalleTipoMotivoEvaLic.dataItem(dataDetalleTipoMotivoEvaLic.select());
            if (itemDataTipoMotivoEvaLic != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoMotivoEvaLic.XID_TIPO_MOTIVO_EVA_LIC;
                var divModal = $(this).attr('data-div');
                var divContenedor = $(this).attr('data-contenedor');

                var seccionModal = ".seccionModal";
                var seccionContenedor = ".contenedor";

                if (divModal) {
                    seccionModal = "#" + divModal;
                }

                if (divContenedor) {
                    seccionContenedor = "#" + divContenedor;
                }

                $.ajax({
                    url: url,
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                });

            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }


        });


    });
});

function cargarTipoMotivoEvaLic() {

    $("#gridTipoMotivoEvaLic").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoMotivoEvaLic/ListarTipoMotivoEvaLic",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#txtDescripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_MAE_TIPO_MOTIVO_EVA_LIC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_MOTIVO_EVA_LIC: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoMotivoEvaLic").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_MOTIVO_EVA_LIC",
                title: "ID_TIPO_MOTIVO_EVA_LIC",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCIÓN",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}