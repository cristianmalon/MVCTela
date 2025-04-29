$(document).ready(function () {
    $(window).load(function () {


        cargarGridTipoActividadDS();

        $("#btnBuscarTipoActividadDS").click(function () {
            cargarGridTipoActividadDS();

        });

        $("#btnLimpiarTipoActividadDS").click(function () {
            $("#descripcion").val('');

            cargarGridTipoActividadDS();
        });



        $("#addNewTipoActividadDS").click(function () {

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

        $("#addModifyTipoActividadDS").click(function () {


            var dataDetalleTipoActividadDS = $("#gridTipoActividadDS").data("kendoGrid");
            var itemDataTipoActividadDS = dataDetalleTipoActividadDS.dataItem(dataDetalleTipoActividadDS.select());
            if (itemDataTipoActividadDS != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoActividadDS.XTIPO_ACTIVIDAD_DS;
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


function cargarGridTipoActividadDS() {

    $("#gridTipoActividadDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoActividadDS/ListarTipoActividadDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_ACTIVIDAD_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XTIPO_ACTIVIDAD_DS: { type: "string" },
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

    var grid = $("#gridTipoActividadDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XTIPO_ACTIVIDAD_DS",
                title: "ID_TIPO_ACTIVIDAD_DS",
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