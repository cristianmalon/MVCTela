$(document).ready(function () {
    $(window).load(function () {

        $("#descripcion").focus();

        cargarGridLocalMedico();

        $("#btnBuscarLocalMedico").click(function () {
            cargarGridLocalMedico();

        });

        $("#btnLimpiarLocalMedico").click(function () {
            $("#descripcion").val('');
            $("#descripcion").focus();

            cargarGridLocalMedico();
        });



        $("#addNewLocalMedico").click(function () {

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

        $("#addModifyLocalMedico").click(function () {


            var dataDetalleLocalMedico = $("#gridLocalMedico").data("kendoGrid");
            var itemDataLocalMedico = dataDetalleLocalMedico.dataItem(dataDetalleLocalMedico.select());
            if (itemDataLocalMedico != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataLocalMedico.XID_LOCAL_MEDICO;
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

function cargarGridLocalMedico() {

    $("#gridLocalMedico").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/LocalMedico/ListarLocalMedico",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_LOCAL_MEDICO",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_LOCAL_MEDICO: { type: "string" },
                    XID_TIPO_CENTRO_MEDICO: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    DESCRIPCION_CENTRO_MEDICO: { type: "string" },
                    EMAIL_RESPONSABLE: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridLocalMedico").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_LOCAL_MEDICO",
                title: "ID_LOCAL_MEDICO",
                hidden: true
            }, {
                field: "XID_TIPO_CENTRO_MEDICO",
                title: "ID_TIPO_CENTRO_MEDICO",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "LOCAL",
                flex: 1
            }, {
                field: "DESCRIPCION_CENTRO_MEDICO",
                title: "CENTRO MÉDICO",
                flex: 1
            }, {
                field: "EMAIL_RESPONSABLE",
                title: "EMAIL RESPONSABLE",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}