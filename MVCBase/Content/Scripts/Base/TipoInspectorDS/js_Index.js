$(document).ready(function () {
    $(window).load(function () {
        
        $("#txtCoordinacion").kendoDropDownList({
            //placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            optionLabel: {
                text: "[SELECCIONE]",
                value: ""
            },
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            },
        });

        $("#txtCoordinacion").data("kendoDropDownList").value("");
        cargarGridTipoInspectorDS();

        $("#btnBuscarTipoInspectorDS").click(function () {
            cargarGridTipoInspectorDS();

        });

        $("#btnLimpiarTipoInspectorDS").click(function () {
            $("#descripcion").val('');
            $("#txtCoordinacion").data("kendoDropDownList").value('');

            cargarGridTipoInspectorDS();
        });



        $("#addNewTipoInspectorDS").click(function () {

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

        $("#addModifyTipoInspectorDS").click(function () {


            var dataDetalleTipoInspectorDS = $("#gridTipoInspectorDS").data("kendoGrid");
            var itemDataTipoInspectorDS = dataDetalleTipoInspectorDS.dataItem(dataDetalleTipoInspectorDS.select());
            if (itemDataTipoInspectorDS != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoInspectorDS.XTIPO_INSPECTOR_DS;
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

function cargarGridTipoInspectorDS() {

    $("#gridTipoInspectorDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoInspectorDS/ListarTipoInspectorDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), objCoordinacion: $('#txtCoordinacion').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_TIPO_INSPECTOR_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XTIPO_INSPECTOR_DS: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    DESCRIPCION_CORTA: { type: "string" },
                    DESCOORDTEC: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoInspectorDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XTIPO_INSPECTOR_DS",
                title: "ID_TIPO_INSPECTOR_DS",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCIÓN",
                flex: 1
            }, {
                field: "DESCRIPCION_CORTA",
                title: "ABREVIATURA",
                flex: 1
            }, {
                field: "DESCOORDTEC",
                title: "CORDINACIÓN TÉCNICA",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}