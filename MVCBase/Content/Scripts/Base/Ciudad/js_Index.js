$(document).ready(function () {
    $(window).load(function () {

        $("#txtPais").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            },
        });

        cargarCiudad();

        $("#btnBuscarCiudad").click(function () {
            cargarCiudad();

        });

        $("#btnLimpiarCiudad").click(function () {
            $("#txtDescripcion").val('');
            $("#txtPais").data("kendoComboBox").value('');

            cargarCiudad();
        });



        $("#addNewCiudad").click(function () {

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

        $("#addModifyCiudad").click(function () {


            var dataDetalleCiudad = $("#gridCiudad").data("kendoGrid");
            var itemDataCiudad = dataDetalleCiudad.dataItem(dataDetalleCiudad.select());
            if (itemDataCiudad != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataCiudad.XCIUDAD;
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

function cargarCiudad() {

    $("#gridCiudad").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Ciudad/ListarCiudad",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#txtDescripcion').val(), objPais: $('#txtPais').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_GENM_CIUDAD",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XCIUDAD: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    DESPAIS: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridCiudad").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XCIUDAD",
                title: "ID_CIUDAD",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "CIUDAD",
                flex: 1
            }, {
                field: "DESPAIS",
                title: "PAIS",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}