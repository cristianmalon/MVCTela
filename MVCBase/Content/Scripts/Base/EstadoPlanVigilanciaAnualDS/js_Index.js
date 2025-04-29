$(document).ready(function () {
    $(window).load(function () {


        cargarGridgridEstadoPlanVigilanciaAnualDS();

        $("#btnBuscarEstadoPlanVigilanciaAnualDS").click(function () {
            cargarGridgridEstadoPlanVigilanciaAnualDS();

        });

        $("#btnLimpiarEstadoPlanVigilanciaAnualDS").click(function () {
            $("#descripcion").val('');

            cargarGridgridEstadoPlanVigilanciaAnualDS();
        });



        $("#addNewEstadoPlanVigilanciaAnualDS").click(function () {

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

        $("#addModifyEstadoPlanVigilanciaAnualDS").click(function () {


            var dataDetalleEstadoPlanVigilanciaAnualDS = $("#gridEstadoPlanVigilanciaAnualDS").data("kendoGrid");
            var itemDataEstadoPlanVigilanciaAnualDS = dataDetalleEstadoPlanVigilanciaAnualDS.dataItem(dataDetalleEstadoPlanVigilanciaAnualDS.select());
            if (itemDataEstadoPlanVigilanciaAnualDS != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataEstadoPlanVigilanciaAnualDS.XESTADO_PLAN_VIGI_ANUALDS;
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

function cargarGridgridEstadoPlanVigilanciaAnualDS() {

    $("#gridEstadoPlanVigilanciaAnualDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/EstadoPlanVigilanciaAnualDS/ListarEstadoPlanVigilanciaAnualDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_ESTADO_PLAN_VIGI_ANUALDS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XESTADO_PLAN_VIGI_ANUALDS: { type: "string" },
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

    var grid = $("#gridEstadoPlanVigilanciaAnualDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XESTADO_PLAN_VIGI_ANUALDS",
                title: "ID_ESTADO_PLAN_VIGI_ANUALDS",
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