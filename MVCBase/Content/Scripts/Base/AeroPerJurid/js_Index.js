$(document).ready(function () {
    $(window).load(function () {

        $("#txtRazonSocial").kendoComboBox({
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
        
        cargarGridRazonSocial();

        $("#btnBuscarAeroPerJurid").click(function () {
            cargarGridRazonSocial();

        });

        $("#btnLimpiarAeroPerJurid").click(function () {
           
            $("#txtRazonSocial").data("kendoComboBox").value('');
            $("#txtRuc").val('');
            cargarGridRazonSocial();
        });



        $("#addNewAeroPerJurid").click(function () {


            var dataDetalleRazonSocial = $("#gridRazonSocial").data("kendoGrid");
            var itemDataRazonSocial = dataDetalleRazonSocial.dataItem(dataDetalleRazonSocial.select());
            if (itemDataRazonSocial != undefined) {

                var url = $(this).attr('data-url');
                modalAjaxRequestGet(url, "", "", 'Index=' + itemDataRazonSocial.XPERSONAJURIDICA);

            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }


        });

    });


});

function cargarGridRazonSocial() {

    $("#gridRazonSocial").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/AeroPerJurid/ListarRazonSocial",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objRazonSocial: $('#txtRazonSocial').val(), objRuc: $('#txtRuc').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_PERSONA_JURIDICA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XPERSONAJURIDICA: { type: "string" },
                    RAZON_SOCIAL: { type: "string" },
                    RUC: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridRazonSocial").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XPERSONAJURIDICA",
                title: "ID_PERSONA_JURIDICA",
                hidden: true
            }, {
                field: "RAZON_SOCIAL",
                title: "RAZÓN SOCIAL"
            }, {
                field: "RUC",
                title: "RUC"
            }]
    }).data("kendoGrid");

}