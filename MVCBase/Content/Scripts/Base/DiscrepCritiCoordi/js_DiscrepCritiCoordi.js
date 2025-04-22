$(document).ready(function () {

    $("#XID_COORDINACION_TECNICA").kendoComboBox({
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

    $("#XID_DISCREP_CRITICIDAD_DS").kendoComboBox({
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

    $("#btnRegistrarDiscrepCritiCoordi").click(function () {
        if (validDatosDiscrepCritiCoordi()) {
            var o_T_GEND_DISCREP_CRI_COORDI_DS = {
                ID_DISCREP_CRI_COORDI_DS: 0,
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_COORDINACION_TECNICA: $.trim($("#XID_COORDINACION_TECNICA").data("kendoComboBox").value()),
                XID_DISCREP_CRITICIDAD_DS: $.trim($("#XID_DISCREP_CRITICIDAD_DS").data("kendoComboBox").value()),
                XID_DISCREP_CRI_COORDI_DS: $("#XID_DISCREP_CRI_COORDI_DS").val().trim()
            }
            console.log(o_T_GEND_DISCREP_CRI_COORDI_DS);

            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/DiscrepCritiCoordi/SaveDiscrepCritiCoordi',
                type: 'POST',
                data: JSON.stringify({ objDiscrepCriCoordi: o_T_GEND_DISCREP_CRI_COORDI_DS }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    console.log(data);
                    if (!data.rpta) {
                        errorAddModelo("divErrorDiscrepCritiCoordi", "ulListaErrorDiscrepCritiCoordi", data.errores);
                    } else {

                        $("#contenedor").modal('hide');
                        cargarDiscreoCritiCoordi();

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


function validDatosDiscrepCritiCoordi() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XID_COORDINACION_TECNICA").data("kendoComboBox").value() == null || $("#XID_COORDINACION_TECNICA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_COORDINACION_TECNICA_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_COORDINACION_TECNICA": [{ ErrorMessage: "Debe seleccionar la coordinación técnica" }] })
    }
    if ($("#XID_DISCREP_CRITICIDAD_DS").data("kendoComboBox").value() == null || $("#XID_DISCREP_CRITICIDAD_DS").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_DISCREP_CRITICIDAD_DS_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_DISCREP_CRITICIDAD_DS": [{ ErrorMessage: "Debe seleccionar la criticidad" }] })
    }
    if (flg) {
        $("#divErrorDiscrepCritiCoordi").hide();
    }
    else {
        $("#divErrorDiscrepCritiCoordi").html('<strong>No se puede grabar</strong><ul id="ulListaErrorDiscrepCritiCoordi"></ul>');
        errorAddJS("divErrorDiscrepCritiCoordi", "ulListaErrorDiscrepCritiCoordi", objData)
    }

    return flg;
}