$(document).ready(function () {
    $(window).load(function () {


        cargarTipoResultadoExamen();

        $("#btnBuscarTipoResultadoExamen").click(function () {
            cargarTipoResultadoExamen();

        });

        $("#btnLimpiarTipoResultadoExamen").click(function () {
            $("#txtDescripcion").val('');

            cargarTipoResultadoExamen();
        });



        $("#addNewTipoResultadoExamen").click(function () {

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

        $("#addModifyTipoResultadoExamen").click(function () {


            var dataDetalleTipoResultadoExamen = $("#gridTipoResultadoExamen").data("kendoGrid");
            var itemDataTipoResultadoExamen = dataDetalleTipoResultadoExamen.dataItem(dataDetalleTipoResultadoExamen.select());
            if (itemDataTipoResultadoExamen != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoResultadoExamen.XID_TIPO_RESULTADO_EXAMEN;
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

function cargarTipoResultadoExamen() {

    $("#gridTipoResultadoExamen").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoResultadoExamen/ListarTipoResultadoExamen",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#txtDescripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_RESULTADO_EXAMEN",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_RESULTADO_EXAMEN: { type: "string" },
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

    var grid = $("#gridTipoResultadoExamen").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_RESULTADO_EXAMEN",
                title: "ID_TIPO_RESULTADO_EXAMEN",
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