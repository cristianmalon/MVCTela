$(document).ready(function () {
    $(window).load(function () {
        
        var coorditec = $("#txtCoordTec").val();
        
        if (coorditec == 52) {

            $("#btnRegMasiTipoInspectorEmpCoordDS").show();
        } else {
            $("#btnRegMasiTipoInspectorEmpCoordDS").hide();
        }

        $("#txtInspector").kendoComboBox({
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

        

        cargarGridTipoInspectorEmpCoordDS();

        $("#btnBuscarTipoInspectorEmpCoordDS").click(function () {
            cargarGridTipoInspectorEmpCoordDS();

        });

        $("#btnLimpiarTipoInspectorEmpCoordDS").click(function () {
           
            $("#txtInspector").data("kendoComboBox").value('');         
            cargarGridTipoInspectorEmpCoordDS();
        });


        $("#addNewTipoInspectorEmpCoordDS").click(function () {

            var dataDetalleTipoInspector = $("#gridTipoInspectorEmpCoordDS").data("kendoGrid");
            var itemDataTipoInspector = dataDetalleTipoInspector.dataItem(dataDetalleTipoInspector.select());
            if (itemDataTipoInspector != undefined) {
                /*
                var url = $(this).attr('data-url') + '?Index=' + itemDataTipoInspector.XINSPECTOR;
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
                */
                var url = $(this).attr('data-url');

                modalAjaxRequestGet(url, "", "", 'Index=' + itemDataTipoInspector.XINSPECTOR);
            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }

        });

    });

    $("#btnRegMasiTipoInspectorEmpCoordDS").click(function () {

        
        bootbox.confirm("¿Desea remitir la información consignada a la DGAC para su verificación ?", function (res) {
            if (res) {
                
                var T_GENM_TIPO_INSPECTOR_EMP_DS = {
                    ID_ESTADO_PLANVIGILANCIA_DS: 0,                    
                    ID_USUARIO_REG: null,
                    FEC_REG: null,
                    XTIPO_INSPECTOR_DS: $("#txtTipoInspectorCoor").val().trim()

                }

                console.log(T_GENM_TIPO_INSPECTOR_EMP_DS);

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/TipoInspectorEmpCoordDS/SaveRegMasivoInspecEmpCoordDS',
                    type: 'POST',
                    data: JSON.stringify({ objTGENMTIPOINSPECTOREMPDS: T_GENM_TIPO_INSPECTOR_EMP_DS }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {

                        console.log(data);
                        if (!data.rpta) {
                            
                            $.each(data.errores, function (key, value) {
                                if (value != null) {
                                    if (key == "*") {
                                        bootbox.alert(value);
                                    }
                                }
                            });
                            cargarGridTipoInspectorEmpCoordDS();
                        } else {
                            cargarGridTipoInspectorEmpCoordDS();
                        }

                        desbloqObject();

                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });
                
            }
        });

    });

});


function cargarGridTipoInspectorEmpCoordDS() {

    $("#gridTipoInspectorEmpCoordDS").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/TipoInspectorEmpCoordDS/ListarTipoInspectorEmpCoordDS",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ objInspector: $('#txtInspector').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_TIPO_INSPECTOR_EMP_COORD_DS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XINSPECTOR: { type: "string" },
                    XNOMBREINSPECTOR: { type: "string" },
                    XDESCOORD: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridTipoInspectorEmpCoordDS").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XINSPECTOR",
                title: "ID_INSPECTOR",
                hidden: true
            }, {
                field: "XNOMBREINSPECTOR",
                title: "INSPECTOR",
                flex: 1
            }, {
                field: "XDESCOORD",
                flex: 1,
                title: "COORDINACION"
            }]
    }).data("kendoGrid");

}

