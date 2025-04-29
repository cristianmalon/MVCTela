$(document).ready(function () {
    $(window).load(function () {


        cargarGridNacionalidad();

        $("#btnBuscarNacionalidad").click(function () {
            cargarGridNacionalidad();

        });

        $("#btnLimpiarNacionalidad").click(function () {
            $("#descripcion").val('');

            cargarGridNacionalidad();
        });



        $("#addNewNacionalidad").click(function () {

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

        $("#addModifyNacionalidad").click(function () {


            var dataDetalleNacionalidad = $("#gridNacionalidad").data("kendoGrid");
            var itemDataNacionalidad = dataDetalleNacionalidad.dataItem(dataDetalleNacionalidad.select());
            if (itemDataNacionalidad != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataNacionalidad.XID_NACIONALIDAD;
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

function cargarGridNacionalidad() {

    $("#gridNacionalidad").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Nacionalidad/ListarNacionalidad",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_NACIONALIDAD",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_NACIONALIDAD: { type: "string" },
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

    var grid = $("#gridNacionalidad").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_NACIONALIDAD",
                title: "XID_NACIONALIDAD",
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