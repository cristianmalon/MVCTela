$(document).ready(function () {
    $("#XGIRO").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        filter: "contains",
        dataTextField: "DESCRIPCION",
        dataValueField: "XGIRO",
        change: function (e) {
            var url = "/PlanVigilanciaDetalleMes/ComboPersonaJuridicaAerodromo?XGIRO=" + this.value();
            $.getJSON(url, function (data) {
                var options = [];
                $.each(data.T_GENM_PERSONA_JURIDICA, function (i, item) {
                    options.push({
                        XPERSONAJURIDICA: item.XPERSONAJURIDICA,
                        RAZON_SOCIAL: item.RAZON_SOCIAL
                    });
                });
                var multiSelect = $("#ID_PERSONA_JURIDICA").data("kendoMultiSelect");
                multiSelect.setDataSource(options);
                multiSelect.value([]);

                var multiSelect = $("#XAERODROMO").data("kendoMultiSelect");
                multiSelect.setDataSource([]);
                multiSelect.value([]);

                $("#divAerodromoCombo").hide();
            });
        }
    });

    $("#ID_PERSONA_JURIDICA").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        filter: "contains",
        dataTextField: "RAZON_SOCIAL",
        dataValueField: "XPERSONAJURIDICA",
        change: function (e) {
            var url = "/PlanVigilanciaDetalleMes/DetalleCertificacionCoordinadorAerodromo?XEMPRESA=" + this.value();
            $.getJSON(url, function (data) {
                var options = [];
                var multiSelect = $("#XAERODROMO").data("kendoMultiSelect");

                if (data.l_T_Mae_Aerodromo.length > 0) {
                    $("#divAerodromoCombo").show();

                    $.each(data.l_T_Mae_Aerodromo, function (i, item) {
                        options.push({
                            XAERODROMO: item.XAERODROMO,
                            DESCRIPCION: item.DESCRIPCION
                        });
                    });
                } else {
                    $("#divAerodromoCombo").hide();
                }

                multiSelect.setDataSource(options);
                multiSelect.value([]);
            });
        }
    });

    $("#XAERODROMO").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        placeholder: "[SELECCIONE]",
        dataTextField: "DESCRIPCION",
        dataValueField: "XAERODROMO",
        filter: "contains"
    });

    $("#ID_MES").css("width", "100%").kendoComboBox({
        filter: "contains",
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_MES"
    });
});

function isTrue(obj) {
    if (obj == "") {
        return false;
    } else if (obj == null) {
        return false;
    } else if (obj == 0) {
        return false;
    } else if (obj === false) {
        return false;
    } else {
        return true;
    }
}

function validaSearchForm() {
    var valido = $("#XGIRO").val() && $("#ID_PERSONA_JURIDICA").val() && $("#ID_MES").val();

    $.blockUI({ message: '<img src="/Content/images/loading.gif">', css: { border: 'none', background: 'transparent' } });

    if (!isTrue(valido)) {
        bootbox.alert("Todos los Campos son Obligatorios");
        $.unblockUI();
        js_exit();
    }

    return valido;
}











/*// PAREMETROS DE BUSQUEDA
var ID_GIRO = 0;
var ID_PERSONA_JURIDICA = [];
var ID_MES = 0;
// OTROS PAREMETROS
var XID_DIRECCION_COORDINACION = "";
// VARIABLES
var DESCRIPCION_ANO = "";*/
/*
$(document).ready(function () {
    $("#ID_GIRO").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_GIRO",
        change: function (e) {
            var url = "/PlanVigilanciaDetalleMes/ComboPersonaJuridica?ID_GIRO=" + this.value();
            $.getJSON(url, function (data) {
                var options = [];
                $.each(data.T_GENM_PERSONA_JURIDICA, function (i, item) {
                    options.push({
                        ID_PERSONA_JURIDICA: item.ID_PERSONA_JURIDICA,
                        RAZON_SOCIAL: item.RAZON_SOCIAL
                    });
                });
                var multiSelect = $("#ID_PERSONA_JURIDICA").data("kendoMultiSelect");
                multiSelect.setDataSource(options);
                multiSelect.value([]);
            });
        }
    });

    $("#ID_PERSONA_JURIDICA").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        dataTextField: "RAZON_SOCIAL",
        dataValueField: "ID_PERSONA_JURIDICA"
    });

    $("#ID_MES").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_MES"
    });

    function validaSearchForm() {
        var valido = $("#ID_GIRO").val() && $("#ID_PERSONA_JURIDICA").val() && $("#ID_MES").val();
        if (valido) {
            ID_GIRO = $("#ID_GIRO").val();
            ID_PERSONA_JURIDICA = $("#ID_PERSONA_JURIDICA").val();
            ID_MES = $("#ID_MES").val();
            DESCRIPCION_ANO = $("#DESCRIPCION_ANO").val();
        }
        return valido;
    }

    //$("#SearchForm").on("submit", function (e) {
    //    e.preventDefault();
    //    if (validaSearchForm()) {
    //        $("#CalendarContainer").css("display", "block");
    //        var calendar = $("#Calendar").fullCalendar({
    //            lang: "es",
    //            selectable: true,
    //            header: { right: '', center: 'title', left: '' },
    //            events: "/Inspeccion/GetActividades?" + $(this).serialize(),
    //            eventClick: function (event, jsEvent, view) {
    //                console.log(event);
                    
    //                var url = "/Inspeccion/Inspeccion";
    //                modalAjaxRequestGet(url, "", "", "IDINSPECCION=" + " " + "&ID_ACTIVIDAD=" + event.XID_ACTIVIDAD_DS);
                    
    //            }
    //        }).fullCalendar("gotoDate", DESCRIPCION_ANO + "/" + ID_MES + "/01");
    //    } else {
    //        bootbox.alert("Todos los Campos son Obligatorios");
    //    }
    //});

    
    $("#SearchForm").on("submit", function (e) {
        e.preventDefault();  
        if (validaSearchForm()) {
            $("#CalendarContainer").css("display", "block");
            var calendar = $("#Calendar").fullCalendar({
                lang: "es",
                selectable: true,
                header: { right: '', center: 'title', left: '' },
                events: "/Inspeccion/GetActividades?" + $(this).serialize(),
                eventClick: function (event, jsEvent, view) {
                    var url = "/Inspeccion/Inspeccion";
                    modalAjaxRequestGet(url, "", "", "IDINSPECCION=" + " " + "&ID_ACTIVIDAD=" + event.XID_ACTIVIDAD_DS);

                    //var actividad = {
                    //    ID_ACTIVIDAD_DS: event.id,
                    //    ID_DIRECCION_COORDINACION: event.ID_DIRECCION_COORDINACION,
                    //    ID_MES: event.ID_MES,
                    //    ID_ANO: event.ID_ANO,
                    //    ID_GIRO: event.ID_GIRO,
                    //    ID_PERSONA_JURIDICA: event.ID_PERSONA_JURIDICA,
                    //    ID_PLAN_VIGILANCIA_DS: event.ID_PLAN_VIGILANCIA_DS,
                    //    ID_TIPO_ACTIVIDAD_DS: event.ID_TIPO_ACTIVIDAD_DS,
                    //    ID_INSPECTOR: event.ID_INSPECTOR,
                    //    ID_ESTADO_ACTIVIDAD_DS: event.ID_ESTADO_ACTIVIDAD_DS,
                    //    ID_TIPO_LUGAR_DS: event.ID_TIPO_LUGAR_DS,
                    //    ID_LUGAR: event.ID_LUGAR,
                    //    ID_TIPO_INSPECCION: event.ID_TIPO_INSPECCION,
                    //    FECHA_INICIO: event.start.format("L"),
                    //    FECHA_FIN: event.end.format("L"),
                    //    OBSERVACION: event.OBSERVACION,
                    //    DESC_ANO: event.DESC_ANO,
                    //    DESC_TIPO_ACTIVIDAD: event.DESC_TIPO_ACTIVIDAD,
                    //    RAZON_SOCIAL: event.RAZON_SOCIAL,
                    //    DESC_ESTADO_ACTIVIDAD: event.DESC_ESTADO_ACTIVIDAD,
                    //    DESC_TIPO_LUGAR_DS: event.DESC_TIPO_LUGAR_DS,
                    //    DESC_LUGAR: event.DESC_LUGAR,                      
                    //    DESC_TIPO_INSPECCION: event.DESC_TIPO_INSPECCION,
                    //    NOMBRE_COMPLETO: event.NOMBRE_COMPLETO
                    //};
                    
                    //$.each(actividad, function (key, value) {
                    //    if (key.substring(0, 3) == "ID_") {
                    //        $("#hidden_" + key).val(value);
                    //    } else {
                    //        $("#v_" + key).text(value);
                    //    }
                    //})

                    //if (actividad.ID_TIPO_INSPECCION > 0) {
                    //    $("#divOtroServicio").css("display", "none");
                    //    $("#divOrdenInspeccion").css("display", "block");
                    //} else {
                    //    $("#divOtroServicio").css("display", "block");
                    //    $("#divOrdenInspeccion").css("display", "none");
                    //}

                    //var i = 0;
                    /*
                    if (actividad.ID_ESTADO_ACTIVIDAD_DS == 1) {
                        $("#btn_ESTADO_ACTIVIDAD_1").css("display", "block"); i++;
                    } else {
                        $("#btn_ESTADO_ACTIVIDAD_1").css("display", "none");
                    }*/
                    /*
                    if (actividad.ID_ESTADO_ACTIVIDAD_DS == 3) {
                        $("#btn_ESTADO_ACTIVIDAD_3").css("display", "none");
                        $("#btn_ESTADO_ACTIVIDAD_1").css("display", "none"); i++;
                    } else {
                        $("#btn_ESTADO_ACTIVIDAD_3").css("display", "block");
                    }*/
                    /*
                    if (i > 0) {
                        $("#btnGroupCalendarInspeccion").removeClass("btn-group");
                    } else {
                        $("#btnGroupCalendarInspeccion").addClass("btn-group");
                    }*/

//$("#modalCalendarInspeccion").modal('show');
/*
                }
            }).fullCalendar("gotoDate", DESCRIPCION_ANO + "/" + ID_MES + "/01");
        } else {
            bootbox.alert("Todos los Campos son Obligatorios");
        }
    });
    
});
*/
