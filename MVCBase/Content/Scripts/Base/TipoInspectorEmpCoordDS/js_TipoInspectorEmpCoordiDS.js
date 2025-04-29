var dataEmpresas;
//var editGrilla;
$(document).ready(function () {
    
    dataEmpresas = ajaxEmpresas();
   // editGrilla = EditGrillaTipoInsEmpDS();
    
    
    $("#btnRegistrarTipoInspectorEmpCoordDS").click(function () {
       
        SaveTipoInspectorEmpCoordDS();
    });
    // EditGrillaTipoInsEmpDS("");

    $("#gridTipoInspecEmpCoordDS").on("click", ".k-grid-cancel", function (e) {
        e.preventDefault();
        var grid = $("#gridTipoInspecEmpCoordDS").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest("tr"));       
        //console.log(dataItem);
        grid.dataSource.remove(dataItem);
    });
});

function gridTipoInspecEmpCoordDS(data,lObjeto) {
    //console.log(lObjeto);
    $("#gridTipoInspecEmpCoordDS").html("");
    var dataSource = new kendo.data.DataSource({        
        //pageSize: 20,
        autoSync: true,
        schema: {
            model: {
                id: "XTIPO_INSPECTOR_EMP_DS",
                fields: {
                    XTIPO_INSPECTOR_EMP_DS: { editable: false, nullable: true },
                    ID_PERSONA_JURIDICA: { validation: { required: true, message: 'Ingrese el Numero de Parte' }, defaultValue: { ID_PERSONA_JURIDICA: 0, RAZON_SOCIAL: "[SELECCIONE]" } },
                    FECHA_INICIO: {
                        type: "date",
                        validation: {
                            required: {
                                message: "Seleccione la fecha de Inicio"
                            },
                            date: {
                                message: "Fecha Invalida"
                            },
                        },
                    },
                    FECHA_FIN: {
                        type: "date",
                        validation: {
                            required: {
                                message: "Seleccione la fecha de Fin"
                            },
                            date: {
                                message: "Fecha Invalida"
                            },
                        },
                    },
                    FLG_ESTADO: { type: "boolean" }
                }
            }
        }
    });

    $("#gridTipoInspecEmpCoordDS").kendoGrid({
        dataSource: dataSource,
        //pageable: true,
        height: 300,
        columns: [
            { field: "XTIPO_INSPECTOR_EMP_DS", hidden: true },
            {
                field: "ID_PERSONA_JURIDICA", title: "RAZÓN SOCIAL", width: "250px",
                editor: function (container, options) {
                    $('<input required data-text-field="RAZON_SOCIAL" data-value-field="ID_PERSONA_JURIDICA" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        filter: "contains",
                        dataSource: lObjeto,
                        dataTextField: "RAZON_SOCIAL",
                        dataValueField: "ID_PERSONA_JURIDICA"
                    });
                },
                template: "#=ID_PERSONA_JURIDICA.RAZON_SOCIAL#"
            },
            { field: "FECHA_INICIO", title: "FECHA INICIO", format: "{0:dd/MM/yyyy}", width: "80px" },
            { field: "FECHA_FIN", title: "FECHA FIN", format: "{0:dd/MM/yyyy}", width: "80px" },
            {
                field: "FLG_ESTADO",
                title: "ACTIVO?",
                template: "<input type='checkbox' #= FLG_ESTADO ? 'checked=checked' : '' # disabled='disabled' ></input>",                
                width: 50
            },
            {                
                template: "#if (XTIPO_INSPECTOR_EMP_DS  == '') {# <a class='k-button k-button-icontext k-grid-cancel' ><span class='k-icon k-cancel'></span>Cancelar</a> #} # ",
                width: 65
            }
        ],
        editable: true
    });

    /*
    if (data == "") {        
        
    }
    else {
        

        $.each(data, function (index, item) {            
            $("#gridTipoInspecEmpCoordDS")
                    .data("kendoGrid")
                    .dataSource
                    .insert({
                        XTIPO_INSPECTOR_EMP_DS: item.XTIPO_INSPECTOR_EMP_DS,
                        ID_PERSONA_JURIDICA: { ID_PERSONA_JURIDICA: item.ID_PERSONA_JURIDICA, RAZON_SOCIAL: item.XRAZONSOCIAL, },
                        FECHA_INICIO: dateFormat(item.FECHA_INICIO),
                        FECHA_FIN: dateFormat(item.FECHA_FIN),
                        FLG_ESTADO: item.FLG_ESTADO
                    });

        });
    }
    */


}

$("#btnAddTipoInspecEmpCoordDS").click(function () {

    //alert($('#txtIdInspectorEmpsDS').val());

    $("#gridTipoInspecEmpCoordDS")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XTIPO_INSPECTOR_EMP_DS: "",
                            ID_PERSONA_JURIDICA: { ID_PERSONA_JURIDICA: 0, RAZON_SOCIAL: "[SELECCIONE]" },
                            FECHA_INICIO: "",
                            FECHA_FIN: "",
                            FLG_ESTADO: ""

                        });



});
function ajaxEmpresas() {
    $.ajax({
        datatype: 'json',
        url: '/TipoInspectorEmpCoordDS/ListarEmpresaCoordDS',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XTIPOINSPECTOR: $('#txtIdInspectorEmpsDS').val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            var lObjeto = [];
            if (!data.rpta) {
                errorAddModelo("divErrorTipoInspectorEmpCoordiDS", "ulListaErrorTipoInspectorEmpCooridDS", data.errores);
            } else {
                var l_T_Genm_Persona_Juridica = data.data;

                lObjeto.push({
                    ID_PERSONA_JURIDICA: 0,
                    RAZON_SOCIAL: "[SELECCIONE]"
                });
                $.each(l_T_Genm_Persona_Juridica, function (index, value) {
                    var Objeto = {
                        ID_PERSONA_JURIDICA: value.ID_PERSONA_JURIDICA,
                        RAZON_SOCIAL: value.RAZON_SOCIAL
                    }
                    lObjeto.push(Objeto);
                });

                gridTipoInspecEmpCoordDS("", lObjeto);
                EditGrillaTipoInsEmpDS(lObjeto);
            }
            desbloqObject();
            return lObjeto;
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });

}



function validaGrilla() {

    var gridTipoInspecEmpCoordDS = $("#gridTipoInspecEmpCoordDS").data("kendoGrid").dataSource.data();    
    var message = "";
    var flg = true;

    $.each(gridTipoInspecEmpCoordDS, function (index, item) {
        if ($.trim(item.ID_PERSONA_JURIDICA.ID_PERSONA_JURIDICA) == "0") {
            flg = false;
            message = "Debe ingresar la razón social";
        }
        if ($.trim(item.FECHA_INICIO) == "") {
            flg = false;
            message = "Debe ingresar la fecha inicio";
            
        }
        if ($.trim(item.FECHA_FIN) == "") {
            flg = false;
            message = "Debe ingresar la fecha fin";
            
        }
        
        if (flg) {
            $("#divErrorTipoInspectorEmpCoordiDS").hide();
        }
        else {
            $("#divErrorTipoInspectorEmpCoordiDS").show();
            $("#divErrorTipoInspectorEmpCoordiDS").html('<strong>' + message + '</strong>');
        }
        
        
    });
    return flg;
    
}

function SaveTipoInspectorEmpCoordDS() {

    if (validaGrilla()) {
        
        var ListTipoInspecEmpCoordDS = [];
        var gridTipoInspecEmpCoordDS = $("#gridTipoInspecEmpCoordDS").data("kendoGrid").dataSource.data();
        if (gridTipoInspecEmpCoordDS != null) {
            $.each(gridTipoInspecEmpCoordDS, function (index, item) {

                var TipoInspectorEmpCoordDS = {
                    ID_TIPO_INSPECTOR_EMP: 0,
                    ID_PERSONA_JURIDICA: item.ID_PERSONA_JURIDICA.ID_PERSONA_JURIDICA,
                    ID_TIPO_INSPECTOR_DS: 0,
                    ID_INSPECTOR: 0,
                    FECHA_INICIO: item.FECHA_INICIO,
                    FECHA_FIN: item.FECHA_FIN,
                    FLG_ESTADO: item.FLG_ESTADO,
                    ID_USUARIO_REG: null,
                    FEC_REG: null,
                    ID_USUARIO_ACT: null,
                    FEC_ACT: null,
                    XTIPO_INSPECTOR_EMP_DS: item.XTIPO_INSPECTOR_EMP_DS,
                    XTIPO_INSPECTOR_DS: $("#txtIdInspectorEmpsDS").val().trim(),
                    XINSPECTOR: $("#txtInspectorDS").val().trim(),
                    XRAZONSOCIAL: item.ID_PERSONA_JURIDICA.RAZON_SOCIAL
                }

                ListTipoInspecEmpCoordDS.push(TipoInspectorEmpCoordDS);
            });
        }
        console.log(ListTipoInspecEmpCoordDS);
        
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            //url: '/TipoInspectorEmpCoordDS/SaveRegistroTipoInspectorEmpCoordDS',
            url: '/TipoInspectorEmpCoordDS/SaveRegistroTipoInspectorEmpCoordDSXML',
            type: 'POST',
            data: JSON.stringify({ objTipoInspecEmpCoordDS: ListTipoInspecEmpCoordDS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                //console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoInspectorEmpCoordiDS", "ulListaErrorTipoInspectorEmpCooridDS", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridTipoInspectorEmpCoordDS();

                }

                desbloqObject();

            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
            return false;
        });
        
    }

}

function EditGrillaTipoInsEmpDS(lObjeto) {
    
        $.ajax({
            datatype: 'json',
            url: '/TipoInspectorEmpCoordDS/dataGrillaTipoInsEmpDS',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                TIPOINSPECTORDS: $("#txtIdInspectorEmpsDS").val(),
                INSPECTOR: $("#txtInspectorDS").val()
            }),
            beforeSend: function () {
                bloquoteObject()
            },
            success: function (data) {
                if (!data.rpta) {

                } else {

                    $.each(data.l_GENM_TIPO_INSPECTOR_EMP_DS, function (index, item) {
                        $("#gridTipoInspecEmpCoordDS")
                                .data("kendoGrid")
                                .dataSource
                                .insert({
                                    XTIPO_INSPECTOR_EMP_DS: item.XTIPO_INSPECTOR_EMP_DS,
                                    ID_PERSONA_JURIDICA: { ID_PERSONA_JURIDICA: item.ID_PERSONA_JURIDICA, RAZON_SOCIAL: item.XRAZONSOCIAL },
                                    FECHA_INICIO: dateFormat(item.XFECHA_INICIO),
                                    FECHA_FIN: dateFormat(item.XFECHA_FIN),
                                    FLG_ESTADO: item.FLG_ESTADO
                                });

                    });

                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();           
        });    

}