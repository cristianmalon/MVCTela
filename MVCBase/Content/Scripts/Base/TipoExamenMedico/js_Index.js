$(document).ready(function () {
    $(window).load(function () {


        cargarGridTipoExamen();

        $("#btnBuscarTipoExamen").click(function () {
            cargarGridTipoExamen();

        });

        $("#btnLimpiarTipoExamen").click(function () {
            $("#descripcion").val('');

            cargarGridTipoExamen();
        });



        $("#addNewTipoExamen").click(function () {

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

        $("#addModifyTipoExamen").click(function () {


            var dataDetalleTipoExamen = $("#gridTipoExamen").data("kendoGrid");
            var itemDataTipoExamen = dataDetalleTipoExamen.dataItem(dataDetalleTipoExamen.select());
            if (itemDataTipoExamen != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoExamen.XID_TIPO_EXAMEN_MEDICO;
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

function cargarGridTipoExamen() {

    $("#gridTipoExamen").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoExamenMedico/ListarTipoExamenMedico",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_EXAMEN_MEDICO",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_EXAMEN_MEDICO: { type: "string" },
                    ABREVIATURA: { type: "string" },
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

    var grid = $("#gridTipoExamen").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_EXAMEN_MEDICO",
                title: "XID_TIPO_EXAMEN_MEDICO",
                hidden: true
            }, {
                field: "ABREVIATURA",
                title: "ABREVIATURA",
                flex: 1,
                width: 300
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