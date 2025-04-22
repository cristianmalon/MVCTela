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

        $("#txtTipoActividadDS").kendoComboBox({
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

               
        cargarGridTipoActividadDSCoordTecnica();

        $("#btnBuscarTipoActividadDSCoordTecnica").click(function () {
            cargarGridTipoActividadDSCoordTecnica();

        });

        $("#btnLimpiarTipoActividadDSCoordTecnica").click(function () {
            $("#descripcion").val('');
            $("#txtCoordinacionTecnica").data("kendoComboBox").value('');
            $("#txtTipoActividadDS").data("kendoComboBox").value('');

            cargarGridTipoActividadDSCoordTecnica();
        });



        $("#addNewTipoActividadDSCoordTecnica").click(function () {

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

        $("#addModifyTipoActividadDSCoordTecnica").click(function () {


            var dataDetalleTipoActividadDSCoordTecnica = $("#gridTipoActividadDSCoordTecnica").data("kendoGrid");
            var itemDataTipoActividadDSCoordTecnica = dataDetalleTipoActividadDSCoordTecnica.dataItem(dataDetalleTipoActividadDSCoordTecnica.select());
            if (itemDataTipoActividadDSCoordTecnica != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoActividadDSCoordTecnica.XTIP_ACTI_DS_COORD_TEC;
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


function cargarGridTipoActividadDSCoordTecnica() {

    $("#gridTipoActividadDSCoordTecnica").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoActividadDSCoordTecnica/ListarTipoActividadDSCoordTecnica",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {                
                return JSON.stringify({ objCoordinacionTecnica: $('#txtCoordinacionTecnica').val(), objTipoActividadDS: $('#txtTipoActividadDS').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GEND_TIP_ACTI_DS_COORD_TEC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XTIP_ACTI_DS_COORD_TEC: { type: "string" },                    
                    XDESCOORDTECNICA: { type: "string" },
                    XDESTIPOACTIVIDADDS: { type: "string" },                   
                    FLG_ESTADO: { type: "boolean" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoActividadDSCoordTecnica").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XTIP_ACTI_DS_COORD_TEC",
                title: "ID_TIP_ACTI_DS_COORD_TEC",
                hidden: true
            }, {
                field: "XDESCOORDTECNICA",
                title: "COORDINACIÓN TÉCNICA",
                flex: 1
            }, {
                field: "XDESTIPOACTIVIDADDS",
                title: "TIPO ACTIVIDAD",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}