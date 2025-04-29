$(document).ready(function () {
    $(window).load(function () {

        $("#descripcion").focus();

        cargarGridTipoFuncion();

        $("#btnBuscarTipoFuncion").click(function () {
            cargarGridTipoFuncion();

        });

        $("#btnLimpiarTipoFuncion").click(function () {
            $("#descripcion").val('');
            $("#descripcion").focus();

            cargarGridTipoFuncion();
        });



        $("#addNewTipoFuncion").click(function () {

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

        $("#addModifyTipoFuncion").click(function () {


            var dataDetalleTipoFuncion = $("#gridTipoFuncion").data("kendoGrid");
            var itemDataTipoFuncion = dataDetalleTipoFuncion.dataItem(dataDetalleTipoFuncion.select());
            if (itemDataTipoFuncion != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoFuncion.XID_TIPO_FUNCION;
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

function cargarGridTipoFuncion() {

    $("#gridTipoFuncion").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoFuncion/ListarTipoFuncion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_FUNCION",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XTIPO_LUGAR_DS: { type: "string" },
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

    var grid = $("#gridTipoFuncion").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_FUNCION",
                title: "ID_TIPO_FUNCION",
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