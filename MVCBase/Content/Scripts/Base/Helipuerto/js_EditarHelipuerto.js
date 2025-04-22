$(document).ready(function () {

    var txtPeru = $("#txtPeru").val();


    

    if ($("#XHELIPUERTO").val().trim() == "") {
        $("#DivDepartamento").hide();
        $("#DivProvincia").hide();
        $("#DivDistrito").hide();
    } else {
        if ($("#XPAIS").val() == txtPeru) {
            $("#DivDepartamento").show();
            $("#DivProvincia").show();
            $("#DivDistrito").show();
            $("#XDEPARTAMENTO").toggleEnable();
            $("#XPROVINCIA").toggleEnable();
            $("#XDISTRITO").toggleEnable();
            
        } else {
            $("#DivDepartamento").hide();
            $("#DivProvincia").hide();
            $("#DivDistrito").hide();
        }
    }


    if ($("#XPAIS").val() == txtPeru) {
        $("#XDEPARTAMENTO").toggleEnable();
        $("#XPROVINCIA").toggleEnable();
        $("#XDISTRITO").toggleEnable();
    }

    $("#XCIUDAD").kendoComboBox({
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
        }
    });

    $("#XPAIS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {
                $("#XCIUDAD").data("kendoComboBox").value('');

                if ($.trim($("#XPAIS").data("kendoComboBox").value()) == txtPeru) {

                    $("#XDEPARTAMENTO").data("kendoComboBox").enable(true);
                    $("#XPROVINCIA").data("kendoComboBox").enable(true);
                    $("#XDISTRITO").data("kendoComboBox").enable(true);
                    $("#DivDepartamento").show();
                    $("#DivProvincia").show();
                    $("#DivDistrito").show();

                }
                else {
                    $("#XDEPARTAMENTO").data("kendoComboBox").value('');
                    $("#XPROVINCIA").data("kendoComboBox").value('');
                    $("#XDISTRITO").data("kendoComboBox").value('');

                    $("#XDEPARTAMENTO").data("kendoComboBox").enable(false);
                    $("#XPROVINCIA").data("kendoComboBox").enable(false);
                    $("#XDISTRITO").data("kendoComboBox").enable(false);
                    $("#DivDepartamento").hide();
                    $("#DivProvincia").hide();
                    $("#DivDistrito").hide();

                }

                if ($.trim($("#XPAIS").data("kendoComboBox").value()) != "" && $("#XPAIS").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Aerodromo/datoCiudad',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XPAIS: $.trim($("#XPAIS").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorAerodromo", "ulListaErrorAerodromo", data.errores);
                            } else {
                                var l_T_Genm_Ciudad = data.l_T_Genm_Ciudad;


                                var lCiudad = [];
                                $.each(l_T_Genm_Ciudad, function (index, value) {
                                    var oProvincia = {
                                        value: value.XCIUDAD,
                                        text: value.DESCRIPCION
                                    }
                                    lCiudad.push(oProvincia);
                                });

                                var XCIUDAD = $("#XCIUDAD").data("kendoComboBox");

                                XCIUDAD.setDataSource(lCiudad);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });

                }

            }
        },
    });

    $("#XDEPARTAMENTO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        select: onSelectProvincia,
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#XDEPARTAMENTO").data("kendoComboBox").value()) != "" && $("#XDEPARTAMENTO").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Helipuerto/CargarProvincia',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XDEPARTAMENTO: $.trim($("#XDEPARTAMENTO").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorHelipuerto", "ulListaErrorHelipuerto", data.errores);
                            } else {
                                var l_GENM_PROVINCIA = data.l_GENM_PROVINCIA;



                                var lProvincia = [];
                                $.each(l_GENM_PROVINCIA, function (index, value) {
                                    var oProvincia = {
                                        value: value.XPROVINCIA,
                                        text: value.DESCRIPCION
                                    }
                                    lProvincia.push(oProvincia);
                                });
                                $("#XPROVINCIA").data("kendoComboBox").value('');
                                $("#XDISTRITO").data("kendoComboBox").value('');


                                var multiselect = $("#XPROVINCIA").data("kendoComboBox");
                                console.log(lProvincia);
                                multiselect.setDataSource(lProvincia);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });

                }
            }
        },
    });

    $("#XPROVINCIA").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        select: onSelectDistrito,
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#XPROVINCIA").data("kendoComboBox").value()) != "" && $("#XPROVINCIA").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Helipuerto/CargarDistrito',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XPROVINCIA: $.trim($("#XPROVINCIA").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorHelipuerto", "ulListaErrorHelipuerto", data.errores);
                            } else {
                                var l_GENM_DISTRITO = data.l_GENM_DISTRITO;



                                var lDistrito = [];
                                $.each(l_GENM_DISTRITO, function (index, value) {
                                    var oDistrito = {
                                        value: value.XDISTRITO,
                                        text: value.DESCRIPCION
                                    }
                                    lDistrito.push(oDistrito);
                                });
                                $("#XDISTRITO").data("kendoComboBox").value('');
                                var multiselect = $("#XDISTRITO").data("kendoComboBox");
                                console.log(lDistrito);
                                multiselect.setDataSource(lDistrito);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });

                }

            }
        },
    });

    $("#XDISTRITO").kendoComboBox({
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

});




function onSelectProvincia(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Helipuerto/CargarProvincia',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XDEPARTAMENTO: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorHelipuerto", "ulListaErrorHelipuerto", data.errores);
                } else {
                    var l_GENM_PROVINCIA = data.l_GENM_PROVINCIA;

                    var lProvincia = [];
                    $.each(l_GENM_PROVINCIA, function (index, value) {
                        var oProvincia = {
                            value: value.XPROVINCIA,
                            text: value.DESCRIPCION
                        }
                        lProvincia.push(oProvincia);
                    });
                    $("#XPROVINCIA").data("kendoComboBox").value('');

                    var multiselect = $("#XPROVINCIA").data("kendoComboBox");
                    console.log(lProvincia);
                    multiselect.setDataSource(lProvincia);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });


    }

}


function onSelectDistrito(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Helipuerto/CargarDistrito',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XPROVINCIA: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorHelipuerto", "ulListaErrorHelipuerto", data.errores);
                } else {
                    var l_GENM_DISTRITO = data.l_GENM_DISTRITO;

                    var lDistrito = [];
                    $.each(l_GENM_DISTRITO, function (index, value) {
                        var oDistrito = {
                            value: value.XDISTRITO,
                            text: value.DESCRIPCION
                        }
                        lDistrito.push(oDistrito);
                    });
                    $("#XDISTRITO").data("kendoComboBox").value('');

                    var multiselect = $("#XDISTRITO").data("kendoComboBox");
                    console.log(lDistrito);
                    multiselect.setDataSource(lDistrito);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });


    }

}

function validDatosHelipuerto() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;
    var txtPeru = $("#txtPeru").val()

    if ($.trim($("#OACI").val()) == "") {
        flg = false;
        objData.push({ "OACI": [{ ErrorMessage: "Debe ingresar el código OACI" }] })
    }
    if ($.trim($("#IATA").val()) == "") {
        flg = false;
        objData.push({ "IATA": [{ ErrorMessage: "Debe ingresar el código IATA" }] })
    }
    if ($.trim($("#XPAIS").data("kendoComboBox").value()) == txtPeru) {

        if ($("#DESCRIPCION").val().trim() == "") {
            flg = false;
            objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
        }
        if ($("#XPAIS").data("kendoComboBox").value() == null || $("#XPAIS").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XPAIS_listbox"]').parents("span").addClass("valError");
            objData.push({ "XPAIS": [{ ErrorMessage: "Debe seleccionar el país" }] })
        }
        if ($("#XCIUDAD").data("kendoComboBox").value() == null || $("#XCIUDAD").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XCIUDAD_listbox"]').parents("span").addClass("valError");
            objData.push({ "XCIUDAD": [{ ErrorMessage: "Debe seleccionar la ciudad" }] })
        }
        if ($("#XDEPARTAMENTO").data("kendoComboBox").value() == null || $("#XDEPARTAMENTO").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
            objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar departamento" }] })
        }
        if ($("#XPROVINCIA").data("kendoComboBox").value() == null || $("#XPROVINCIA").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XPROVINCIA_listbox"]').parents("span").addClass("valError");
            objData.push({ "XPROVINCIA": [{ ErrorMessage: "Debe seleccionar provincia" }] })
        }
        if ($("#XDISTRITO").data("kendoComboBox").value() == null || $("#XDISTRITO").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XDISTRITO_listbox"]').parents("span").addClass("valError");
            objData.push({ "XDISTRITO": [{ ErrorMessage: "Debe seleccionar distrito" }] })
        }
        if (flg) {
            $("#divErrorHelipuerto").hide();
        }
        else {
            $("#divErrorHelipuerto").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelipuerto"></ul>');
            errorAddJS("divErrorHelipuerto", "ulListaErrorHelipuerto", objData)
        }

    } else {

        if ($("#DESCRIPCION").val().trim() == "") {
            flg = false;
            objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
        }
        if ($("#XPAIS").data("kendoComboBox").value() == null || $("#XPAIS").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XPAIS_listbox"]').parents("span").addClass("valError");
            objData.push({ "XPAIS": [{ ErrorMessage: "Debe seleccionar el país" }] })
        }
        if ($("#XCIUDAD").data("kendoComboBox").value() == null || $("#XCIUDAD").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XCIUDAD_listbox"]').parents("span").addClass("valError");
            objData.push({ "XCIUDAD": [{ ErrorMessage: "Debe seleccionar la ciudad" }] })
        }
        if (flg) {
            $("#divErrorHelipuerto").hide();
        }
        else {
            $("#divErrorHelipuerto").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelipuerto"></ul>');
            errorAddJS("divErrorHelipuerto", "ulListaErrorHelipuerto", objData)
        }
    }


    return flg;
}


$("#btnRegistrarHelipuerto").bind("click", function () {


    if (validDatosHelipuerto()) {

        var T_GENM_HELIPUERTO = {
            ID_HELIPUERTO: 0,
            ID_PAIS: 0,
            ID_DEPARTAMENTO: 0,
            ID_PROVINCIA: 0,
            ID_DISTRITO: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            OACI: $.trim($("#OACI").val()),
            IATA: $.trim($("#IATA").val()),
            XPAIS: $("#XPAIS").data("kendoComboBox").value(),
            XCIUDAD: $("#XCIUDAD").data("kendoComboBox").value(),
            XDEPARTAMENTO: $("#XDEPARTAMENTO").data("kendoComboBox").value(),
            XPROVINCIA: $("#XPROVINCIA").data("kendoComboBox").value(),
            XDISTRITO: $("#XDISTRITO").data("kendoComboBox").value(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XHELIPUERTO: $("#XHELIPUERTO").val().trim()

        }

        console.log(T_GENM_HELIPUERTO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Helipuerto/SaveHelipuerto',
            type: 'POST',
            data: JSON.stringify({ objHelipuerto: T_GENM_HELIPUERTO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorHelipuerto", "ulListaErrorHelipuerto", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    cargarGridHelipuertos();
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
