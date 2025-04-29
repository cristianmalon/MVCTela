$(document).ready(function () {
    $(window).load(function () {
        $("#XCIUDAD").css({ "width": "100%", "height": "auto" }).kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                $("#divGuardado").hide();
                $("#FrmPlanVigilanciaAnual").hide();
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            }
        });

        $("#XGIRO").css({ "width": "100%", "height": "auto" }).kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                $("#divGuardado").hide();
                $("#FrmPlanVigilanciaAnual").hide();
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            }
        });

        cargarGridConsultaBandejaEmpresa();

        $("#btnFiltroEmpresasAsginado").click(function () {
            if ($("#XCIUDAD").data("kendoComboBox").value() == null || $("#XCIUDAD").data("kendoComboBox").value() == "") {
                bootbox.alert("Debe seleccionar la ciudad");
            }
            else {
                if ($("#XGIRO").data("kendoComboBox").value() == null || $("#XGIRO").data("kendoComboBox").value() == "") {
                    bootbox.alert("Debe seleccionar el giro");
                }
                else {
                    $('#HtmlWrap').data('kendoGrid').dataSource.read();
                    $('#HtmlWrap').data('kendoGrid').refresh();
                    $("#divGuardado").show();
                    $("#FrmPlanVigilanciaAnual").show();
                }
            }
        });

        $("#btnGuardarCambios").click(function () {
            SaveDatosGrilla();
        });

    });
});

function cargarGridConsultaBandejaEmpresa() {
    $("#HtmlWrap").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/PlanVigilanciaAnualAvsec/ConsultaPersonaJuridicaAsociacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ XCIUDAD: $('#XCIUDAD').data("kendoComboBox").value(), XGIRO: $('#XGIRO').data("kendoComboBox").value() });
            }
        },
        schema: {
            data: "l_T_Genm_PlanVigilancia_DS",
            type: 'json',
            model: {
                fields: {
                    XID_PER_JUR_CIUDA_GIRO_AVSE: { type: "string" },
                    XID_PERSONA_JURIDICA: { type: "string" },
                    XID_GIRO: { type: "string" },
                    XID_CIUDAD: { type: "string" },
                    XID_HABILITACION: { type: "string" },
                    XID_AERODROMO: { type: "string" },
                    XID_HELIPUERTO: { type: "string" },
                    FLG_ESTADO: { type: "boolean" },
                    RAZON_SOCIAL: { editable: false, type: "string" }
                }
            }
        },
        serverPaging: false,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#HtmlWrap").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: false,
        columns: [
             {
                 field: "RAZON_SOCIAL",
                 flex: 1,
                 title: "Razon Social"
             }, {
                 field: "XID_PER_JUR_CIUDA_GIRO_AVSE",
                 hidden: true
             }, {
                 field: "XID_PERSONA_JURIDICA",
                 hidden: true
             }, {
                 field: "XID_GIRO",
                 hidden: true
             }, {
                 field: "XID_CIUDAD",
                 hidden: true
             }, {
                 field: "XID_HABILITACION",
                 hidden: true
             }, {
                 field: "XID_AERODROMO",
                 hidden: true
             }, {
                 field: "XID_HELIPUERTO",
                 hidden: true
             }, {
                 field: "FLG_ESTADO",
                 title: "ACTIVO?",
                 template: "<input type='checkbox' #= FLG_ESTADO ? 'checked=checked' : '' # disabled='disabled' ></input>",
                 width: 150
             }],
        editable: true
    }).data("kendoGrid");
}


function SaveDatosGrilla() {

    var ListTipoInspecEmpCoordDS = [];
    var gridTipoInspecEmpCoordDS = $("#HtmlWrap").data("kendoGrid").dataSource.data();
    if (gridTipoInspecEmpCoordDS != null) {
        $.each(gridTipoInspecEmpCoordDS, function (index, item) {
            
            var TipoInspectorEmpCoordDS = {
                XID_PER_JUR_CIUDA_GIRO_AVSE: item.XID_PER_JUR_CIUDA_GIRO_AVSE,
                XID_PERSONA_JURIDICA: item.XID_PERSONA_JURIDICA,
                XID_GIRO: $("#XGIRO").data("kendoComboBox").value(),
                XID_CIUDAD: $("#XCIUDAD").data("kendoComboBox").value(),
                XID_HABILITACION: item.XID_HABILITACION,
                XID_AERODROMO: item.XID_AERODROMO,
                XID_HELIPUERTO: item.XID_HELIPUERTO,
                FLG_ESTADO: item.FLG_ESTADO,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null
            }

            ListTipoInspecEmpCoordDS.push(TipoInspectorEmpCoordDS);
        });
    }
    
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        //url: '/TipoInspectorEmpCoordDS/SaveRegistroTipoInspectorEmpCoordDS',
        url: '/PlanVigilanciaAnualAvsec/SaveDatosGrillaAsosiacion',
        type: 'POST',
        data: JSON.stringify({ l_T_Gend_Per_Jur_Ciuda_Giro_AVSE: ListTipoInspecEmpCoordDS }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            //console.log(data);
            if (!data.rpta) {
                errorAddModelo("divErrorPlanAnual", "ulListaErrorPlanAnual", data.errores);
            } else {
                $("#btnFiltroEmpresasAsginado").click();
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

