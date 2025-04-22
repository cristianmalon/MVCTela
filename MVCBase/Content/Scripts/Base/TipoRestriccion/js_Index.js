$(document).ready(function () {
    $(window).load(function () {


        cargarGridTipoRestriccion();

        $("#btnBuscarTipoRestriccion").click(function () {
            cargarGridTipoRestriccion();

        });

        $("#btnLimpiarTipoRestriccion").click(function () {
            $("#descripcion_esp").val('');
            $("#descripcion_ing").val('');

            cargarGridTipoRestriccion();
        });



        $("#addNewTipoRestriccion").click(function () {

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

        $("#addModifyTipoRestriccion").click(function () {


            var dataDetalleTipoRestriccion = $("#gridTipoRestriccion").data("kendoGrid");
            var itemDataTipoRestriccion = dataDetalleTipoRestriccion.dataItem(dataDetalleTipoRestriccion.select());
            if (itemDataTipoRestriccion != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoRestriccion.XID_TIPO_RESTRICCION;
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

function cargarGridTipoRestriccion() {

    $("#gridTipoRestriccion").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoRestriccion/ListarTipoRestriccion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion_esp: $('#descripcion_esp').val(), objDescripcion_ing: $('#descripcion_ing').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_RESTRICCION",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_RESTRICCION: { type: "string" },
                    DESCRIPCION_ESPANOL: { type: "string" },
                    DESCRIPCION_INGLES: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoRestriccion").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_RESTRICCION",
                title: "XID_TIPO_RESTRICCION",
                hidden: true
            }, {
                field: "DESCRIPCION_ESPANOL",
                title: "DESCRIPCIÓN ESPAÑOL",
                flex: 1
            }, {
                field: "DESCRIPCION_INGLES",
                title: "DESCRIPCIÓN INGLES",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}