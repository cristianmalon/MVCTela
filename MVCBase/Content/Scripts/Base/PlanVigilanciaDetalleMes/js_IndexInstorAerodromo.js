$(document).ready(function () {
    $("#XGIRO").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        filter: "contains",
        dataTextField: "DESCRIPCION",
        dataValueField: "XGIRO",
        change: function (e) {
            var url = "/PlanVigilanciaDetalleMes/ComboPersonaJuridicaInstorAerodromo?DESCRIPCION_ANO=" + $("#DESCRIPCION_ANO").val() + "&XGIRO=" + this.value();
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
    var valido = $("#XGIRO").val() && $("#ID_PERSONA_JURIDICA").val() && $("#ID_MES").val() && ($("#XAERODROMO").data("kendoMultiSelect").options.dataSource.length > 0 ? ($("#XAERODROMO").data("kendoMultiSelect").value().length > 0 ? true : false) : true);

    $.blockUI({ message: '<img src="/Content/images/loading.gif">', css: { border: 'none', background: 'transparent' } });

    if (!isTrue(valido)) {
        bootbox.alert("Todos los Campos son Obligatorios");
        $.unblockUI();
        js_exit();
    }

    return valido;
}

function errorAddModeloKendo(divError, listaError, elmContenedor, errorData) {
    $("#" + divError).removeAttr("style");
    $("#" + listaError).empty();
    $("#" + elmContenedor).find(".k-widget").removeClass("valError");
    $.each(errorData, function (key, value) {
        if (value != null) {
            if (key == "*") {
                $("#" + listaError).append("<li>" + value + "</li>");
            }
            else {
                $("#" + elmContenedor).find("." + key).addClass("valError");
                $("#" + listaError).append("<li>" + value[value.length - 1].ErrorMessage + "</li>");
            }
        }
    });
}