$(document).ready(function () {
    $(window).load(function () {


        cargarGridEstadoActividadDS();

        $("#btnBuscarEstadoActividadDS").click(function () {
            cargarGridEstadoActividadDS();

        });

        $("#btnLimpiarEstadoActividadDS").click(function () {
            $("#descripcion").val('');

            cargarGridEstadoActividadDS();
        });



        $("#addNewEstadoActividadDS").click(function () {

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

        $("#addModifyEstadoActividadDS").click(function () {


            var dataDetalleEstadoActividadDS = $("#gridEstadoActividadDS").data("kendoGrid");
            var itemDataEstadoActividadDS = dataDetalleEstadoActividadDS.dataItem(dataDetalleEstadoActividadDS.select());
            if (itemDataEstadoActividadDS != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataEstadoActividadDS.XESTADO_ACTIVIDAD_DS;
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


function cargarGridEstadoActividadDS() {

    $("#gridEstadoActividadDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/EstadoActividadDS/ListarEstadoActividadDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_ESTADO_ACTIVIDAD_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XESTADO_ACTIVIDAD_DS: { type: "string" },
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

    var grid = $("#gridEstadoActividadDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XESTADO_ACTIVIDAD_DS",
                title: "ID_ESTADO_ACTIVIDAD_DS",
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