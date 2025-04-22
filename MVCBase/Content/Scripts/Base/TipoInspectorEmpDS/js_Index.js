$(document).ready(function () {
    $(window).load(function () {


        $("#txtRazonSocial").kendoDropDownList({
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

        $("#txtInspector").kendoDropDownList({
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

        $("#txtTipoInspector").kendoDropDownList({
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

        $("#txtRazonSocial").data("kendoDropDownList").value('');
        $("#txtInspector").data("kendoDropDownList").value('');
        $("#txtTipoInspector").data("kendoDropDownList").value('');
      
        cargarGridTipoInspectorEmpDS();

        $("#btnBuscarTipoInspectorEmp").click(function () {
            cargarGridTipoInspectorEmpDS();

        });

        $("#btnLimpiarTipoInspectorEmp").click(function () {
            $("#txtRazonSocial").data("kendoDropDownList").value('');
            $("#txtInspector").data("kendoDropDownList").value('');
            $("#txtTipoInspector").data("kendoDropDownList").value('');
            /*$("#txtFechaDesde").val('');
            $("#txtFechaHasta").val('');*/
            cargarGridTipoInspectorEmpDS();
        });

       

        $("#addNewTipoInspectorEmpDS").click(function () {
                        
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

        $("#addModifyTipoInspectorEmpDS").click(function () {


            var dataDetalleTipoInspector = $("#gridTipoInspectorEmpDS").data("kendoGrid");
            var itemDataTipoInspector = dataDetalleTipoInspector.dataItem(dataDetalleTipoInspector.select());
            if (itemDataTipoInspector != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoInspector.XTIPO_INSPECTOR_EMP_DS;
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


function cargarGridTipoInspectorEmpDS() {

    $("#gridTipoInspectorEmpDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoInspectorEmpDS/ListarTipoInspectorEmpDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ objRazonSocial: $('#txtRazonSocial').val(), objInspector: $('#txtInspector').val(), objTipoInspector: $('#txtTipoInspector').val(), page: options.page, pageSize: options.pageSize });

            }
        },
        schema: {
            data: "l_GENM_TIPO_INSPECTOR_EMP_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XTIPO_INSPECTOR_EMP_DS: { type: "string" },
                    XRAZONSOCIAL: { type: "string" },
                    XNOMBREINSPECTOR: { type: "string" },
                    XTIPOINSPECTOR: { type: "string" },
                    XFECHA_INICIO: { type: "string" },
                    XFECHA_FIN: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoInspectorEmpDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XTIPO_INSPECTOR_EMP_DS",
                title: "ID_TIPO_INSPECTOR_EMP",
                hidden: true
            }, {
                field: "XRAZONSOCIAL",
                title: "RAZÓN SOCIAL",
                flex: 1
            }, {
                field: "XNOMBREINSPECTOR",
                title: "INSPECTOR",
                flex: 1
            }, {
                field: "XTIPOINSPECTOR",
                flex: 1,
                title: "TIPO INSPECTOR"
            }, {
                field: "XFECHA_INICIO",
                title: "FECHA INICIO",
                width: 160
            }, {
                field: "XFECHA_FIN",
                title: "FECHA FIN",
                width: 160
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}