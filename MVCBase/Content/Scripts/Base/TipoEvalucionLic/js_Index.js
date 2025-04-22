$(document).ready(function () {
    $(window).load(function () {


        cargarGridTipoEvaluacion();

        $("#btnBuscarTipoEvaluacion").click(function () {
            cargarGridTipoEvaluacion();

        });

        $("#btnLimpiarTipoEvaluacion").click(function () {
            $("#descripcion").val('');

            cargarGridTipoEvaluacion();
        });



        $("#addNewTipoEvaluacion").click(function () {

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

        $("#addModifyTipoEvaluacion").click(function () {


            var dataDetalleTipoEvaluacion = $("#gridTipoEvaluacion").data("kendoGrid");
            var itemDataTipoEvaluacion = dataDetalleTipoEvaluacion.dataItem(dataDetalleTipoEvaluacion.select());
            if (itemDataTipoEvaluacion != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoEvaluacion.XID_TIPO_EVALUACION_LIC;
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

function cargarGridTipoEvaluacion() {

    $("#gridNacionalidad").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoEvaluacionLic/ListarTipoEvaluacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_EVALUACION_LIC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_EVALUACION_LIC: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    FLG_LICENCIA: { type: "boolean" },
                    FLG_HABILITACION: { type: "boolean" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoEvaluacion").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_EVALUACION_LIC",
                title: "XID_TIPO_EVALUACION_LIC",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCIÓN",
                flex: 1
            }, {
                field: "FLG_LICENCIA",
                title: "LICENCIA",
                template: "# if (FLG_LICENCIA == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }, {
                field: "FLG_HABILITACION",
                title: "HABILITACION",
                template: "# if (FLG_HABILITACION == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}