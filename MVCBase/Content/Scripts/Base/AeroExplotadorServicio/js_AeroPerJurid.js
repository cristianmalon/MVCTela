var dataAerodromo;

$(document).ready(function () {

    dataAerodromo = ajaxAerodromo();

    $("#btnRegistrarAerodromoEmpresa").click(function () {
        SaveAeroPerJurid();
    });
    
    $("#gridAerodromoEmpresas").on("click", ".k-grid-cancel", function (e) {
        e.preventDefault();
        var grid = $("#gridAerodromoEmpresas").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest("tr"));
        //console.log(dataItem);
        grid.dataSource.remove(dataItem);
    });

});

function gridAerodromoEmpresas(data, lObjeto) {
    //console.log(lObjeto);
    $("#gridAerodromoEmpresas").html("");
    var dataSource = new kendo.data.DataSource({
        //pageSize: 20,
        autoSync: true,
        schema: {
            model: {
                id: "XID_EXPLOTADOR_SERVICIO",
                fields: {
                    XID_EXPLOTADOR_SERVICIO: { editable: false, nullable: true },
                    ID_AERODROMO: { validation: { required: true, message: 'Ingrese el aerodromo' }, defaultValue: { ID_AERODROMO: 0, OACI: "[SELECCIONE]" } },
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
                    FLG_ESTADO: { type: "boolean" },
                    FLG_PROPIETARIO: { type: "boolean" }
                }
            }
        }
    });

    $("#gridAerodromoEmpresas").kendoGrid({
        dataSource: dataSource,
        //pageable: true,
        height: 300,
        columns: [
            { field: "XID_EXPLOTADOR_SERVICIO", hidden: true },
            {
                field: "ID_AERODROMO", title: "AERÓDROMO", width: "150px",
                editor: function (container, options) {
                    $('<input required data-text-field="OACI" data-value-field="ID_AERODROMO" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        filter: "contains",
                        dataSource: lObjeto,
                        dataTextField: "OACI",
                        dataValueField: "ID_AERODROMO"
                    });
                },
                template: "#=ID_AERODROMO.OACI#"
            },
            { field: "FECHA_INICIO", title: "FECHA INICIO", format: "{0:dd/MM/yyyy}", width: "100px" },
            { field: "FECHA_FIN", title: "FECHA FIN", format: "{0:dd/MM/yyyy}", width: "100px" },
            {
                field: "FLG_PROPIETARIO",
                title: "ES PROPIETARIO ACTUAL?",
                template: "<input type='checkbox' #= FLG_PROPIETARIO ? 'checked=checked' : '' # disabled='disabled' ></input>",
                width: 150
            },
            {
                field: "FLG_ESTADO",
                title: "ACTIVO?",
                template: "<input type='checkbox' #= FLG_ESTADO ? 'checked=checked' : '' # disabled='disabled' ></input>",
                width: 70
            },
            {
                template: "#if (XID_EXPLOTADOR_SERVICIO  == '') {# <a class='k-button k-button-icontext k-grid-cancel' ><span class='k-icon k-cancel'></span>Cancelar</a> #} # ",
                width: 65
            }
        ],
        editable: true
    });

}

$("#btnAddAerodromoEmpresas").click(function () {

    $("#gridAerodromoEmpresas")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XID_EXPLOTADOR_SERVICIO: "",
                            ID_AERODROMO: { ID_AERODROMO: 0, OACI: "[SELECCIONE]" },
                            FECHA_INICIO: "",
                            FECHA_FIN: "",
                            FLG_PROPIETARIO: "",
                            FLG_ESTADO: ""

                        });



});

function ajaxAerodromo() {
    $.ajax({
        datatype: 'json',
        url: '/AeroExplotadorServicio/ListarAerodromos',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
           
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            var lObjeto = [];
            if (!data.rpta) {
                errorAddModelo("divErrorAerodromoEmpresa", "ulListaErrorAerodromoEmpresa", data.errores);
            } else {
                var l_T_Mae_Aerodromo = data.data;

                lObjeto.push({
                    ID_AERODROMO: 0,
                    OACI: "[SELECCIONE]"
                });
                $.each(l_T_Mae_Aerodromo, function (index, value) {
                    var Objeto = {
                        ID_AERODROMO: value.ID_AERODROMO,
                        OACI: value.OACI
                    }
                    lObjeto.push(Objeto);
                });

                gridAerodromoEmpresas("", lObjeto);
                EditGrillaAerodromoEmpresas(lObjeto);
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

    var gridAerodromoEmpresas = $("#gridAerodromoEmpresas").data("kendoGrid").dataSource.data();
    var message = "";
    var flg = true;

    $.each(gridAerodromoEmpresas, function (index, item) {
        if ($.trim(item.ID_AERODROMO.ID_AERODROMO) == "0") {
            flg = false;
            message = "Debe seleccionar el aeródromo";
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
            $("#divErrorAerodromoEmpresax").hide();
        }
        else {
            $("#divErrorAerodromoEmpresax").show();
            $("#divErrorAerodromoEmpresax").html('<strong>' + message + '</strong>');
        }


    });
    return flg;

}

function SaveAeroPerJurid() {

    if (validaGrilla()) {
        var ListAerodromoEmpresas = [];
        var gridAerodromoEmpresas = $("#gridAerodromoEmpresas").data("kendoGrid").dataSource.data();
        if (gridAerodromoEmpresas != null) {
            $.each(gridAerodromoEmpresas, function (index, item) {

                var T_GEND_EXPLOTADOR_SERVICIO = {
                    ID_EXPLOTADOR_SERVICIO: 0,
                    ID_AERODROMO: item.ID_AERODROMO.ID_AERODROMO,                    
                    FECHA_INICIO: item.FECHA_INICIO,
                    FECHA_FIN: item.FECHA_FIN,
                    FLG_PROPIETARIO: item.FLG_PROPIETARIO,
                    FLG_ESTADO: item.FLG_ESTADO,
                    ID_USUARIO_REG: null,
                    FEC_REG: null,
                    ID_USUARIO_ACT: null,
                    FEC_ACT: null,
                    XID_EXPLOTADOR_SERVICIO: item.XID_EXPLOTADOR_SERVICIO,
                    XID_PERSONA_JURIDICA: $("#txtIdPersonaJuridica").val().trim(),
                    OACI: item.ID_AERODROMO.OACI
                }

                ListAerodromoEmpresas.push(T_GEND_EXPLOTADOR_SERVICIO);
            });
        }
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/AeroExplotadorServicio/SaveRegistroAeroPerJuridXML',
            type: 'POST',
            data: JSON.stringify({ objAeroPerJurid: ListAerodromoEmpresas }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                //console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorAerodromoEmpresa", "ulListaErrorAerodromoEmpresa", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridRazonSocial();

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

function EditGrillaAerodromoEmpresas(lObjeto) {

    $.ajax({
        datatype: 'json',
        url: '/AeroExplotadorServicio/dataGrillaAerodromoEmpresas',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            PersonaJuridica: $("#txtIdPersonaJuridica").val()
        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {

            } else {

                $.each(data.l_T_Gend_Explotador_Servicio, function (index, item) {
                    $("#gridAerodromoEmpresas")
                            .data("kendoGrid")
                            .dataSource
                            .insert({
                                XID_EXPLOTADOR_SERVICIO: item.XID_EXPLOTADOR_SERVICIO,
                                ID_AERODROMO: { ID_AERODROMO: item.ID_AERODROMO, OACI: item.OACI },
                                FECHA_INICIO: dateFormat(item.XFECHA_INICIO),
                                FECHA_FIN: dateFormat(item.XFECHA_FIN),
                                FLG_ESTADO: item.FLG_ESTADO,
                                FLG_PROPIETARIO: item.FLG_PROPIETARIO
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

/*
function validDatosAeroPerJurid() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;
    
    console.log(kendo.parseDate($("#FECHA_INICIO").data("kendoDatePicker").value(), "dd/MM/yyyy"));
    console.log(kendo.parseDate($("#FECHA_FIN").data("kendoDatePicker").value(), "dd/MM/yyyy"));
    
    if ($("#FECHA_INICIO").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_INICIO").parents("span").addClass("valError");
        objData.push({ "FECHA_INICIO": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha inicio" }] })
    }
    if ($("#FECHA_FIN").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_FIN").parents("span").addClass("valError");
        objData.push({ "FECHA_FIN": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha fin" }] })
    }
    if ($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == null || $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_PERSONA_JURIDICA_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_PERSONA_JURIDICA": [{ ErrorMessage: "Debe seleccionar la razón social" }] })
    }
    if ($("#XID_AERODROMO").data("kendoComboBox").value() == null || $("#XID_AERODROMO").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_AERODROMO_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_AERODROMO": [{ ErrorMessage: "Debe seleccionar el aeródromo" }] })
    }
    if (flg) {
        $("#divErrorAerodromoEmpresa").hide();
    }
    else {
        $("#divErrorAerodromoEmpresa").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAerodromoEmpresa"></ul>');
        errorAddJS("divErrorAerodromoEmpresa", "ulListaErrorAerodromoEmpresa", objData)
    }

    return flg;
}

function validFecha() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    console.log(kendo.parseDate($("#FECHA_INICIO").data("kendoDatePicker").value(), "dd/MM/yyyy"));
    console.log(kendo.parseDate($("#FECHA_FIN").data("kendoDatePicker").value(), "dd/MM/yyyy"));
    var fechaInicio = $("#FECHA_INICIO").data("kendoDatePicker").value();
    var fechaFin = $("#FECHA_FIN").data("kendoDatePicker").value();

    if (fechaInicio > fechaFin) {
        flg = false;
        $("#FECHA_INICIO").parents("span").addClass("valError");
        objData.push({ "FECHA_INICIO": [{ ErrorMessage: "La fecha Inicio no puede ser mayor que la fecha fin" }] })
    }
    
    if (flg) {
        $("#divErrorAerodromoEmpresa").hide();
    }
    else {
        $("#divErrorAerodromoEmpresa").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAerodromoEmpresa"></ul>');
        errorAddJS("divErrorAerodromoEmpresa", "ulListaErrorAerodromoEmpresa", objData)
    }

    return flg;
}

$("#btnRegistrarAerodromoEmpresa").bind("click", function () {


    if (validDatosAeroPerJurid()) {


        var T_GEND_AERO_PER_JURID = {
            ID_AERO_PER_JURID: 0,
            XID_AERODROMO: $("#XID_AERODROMO").data("kendoComboBox").value(),
            XID_PERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value(),
            FECHA_INICIO: $("#FECHA_INICIO").data("kendoDatePicker").value(),
            FECHA_FIN: $("#FECHA_FIN").data("kendoDatePicker").value(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_AERO_PER_JURID: $("#XID_AERO_PER_JURID").val().trim()            
        }

        console.log(T_GEND_AERO_PER_JURID);
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/AeroPerJurid/SaveRegistroAeroPerJurid',
            type: 'POST',
            data: JSON.stringify({ objAeroPerJurid: T_GEND_AERO_PER_JURID }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorAerodromoEmpresa", "ulListaErrorAerodromoEmpresa", data.errores);
                } else {
                    //console.log(data.newcontregistro);

                    $("#contenedor").modal('hide');
                    cargarGridAeroPerJurid();

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
*/