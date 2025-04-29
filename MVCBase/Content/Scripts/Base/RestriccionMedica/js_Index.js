$(document).ready(function () {
    $(window).load(function () {


        cargarGridRestriccionMedica();

        $("#btnBuscarRestriccionMedica").click(function () {
            cargarGridRestriccionMedica();

        });

        $("#btnLimpiarRestriccionMedica").click(function () {
            $("#txtDescripcion").val('');

            cargarGridRestriccionMedica();
        });



        $("#addNewRestriccionMedica").click(function () {

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

        $("#addModifyRestriccionMedica").click(function () {


            var dataDetalleRestriccionMedica = $("#gridRestriccionMedica").data("kendoGrid");
            var itemDataRestriccionMedica = dataDetalleRestriccionMedica.dataItem(dataDetalleRestriccionMedica.select());
            if (itemDataRestriccionMedica != undefined) {
                                
                var url = $(this).attr('data-url') + '?Index=' + itemDataRestriccionMedica.XID_RESTRICCION_MEDICA;
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

function cargarGridRestriccionMedica() {

    $("#gridRestriccionMedica").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/RestriccionMedica/ListarRestriccionMedica",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#txtDescripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_RESTRICCION_MEDICA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_RESTRICCION_MEDICA: { type: "string" },
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

    var grid = $("#gridRestriccionMedica").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_RESTRICCION_MEDICA",
                title: "ID_RESTRICCION_MEDICA",
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