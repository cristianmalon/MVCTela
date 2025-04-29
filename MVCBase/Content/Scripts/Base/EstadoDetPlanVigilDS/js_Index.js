$(document).ready(function () {
    $(window).load(function () {


        cargarGridEstadoDetVigilanciaDS();

        $("#btnBuscarEstadoDetVigilancia").click(function () {
            cargarGridEstadoDetVigilanciaDS();

        });

        $("#btnLimpiarEstadoDetVigilancia").click(function () {
            $("#descripcion").val('');
            
            cargarGridEstadoDetVigilanciaDS();
        });

        
        
        $("#addNewEstadoDetVigilancia").click(function () {

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

        $("#addModifyEstadoDetVigilancia").click(function () {


            var dataDetalleEstadoDetVigilancia = $("#gridEstadoDetVigilanciaDS").data("kendoGrid");
            var itemDataEstadoDetVigilancia = dataDetalleEstadoDetVigilancia.dataItem(dataDetalleEstadoDetVigilancia.select());
            if (itemDataEstadoDetVigilancia != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataEstadoDetVigilancia.XESTADODPLANVIGILANCIA_DS;
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

function cargarGridEstadoDetVigilanciaDS() {

    $("#gridEstadoDetVigilanciaDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/EstadoDetPlanVigilDS/ListarEstadoDetPlanVigilDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {                
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_ESTADODPLANVIGILANCIA_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XESTADODPLANVIGILANCIA_DS: { type: "string" },
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

    var grid = $("#gridEstadoDetVigilanciaDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XESTADODPLANVIGILANCIA_DS",
                title: "ID_ESTADODPLANVIGILANCIA_DS",
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