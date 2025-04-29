$(document).ready(function () {
    $(window).load(function () {

        $("#descripcion").focus();

        cargarGridTipoFisico();

        $("#btnBuscarTipoFisico").click(function () {
            cargarGridTipoFisico();

        });

        $("#btnLimpiarTipoFisico").click(function () {
            $("#descripcion").val('');
            $("#descripcion").focus();

            cargarGridTipoFisico();
        });



        $("#addNewTipoFisico").click(function () {

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

        $("#addModifyTipoFisico").click(function () {


            var dataDetalleTipoFisico = $("#gridTipoFisico").data("kendoGrid");
            var itemDataTipoFisico = dataDetalleTipoFisico.dataItem(dataDetalleTipoFisico.select());
            if (itemDataTipoFisico != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoFisico.XID_TIPO_FISICO;
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

function cargarGridTipoFisico() {

    $("#gridTipoFisico").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoFisico/ListarTipoFisico",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_FISICO",
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

    var grid = $("#gridTipoFisico").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_FISICO",
                title: "ID_TIPO_FISICO",
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