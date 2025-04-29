$(document).ready(function () {
    $(window).load(function () {

        $("#descripcion").focus();

        cargarGridTipoActividad();

        $("#btnBuscarTipoActividad").click(function () {
            cargarGridTipoActividad();

        });

        $("#btnLimpiarTipoActividad").click(function () {
            $("#descripcion").val('');
            $("#descripcion").focus();

            cargarGridTipoActividad();
        });



        $("#addNewTipoActividad").click(function () {

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

        $("#addModifyTipoActividad").click(function () {


            var dataDetalleTipoActividad = $("#gridTipoActividad").data("kendoGrid");
            var itemDataTipoActividad = dataDetalleTipoActividad.dataItem(dataDetalleTipoActividad.select());
            if (itemDataTipoActividad != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoActividad.XID_TIPO_ACTIVIDAD_AUTORIZAC;
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

function cargarGridTipoActividad() {

    $("#gridTipoActividad").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoActividadAutorizacion/ListarTipoActividad",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_ACTIVIDAD",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_ACTIVIDAD_AUTORIZAC: { type: "string" },
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

    var grid = $("#gridTipoActividad").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_ACTIVIDAD_AUTORIZAC",
                title: "ID_TIPO_ACTIVIDAD_AUTORIZAC",
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