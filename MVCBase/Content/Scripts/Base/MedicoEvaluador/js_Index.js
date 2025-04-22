$(document).ready(function () {
    $(window).load(function () {
        $("#descripcion").focus();

        cargarGridMedicoEvaluador();

        $("#btnBuscarMedicoEvaluador").click(function () {
            cargarGridMedicoEvaluador();

        });

        $("#btnLimpiarMedicoEvaluador").click(function () {
            $("#descripcion").val('');
            $("#descripcion").focus();

            cargarGridMedicoEvaluador();
        });



        $("#addNewMedicoEvaluador").click(function () {

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

        $("#addModifyMedicoEvaluador").click(function () {


            var dataDetalleMedicoEvaluador = $("#gridMedicoEvaluador").data("kendoGrid");
            var itemDataMedicoEvaluador = dataDetalleMedicoEvaluador.dataItem(dataDetalleMedicoEvaluador.select());
            if (itemDataMedicoEvaluador != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataMedicoEvaluador.XID_MEDICO_EVALUADOR;
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

function cargarGridMedicoEvaluador() {

    $("#gridMedicoEvaluador").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/MedicoEvaluador/ListarMedicoEvaluador",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_MEDICO_EVALUADOR",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_MEDICO_EVALUADOR: { type: "string" },
                    XID_TIPO_CENTRO_MEDICO: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    DESCRIPCION_CENTRO_MEDICO: { type: "string" },
                    CARGO: { type: "string" },
                    RANGO: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridMedicoEvaluador").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_MEDICO_EVALUADOR",
                title: "ID_MEDICO_EVALUADOR",
                hidden: true
            }, {
                field: "XID_TIPO_CENTRO_MEDICO",
                title: "ID_TIPO_CENTRO_MEDICO",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "LOCAL",
                flex: 1
            }, {
                field: "DESCRIPCION_CENTRO_MEDICO",
                title: "CENTRO MÉDICO",
                flex: 1
            }, {
                field: "CARGO",
                title: "CARGO",
                flex: 1
            }, {
                field: "RANGO",
                title: "RANGO",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}