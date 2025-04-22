$(document).ready(function () {
    $(window).load(function () {

       
        cargarEstadoDiscrepanciaDS();

        $("#btnBuscarEstadoDiscrepanciaDS").click(function () {
            cargarEstadoDiscrepanciaDS();

        });

        $("#btnLimpiarEstadoDiscrepanciaDS").click(function () {
            $("#txtDescripcion").val('');
            
            cargarEstadoDiscrepanciaDS();
        });



        $("#addNewEstadoDiscrepanciaDS").click(function () {

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

        $("#addModifyEstadoDiscrepanciaDS").click(function () {


            var dataEstadoDiscrepanciaDS = $("#gridEstadoDiscrepanciaDS").data("kendoGrid");
            var itemDataDiscrepanciaDS = dataEstadoDiscrepanciaDS.dataItem(dataEstadoDiscrepanciaDS.select());
            if (itemDataDiscrepanciaDS != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataDiscrepanciaDS.XESTADO_DISCREPANCIA_DS;
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

function cargarEstadoDiscrepanciaDS() {

    $("#gridEstadoDiscrepanciaDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/EstadoDiscrepanciaDS/ListarEstadoDiscrepanciaDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#txtDescripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_MAE_ESTADO_DISCREPANCIA_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XESTADO_DISCREPANCIA_DS: { type: "string" },
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

    var grid = $("#gridEstadoDiscrepanciaDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XESTADO_DISCREPANCIA_DS",
                title: "ID_ESTADO_DISCREPANCIA_DS",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCION",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}