$(document).ready(function () {
    $(window).load(function () {

        $("#descripcion").focus();

        cargarGridCentroMedico();

        $("#btnBuscarCentroMedico").click(function () {
            cargarGridCentroMedico();

        });

        $("#btnLimpiarCentroMedico").click(function () {
            $("#descripcion").val('');
            $("#descripcion").focus();

            cargarGridCentroMedico();
        });



        $("#addNewCentroMedico").click(function () {

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

        $("#addModifyCentroMedico").click(function () {


            var dataDetalleCentroMedico = $("#gridCentroMedico").data("kendoGrid");
            var itemDataCentroMedico = dataDetalleCentroMedico.dataItem(dataDetalleCentroMedico.select());
            if (itemDataCentroMedico != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataCentroMedico.XID_TIPO_CENTRO_MEDICO;
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

function cargarGridCentroMedico() {
    $("#gridCentroMedico").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoCentroMedico/ListarCentroMedico",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_CENTRO_MEDICO",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_CENTRO_MEDICO: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    SIGLA: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridCentroMedico").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_CENTRO_MEDICO",
                title: "XID_TIPO_CENTRO_MEDICO",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCIÓN",
                flex: 1
            }, {
                field: "SIGLA",
                title: "SIGLAS",
                flex: 1,
                width: 300
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}