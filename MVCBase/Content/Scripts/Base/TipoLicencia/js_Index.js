$(document).ready(function () {
    $(window).load(function () {


        cargarGridTipoLicencia();

        $("#btnBuscarTipoLicencia").click(function () {
            cargarGridTipoLicencia();

        });

        $("#btnLimpiarTipoLicencia").click(function () {
            $("#descripcion_esp").val('');
            $("#descripcion_ing").val('');

            cargarGridTipoLicencia();
        });



        $("#addNewTipoLicencia").click(function () {

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

        $("#addModifyTipoHabilitacion").click(function () {


            var dataDetalleTipoLicencia = $("#gridTipoLicencia").data("kendoGrid");
            var itemDataTipoLicencia = dataDetalleTipoLicencia.dataItem(dataDetalleTipoLicencia.select());
            if (itemDataTipoLicencia != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoLicencia.XID_TIPO_LICENCIA;
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

function cargarGridTipoLicencia() {

    $("#gridTipoLicencia").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoLicencia/ListarTipoLicencia",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion_esp: $('#descripcion_esp').val(), objDescripcion_ing: $('#descripcion_ing').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_LICENCIA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_LICENCIA: { type: "string" },
                    DESCRIPCION_ESPANOL: { type: "string" },
                    DESCRIPCION_INGLES: { type: "string" },
                    XID_TIPO_FUNCION: { type: "string" },
                    DESCRIPCION_TIPO_FUNCION: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoLicencia").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        //height: 400,
        columns: [
            {
                field: "XID_TIPO_LICENCIA",
                title: "XID_TIPO_LICENCIA",
                hidden: true
            }, {
                field: "DESCRIPCION_ESPANOL",
                title: "DESCRIPCIÓN ESPAÑOL",
                flex: 1
            }, {
                field: "DESCRIPCION_INGLES",
                title: "DESCRIPCIÓN INGLES",
                flex: 1
            },{
                field: "XID_TIPO_FUNCION",
                title: "XID_TIPO_FUNCION",
                hidden: true
            }, {
                field: "DESCRIPCION_TIPO_FUNCION",
                title: "TIPO FUNCION",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}


function detailInit(e) {
    var dataSourceEvaluacion = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoLicencia/ListarTipoLicenciaEvaluacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ Id_Licencia: e.data.XID_TIPO_LICENCIA, page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_EVALUACION_LIC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_HABILITACION_LIC: { type: "string" },
                    DESCRIPCION: { type: "string" }
                }
            }
        },
        pageSize: 5,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });



    var dataSourceHabilitacion = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoLicencia/ListarTipoLicenciaHabilitacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ Id_Licencia: e.data.XID_TIPO_LICENCIA, page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_HABILITACION_LIC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_TIPO_HABILITACION_LIC: { type: "string" },
                    DESCRIPCION_ESPANOL: { type: "string" },
                    DESCRIPCION_INGLES: { type: "string" }


                }
            }
        },
        pageSize: 5,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });


    var dataSourceRestriccion = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoLicencia/ListarTipoLicenciaRestriccion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ Id_Licencia: e.data.XID_TIPO_LICENCIA, page: options.page, pageSize: options.pageSize });
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
                    DESCRIPCION_INGLES: { type: "string" }


                }
            }
        },
        pageSize: 5,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });




    var detailRow = e.detailRow;
    detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });

    detailRow.find(".orders").kendoGrid({

        dataSource: dataSourceHabilitacion,
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "XID_TIPO_HABILITACION_LIC",
                title: "XID_TIPO_HABILITACION_LIC",
                hidden: true
            }, {
                field: "DESCRIPCION_ESPANOL",
                title: "DESCRIPCIÓN ESPAÑOL",
                flex: 1
            }, {
                field: "DESCRIPCION_INGLES",
                title: "DESCRIPCIÓN INGLES",
                flex: 1
            }]
    });

    detailRow.find(".Evaluacion").kendoGrid({

        dataSource: dataSourceEvaluacion,
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "XID_TIPO_EVALUACION_LIC",
                title: "XID_TIPO_EVALUACION_LIC",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCIÓN",
                flex: 1
            }]
    });

    detailRow.find(".Restriccion").kendoGrid({

        dataSource: dataSourceRestriccion,
        scrollable: false,
        sortable: true,
        pageable: true,
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
            }]
    });
}