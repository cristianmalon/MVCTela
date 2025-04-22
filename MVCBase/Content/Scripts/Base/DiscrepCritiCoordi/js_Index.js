$(document).ready(function () {
    $(window).load(function () {

        $("#txtCoordinacionTecnica").kendoComboBox({
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

        $("#txtCriticidad").kendoComboBox({
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


        cargarDiscreoCritiCoordi();

        $("#btnBuscarDiscreoCritiCoordi").click(function () {
            cargarDiscreoCritiCoordi();

        });

        $("#btnLimpiarDiscreoCritiCoordi").click(function () {
            $("#txtCoordinacionTecnica").data("kendoComboBox").value('');
            $("#txtCriticidad").data("kendoComboBox").value('');

            cargarDiscreoCritiCoordi();
        });



        $("#addNewDiscreoCritiCoordi").click(function () {

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

        $("#addModifyDiscreoCritiCoordi").click(function () {


            var dataCritiCoordi = $("#gridDiscreoCritiCoordi").data("kendoGrid");
            var itemDataCritiCoordi = dataCritiCoordi.dataItem(dataCritiCoordi.select());
            if (itemDataCritiCoordi != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataCritiCoordi.XID_DISCREP_CRI_COORDI_DS;
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

function cargarDiscreoCritiCoordi() {

    $("#gridDiscreoCritiCoordi").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/DiscrepCritiCoordi/ListarDiscrepCritiCoordi",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objCoordinacionTecnica: $('#txtCoordinacionTecnica').val(), objCriticidad: $('#txtCriticidad').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_GEND_DISCREP_CRI_COORDI_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_DISCREP_CRI_COORDI_DS: { type: "string" },
                    DES_COORDINACION: { type: "string" },
                    DES_CRITICIDAD: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridDiscreoCritiCoordi").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_DISCREP_CRI_COORDI_DS",
                title: "ID_DISCREP_CRI_COORDI_DS",
                hidden: true
            }, {
                field: "DES_COORDINACION",
                title: "COORDINACIÓN TÉCNICA",
                flex: 1
            }, {
                field: "DES_CRITICIDAD",
                title: "CRITICIDAD",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}