$(document).ready(function () {

    $("#XID_PAIS").kendoComboBox({
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

    $("#btnRegistrarCiudad").click(function () {
        if (validDatosCiudad()) {
            var o_T_Genm_Ciudad = {
                DESCRIPCION: $("#DESCRIPCION").val().trim(),
                ID_PAIS: 0,                
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_PAIS: $.trim($("#XID_PAIS").data("kendoComboBox").value()),
                XCIUDAD: $("#XCIUDAD").val().trim()
            }
            console.log(o_T_Genm_Ciudad);

            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/Ciudad/SaveCiudad',
                type: 'POST',
                data: JSON.stringify({ objCiudad: o_T_Genm_Ciudad }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    console.log(data);
                    if (!data.rpta) {
                        errorAddModelo("divErrorCiudad", "ulListaErrorCiudad", data.errores);
                    } else {

                        $("#contenedor").modal('hide');
                        cargarCiudad();

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

function validDatosCiudad() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if ($("#XID_PAIS").data("kendoComboBox").value() == null || $("#XID_PAIS").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_PAIS_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_PAIS": [{ ErrorMessage: "Debe seleccionar el país" }] })
    }
    if (flg) {
        $("#divErrorCiudad").hide();
    }
    else {
        $("#divErrorCiudad").html('<strong>No se puede grabar</strong><ul id="ulListaErrorCiudad"></ul>');
        errorAddJS("divErrorCiudad", "ulListaErrorCiudad", objData)
    }

    return flg;
}