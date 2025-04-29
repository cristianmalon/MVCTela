var dataHelipuerto;

$(document).ready(function () {

    dataHelipuerto = ajaxHelipuerto();

    $("#btnRegistrarHelipuertoEmpresa").click(function () {
        SaveHeliPerJurid();
    });
    
    $("#gridHelipuertoEmpresas").on("click", ".k-grid-cancel", function (e) {
        e.preventDefault();
        var grid = $("#gridHelipuertoEmpresas").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest("tr"));
        //console.log(dataItem);
        grid.dataSource.remove(dataItem);
    });

});

function gridHelipuertoEmpresas(data, lObjeto) {
    //console.log(lObjeto);
    $("#gridHelipuertoEmpresas").html("");
    var dataSource = new kendo.data.DataSource({
        //pageSize: 20,
        autoSync: true,
        schema: {
            model: {
                id: "XID_HELIP_PER_JURID",
                fields: {
                    XID_HELIP_PER_JURID: { editable: false, nullable: true },
                    ID_HELIPUERTO: { validation: { required: true, message: 'Ingrese el helipuerto' }, defaultValue: { ID_HELIPUERTO: 0, OACI: "[SELECCIONE]" } },
                    ID_PAIS: { editable: false, nullable: true },
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

    $("#gridHelipuertoEmpresas").kendoGrid({
        dataSource: dataSource,
        //pageable: true,
        height: 300,
        columns: [
            { field: "XID_HELIP_PER_JURID", hidden: true },
            {
                field: "ID_HELIPUERTO", title: "HELIPUERTO", width: "150px",
                editor: function (container, options) {
                    $('<input required data-text-field="OACI" data-value-field="ID_HELIPUERTO" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        filter: "contains",
                        dataSource: lObjeto,
                        dataTextField: "OACI",
                        dataValueField: "ID_HELIPUERTO"
                    });
                },
                template: "#=ID_HELIPUERTO.OACI#"
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
                template: "#if (XID_HELIP_PER_JURID  == '') {# <a class='k-button k-button-icontext k-grid-cancel' ><span class='k-icon k-cancel'></span>Cancelar</a> #} # ",
                width: 65
            }
        ],
        editable: true
    });

}

$("#btnAddHelipuertoEmpresas").click(function () {

    $("#gridHelipuertoEmpresas")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XID_HELIP_PER_JURID: "",
                            ID_PAIS: 0,
                            ID_HELIPUERTO: { ID_HELIPUERTO: 0, OACI: "[SELECCIONE]", ID_PAIS: 0 },
                            FECHA_INICIO: "",
                            FECHA_FIN: "",
                            FLG_PROPIETARIO: "",
                            FLG_ESTADO: ""
                        });



});

function ajaxHelipuerto() {
    $.ajax({
        datatype: 'json',
        url: '/HeliPerJurid/ListarHelipuertos',
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
                errorAddModelo("divErrorHelipuertoEmpresa", "ulListaErrorHelipuertoEmpresa", data.errores);
            } else {
                var l_T_Genm_Helipuerto = data.data;

                lObjeto.push({
                    ID_HELIPUERTO: 0,
                    OACI: "[SELECCIONE]",
                    ID_PAIS: 0
                });
                $.each(l_T_Genm_Helipuerto, function (index, value) {
                    var Objeto = {
                        ID_HELIPUERTO: value.ID_HELIPUERTO,
                        OACI: value.OACI,
                        ID_PAIS: value.ID_PAIS
                    }
                    lObjeto.push(Objeto);
                });
                console.log(lObjeto);
                gridHelipuertoEmpresas("", lObjeto);
                EditGrillaHelipuertoEmpresas(lObjeto);
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

    var gridHelipuertoEmpresas = $("#gridHelipuertoEmpresas").data("kendoGrid").dataSource.data();
    var message = "";
    var flg = true;

    $.each(gridHelipuertoEmpresas, function (index, item) {
        if ($.trim(item.ID_HELIPUERTO.ID_HELIPUERTO) == "0") {
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
            $("#divErrorHelipuertoEmpresax").hide();
        }
        else {
            $("#divErrorHelipuertoEmpresax").show();
            $("#divErrorHelipuertoEmpresax").html('<strong>' + message + '</strong>');
        }


    });
    return flg;

}

function SaveHeliPerJurid() {

    if (validaGrilla()) {
        var ListHelipuertoEmpresas = [];
        var gridHelipuertoEmpresas = $("#gridHelipuertoEmpresas").data("kendoGrid").dataSource.data();
        if (gridHelipuertoEmpresas != null) {
            $.each(gridHelipuertoEmpresas, function (index, item) {
                
                var T_GEND_HELIP_PER_JURID = {
                    ID_HELIP_PER_JURID: 0,
                    ID_HELIPUERTO: item.ID_HELIPUERTO.ID_HELIPUERTO,
                    ID_PAIS: item.ID_HELIPUERTO.ID_PAIS,
                    FECHA_INICIO: item.FECHA_INICIO,
                    FECHA_FIN: item.FECHA_FIN,
                    FLG_PROPIETARIO: item.FLG_PROPIETARIO,
                    FLG_ESTADO: item.FLG_ESTADO,
                    ID_USUARIO_REG: null,
                    FEC_REG: null,
                    ID_USUARIO_ACT: null,
                    FEC_ACT: null,
                    XID_HELIP_PER_JURID: item.XID_HELIP_PER_JURID,
                    XID_PERSONA_JURIDICA: $("#txtIdPersonaJuridica").val().trim(),
                    OACI: item.ID_HELIPUERTO.OACI
                }

                ListHelipuertoEmpresas.push(T_GEND_HELIP_PER_JURID);
            });
        }
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/HeliPerJurid/SaveRegistroHelipPerJuridXML',
            type: 'POST',
            data: JSON.stringify({ objHelipPerJurid: ListHelipuertoEmpresas }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                //console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorHelipuertoEmpresa", "ulListaErrorHelipuertoEmpresa", data.errores);
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

function EditGrillaHelipuertoEmpresas(lObjeto) {

    $.ajax({
        datatype: 'json',
        url: '/HeliPerJurid/dataGrillaHelipuertoEmpresas',
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

                $.each(data.l_T_GEND_HELIP_PER_JURID, function (index, item) {
                    $("#gridHelipuertoEmpresas")
                            .data("kendoGrid")
                            .dataSource
                            .insert({
                                XID_HELIP_PER_JURID: item.XID_HELIP_PER_JURID,
                                ID_HELIPUERTO: { ID_HELIPUERTO: item.ID_HELIPUERTO, OACI: item.OACI, ID_PAIS: item.ID_PAIS },
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