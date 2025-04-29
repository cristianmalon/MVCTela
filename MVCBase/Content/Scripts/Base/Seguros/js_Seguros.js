

$(document).ready(function () {
    
    
    $("#txtFechaFinalVigencia").kendoDatePicker();

    gridConsultaSeguros('');

    $("#btnBuscarSeguro").click(function () {
        cargarGridConsultaAeronaveSeguros();
    });

    $("#btnNuevoSeguro").bind("click", function () {
        NuevoRegistroRegistroModal();
    });

    $("#btnActSeguro").bind("click", function () {
        ActualizarRegistroModal();
    });

    $("#btnGrabarPoliza").click(function () {
        GrabarPoliza();
    });


    $("#btnAgregarCobertura").bind("click", function () {
        NuevoRegistroCobertura();
    });

    $("#btnGuardarCobertura").bind("click", function () {
        GuardarCobertura();
    });
});


function NuevoRegistroCobertura(){
    $("#contenedorModalCobertura").modal('show');
    $("#txtMontocobertura").val('');
    $("#XCOBERTURA_SEGURO").val(''),
    $("#XSEGUROS").val('');
    $("#XTIPO_COBERTURA").val('');
    $(".valError").removeClass("valError");
    $("#divErrorCobertura").hide();

}






var checkedIds = {};
var ListBandeja = [];
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#gridConsultaSeguros").data("kendoGrid"),
    dataItem = grid.dataItem(row);


    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
        checkedIds[dataItem.id] = { "ID_SEGUROS": dataItem.XSEGUROS, "IDCONTREG": dataItem.XCONTREGISTRO, "IDAERONAVEPA": dataItem.XAERONAVE_PA, "MATRICULA": dataItem.MATRICULA, "XPERSONA_JURIDICA" : dataItem.XPERSONA_JURIDICA  };

    } else {
        //-remove selection
        delete checkedIds[dataItem.id];
        row.removeClass("k-state-selected");
    }
}


function GrabarPoliza() {

    if (validarSeguro()) {
    $("#FECHA_INICIO_VIGENCIA").focus();
    $("#FECHA_FIN_VIGENICIA").focus();
    $("#OBSERVACION").focus();

    var KDPFECHA_INICIO_VIGENCIA = $("#FECHA_INICIO_VIGENCIA").data("kendoDatePicker");
    var KDPFECHA_FIN_VIGENICIA = $("#FECHA_FIN_VIGENICIA").data("kendoDatePicker");

    var FECHA_INICIO = new Date(1999, 1, 1);
    var FECHA_FIN = new Date(1999, 1, 1);

    FECHA_INICIO = KDPFECHA_INICIO_VIGENCIA.value();
    FECHA_FIN = KDPFECHA_FIN_VIGENICIA.value();


    var oSeguros = {
        XSEGUROS: $("#XSEGUROS").val(),
        XCOMPANIA_SEGUROS: $("#XCOMPANIA_SEGUROS").val(),
        FECHA_INICIO_VIGENCIA: FECHA_INICIO,
        FECHA_FIN_VIGENICIA: FECHA_FIN,
        //XTIPO_COBERTURA: $("#XTIPO_COBERTURA").val(),
        LIMITE_GEOGRAFICO: $("#LIMITE_GEOGRAFICO").val(),
        XTIPO_VENCIMIENTO_POLIZA: $("#XTIPO_VENCIMIENTO_POLIZA").val(),
        OBSERVACION: $("#OBSERVACION").val()
    };

    var objCoberturaAjax = [];
    var gridCobertura = $("#gridCobertura").data("kendoGrid").dataSource.data();
        
    $.each(gridCobertura, function (index, item) {
        
        var dataCobertura = {
            XCOBERTURA_SEGURO:item.XCOBERTURA_SEGURO,
            XSEGUROS: item.XSEGUROS,
            XTIPO_COBERTURA: item.XTIPO_COBERTURA,
            MONTO: item.MONTO
        }
        objCoberturaAjax.push(dataCobertura);
    });


    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Seguros/SavePoliza',
        type: 'POST',
        data: JSON.stringify({ objMatricula: ListBandeja, oSeguros: oSeguros, objCobertura: objCoberturaAjax }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divError", "ulListaError", data.errores);
            } else {
                //cargarGridRegisroPA();
                window.location = window.location;
            }

            desbloqObject();

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });



    //$.ajax({
    //    datatype: 'json',
    //    contentType: "application/json",
    //    url: '/EnviarRegistroPA/SaveRegistroPA',
    //    type: 'POST',
    //    data: JSON.stringify({ objBandeja: ListBandeja }),
    //    beforeSend: function () {
    //        bloquoteObject();
    //    },
    //    success: function (data) {

    //        console.log(data);
    //        if (!data.rpta) {
    //            errorAddModelo("divError", "ulListaError", data.errores);
    //        } else {
    //            //cargarGridRegisroPA();
    //            window.location = window.location;
    //        }

    //        desbloqObject();

    //    }
    //}).fail(function (jqxhr, textStatus, error) {
    //    var err = textStatus + ', ' + error;
    //    console.log("Request Failed: " + err);
    //    desbloqObject();
        //});
    }

}


function NuevoRegistroRegistroModal() {
    $("#divErrorSeguros").hide();
    //var objData = [];
    //errorAddJS("divErrorSeguros", "ulListaErrorSeguros", objData)
    var grid = $("#gridConsultaSeguros").data("kendoGrid");
    var selectedRows = $(".k-state-selected", "#gridConsultaSeguros");

    var selectedItem = grid.dataItem(selectedRows[0]);
    if (selectedItem != undefined) {
                ListBandeja = [];

                $.each(checkedIds, function (index, item) {
                    if (item.ID_SEGUROS == "") {
                        seguros = " ";
                    } else {
                        seguros = item.ID_SEGUROS;
                    }

                    var T_GEND_AERONAVE_PA_BANDEJA = {
                        XSEGUROS: seguros,
                        XAERONAVE_PA: item.IDAERONAVEPA,
                        CONTREGISTRO: item.IDCONTREG,
                        MATRICULA: item.MATRICULA,
                        XPERSONA_JURIDICA: item.XPERSONA_JURIDICA
                    }

                    ListBandeja.push(T_GEND_AERONAVE_PA_BANDEJA);
                });
                console.log(ListBandeja);


                $("#contenedorModalRegistro").modal('show');
                $("#FECHA_INICIO_VIGENCIA").kendoDatePicker();
                $("#FECHA_FIN_VIGENICIA").kendoDatePicker();
                $("#FECHA_INICIO_VIGENCIA").val('');
                $("#FECHA_FIN_VIGENICIA").val('');
                $("#XCOMPANIA_SEGUROS").val('');
                $("#LIMITE_GEOGRAFICO").val('');
                $("#XTIPO_VENCIMIENTO_POLIZA").val('');
                $("#OBSERVACION").val('');
                
                gridCobertura('');
                $("#gridCobertura").data('kendoGrid').dataSource.data([]);
       
    }
    else {
        //alert("Seleccione al menos un registro!!!");
        bootbox.alert("Seleccione un registro de la tabla");
    }

    
}

function ActualizarRegistroModal() {
    $("#divErrorSeguros").hide();
    var objData = [];
    //errorAddJS("divErrorSeguros", "ulListaErrorSeguros", objData)
    var grid = $("#gridConsultaSeguros").data("kendoGrid");
    var selectedRows = $(".k-state-selected", "#gridConsultaSeguros");

    var selectedItem = grid.dataItem(selectedRows[0]);
    if (selectedItem != undefined) {
        ListBandeja = [];
        var seguros = "";
        $.each(checkedIds, function (index, item) {
            if (item.ID_SEGUROS == "") {
                seguros = " ";
            } else {
                seguros = item.ID_SEGUROS;
            }

            var T_GEND_AERONAVE_PA_BANDEJA = {
                XSEGUROS: seguros,
                XAERONAVE_PA: item.IDAERONAVEPA,
                CONTREGISTRO: item.IDCONTREG,
                MATRICULA: item.MATRICULA,
                XPERSONA_JURIDICA: item.XPERSONA_JURIDICA
            }

            ListBandeja.push(T_GEND_AERONAVE_PA_BANDEJA);
        });
        console.log(ListBandeja);




        $("#contenedorModalRegistro").modal('show');
        $("#FECHA_INICIO_VIGENCIA").kendoDatePicker();
        $("#FECHA_FIN_VIGENICIA").kendoDatePicker();


        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Seguros/DetallePoliza',
            type: 'POST',
            data: JSON.stringify({ objMatricula: ListBandeja}),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    
                    $("#XCOMPANIA_SEGUROS").val('');
                    $("#FECHA_INICIO_VIGENCIA").val('');
                    $("#FECHA_FIN_VIGENICIA").val('');
                    $("#LIMITE_GEOGRAFICO").val('');
                    $("#XTIPO_VENCIMIENTO_POLIZA").val('');
                    $("#OBSERVACION").val('');
                    gridCobertura('');
                    desbloqObject();
                } else {
                    
                    var dataseguro = data.l_seguros;
                    console.log(data);
                    $("#XSEGUROS").val(dataseguro[0].XSEGUROS);
                    $("#XCOMPANIA_SEGUROS").val(dataseguro[0].XCOMPANIA_SEGUROS);
                    $("#FECHA_INICIO_VIGENCIA").val(dataseguro[0].XFECHA_INICIO);
                    $("#FECHA_FIN_VIGENICIA").val(dataseguro[0].XFECHA_FIN);
                    $("#XTIPO_COBERTURA").val(dataseguro[0].XTIPO_COBERTURA);
                    $("#LIMITE_GEOGRAFICO").val(dataseguro[0].LIMITE_GEOGRAFICO);
                    $("#XTIPO_VENCIMIENTO_POLIZA").val(dataseguro[0].XTIPO_VENCIMIENTO_POLIZA);
                    $("#OBSERVACION").val(dataseguro[0].OBSERVACION);

                    gridCobertura(data.l_Gend_cobertura_Seguro);

                    desbloqObject();

                }

                desbloqObject();

            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });




    }
    else {
        //alert("Seleccione al menos un registro!!!");
        bootbox.alert("Seleccione un registro de la tabla");
    }


}

function NuevoModal() {

    $("#FECHA_INICIO_VIGENCIA").val('');
    $("#FECHA_FIN_VIGENICIA").val('');
    $("#LIMITE_GEOGRAFICO").val('');
    OBSERVACION: $("#OBSERVACION").val('');

}


function cargarGridConsultaAeronaveSeguros() {
    $("#gridConsultaSeguros").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Seguros/ListarSeguro",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ txtMatricula: $('#txtPorMatriculaAeronave').val(), txtRazonSocial: $("#txtBuscarPorRazonSocial").val(), tipo_poliza: $("#XTIPO_VENCIMIENTO_POLIZA_BUSCAR").val(), fec_fin: $("#txtFechaFinalVigencia").val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_SEGUROS",
            total: "pageSize",
            type: 'json',
            model: {
                id: "XCONTREGISTRO",
                fields: {
                    XSEGUROS: { type: "string" },
                    XAERONAVE_PA: { type: "string" },
                    XCONTREGISTRO: { type: "string" },
                    XPERSONA_JURIDICA: { type: "string" },
                    RAZON_SOCIAL: { type: "string" },
                    MATRICULA: { type: "string" },
                    DESCRIPCION_COMPAÑIA : { type: "string" },
                    TIPO_VENCIMIENTO_POLIZA: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    
    var grid = $("#gridConsultaSeguros").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        columns: [
            {
                //title: "<input id='checkAll', type='checkbox', class='check-box' />",
                title: "MARCAR",
                width: 80,
                template: "<input type='checkbox' class='checkbox' />"
                //template: "# if(XSITUACIONBANDEJA == 1 ) {# <input type='checkbox' class='checkbox' /> #} else if(XSITUACIONBANDEJA == 3) {# <input type='checkbox' class='checkbox' /> #} else {# <div>&nbsp;</div> #} #"
                //template: "# if(XSITUACIONBANDEJA == 1 ) {# <input type='checkbox' class='checkbox' /> #} else {# <div>&nbsp;</div> #} #"
            }, {
                field: "XSEGUROS",
                width: 90,
                title: "ID_SEGUROS",
                hidden: true
            }, {
                field: "XAERONAVE_PA",
                width: 90,
                title: "ID_AERONAVE_PA",
                hidden: true
            }, {
                field: "XCONTREGISTRO",
                width: 90,
                title: "ID_CONTREGISTRO",
                hidden: true
            }, {
                field: "XPERSONA_JURIDICA",
                width: 90,
                title: "ID_PERSONA_JURIDICA",
                hidden: true
            }, {
                field: "RAZON_SOCIAL",
                title: "RAZON SOCIAL",
                width: 150
            }, {
                field: "MATRICULA",
                title: "MATRICULA",
                width: 150
            }, {
                field: "DESCRIPCION_COMPAÑIA",
                title: "COMPAÑIA SEGURO",
                width: 150
            }, {
                field: "TIPO_VENCIMIENTO_POLIZA",
                title: "VENCIMIENTO POLIZA",
                width: 130
            }, {
                field: "XFECHA_FIN_VIGENICIA",
                title: "FIN VIGENCIA",
                width: 130
            }]
    }).data("kendoGrid");

    //bind click event to the checkbox
    grid.table.on("click", ".checkbox", selectRow);
}


function gridConsultaSeguros(dataSeguro) {
    
    $("#gridConsultaSeguros").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: dataSeguro,
            pageSize: 5
        },
        selectable: "multiple",
        sortable: true,
        pageable: true,
        columns: [
            {
                //title: "<input id='checkAll', type='checkbox', class='check-box' />",
                title: "MARCAR",
                width: 80,
                template: "<input type='checkbox' class='checkbox' />"
                //template: "# if(XSITUACIONBANDEJA == 1 ) {# <input type='checkbox' class='checkbox' /> #} else if(XSITUACIONBANDEJA == 3) {# <input type='checkbox' class='checkbox' /> #} else {# <div>&nbsp;</div> #} #"
                //template: "# if(XSITUACIONBANDEJA == 1 ) {# <input type='checkbox' class='checkbox' /> #} else {# <div>&nbsp;</div> #} #"
            }, {
                field: "XSEGUROS",
                width: 90,
                title: "ID_SEGUROS",
                hidden: true
            }, {
                field: "XAERONAVE_PA",
                width: 90,
                title: "ID_AERONAVE_PA",
                hidden: true
            }, {
                field: "XCONTREGISTRO",
                width: 90,
                title: "ID_CONTREGISTRO",
                hidden: true
            }, {
                field: "XPERSONA_JURIDICA",
                width: 90,
                title: "ID_PERSONA_JURIDICA",
                hidden: true
            },{
                field: "RAZON_SOCIAL",
                title: "RAZON SOCIAL",
                width: 150
            }, {
                field: "MATRICULA",
                title: "MATRICULA",
                width: 150
            }, {
                field: "DESCRIPCION_COMPAÑIA",
                title: "COMPAÑIA SEGURO",
                width: 150
            }, {
                field: "TIPO_VENCIMIENTO_POLIZA",
                title: "VENCIMIENTO POLIZA",
                width: 130
            }]
    });
}


function gridCobertura(data) {

    $("#gridCobertura").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: data,
            pageSize: 5
        },
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "XCOBERTURA_SEGURO",
                width: 90,
                title: "ID_COBERTURA_SEGURO",
                hidden: true
            }, {
                field: "XSEGUROS",
                width: 90,
                title: "ID_SEGUROS",
                hidden: true
            },{
                field: "XTIPO_COBERTURA",
                width: 150,
                title: "ID_TIPO_COBERTURA",
                hidden: true
            }, {
                field: "TIPO_COBERTURA",
                width: 150,
                title: "TIPO COBERTURA",
                width: 150
            }, {
                field: "MONTO",
                width: 50,
                title: "MONTO",
                width: 50
            }]
    });
}






function validarSeguro() {
    var objData = [];
    var flg = true;

    var FechaInicial = isDate($("#FECHA_INICIO_VIGENCIA").val());
    var FechaFin = isDate($("#FECHA_FIN_VIGENICIA").val());


    if ($("#XCOMPANIA_SEGUROS").val().trim() == "") {
        flg = false;
        objData.push({ "XCOMPANIA_SEGUROS": [{ ErrorMessage: "Debe seleccionar la compañia de seguros" }] })
    }
    if ($("#LIMITE_GEOGRAFICO").val().trim() == "") {
        flg = false;
        objData.push({ "LIMITE_GEOGRAFICO": [{ ErrorMessage: "Debe seleccionar el Límite Geográfico" }] })
    }
    if ($("#XTIPO_VENCIMIENTO_POLIZA").val().trim() == "") {
        flg = false;
        objData.push({ "XTIPO_VENCIMIENTO_POLIZA": [{ ErrorMessage: "Debe Ingresar el tipo de póliza" }] })
    }
    if (FechaInicial == false) {
        flg = false;
        objData.push({ "FECHA_INICIO_VIGENCIA": [{ ErrorMessage: "Debe ingresar una Fecha de inicio Valida" }] })
    }
    if (FechaFin == false) {
        flg = false;
        objData.push({ "FECHA_FIN_VIGENICIA": [{ ErrorMessage: "Debe ingresar una Fecha de fin Valida" }] })
    }
    if (validate_fechaMayorQue($("#FECHA_INICIO_VIGENCIA").val(), $("#FECHA_FIN_VIGENICIA").val()) == 0) {
        flag = false;
        objData.push({ "FECHA_INICIAL": [{ ErrorMessage: "La Fecha Inicial debe ser menor que la Fecha de Fin" }] })
    }
    if (flg) {
        $("#divErrorSeguros").hide();
    }
    else {
        $("#divErrorSeguros").html('<strong>No se puede grabar</strong><ul id="ulListaErrorSeguros"></ul>');
        errorAddJS("divErrorSeguros", "ulListaErrorSeguros", objData)
    }
    return flg;
}

function validaCobertura() {
    var objData = [];
    var flg = true;

    var gridCobertura = $("#gridCobertura").data("kendoGrid").dataSource.data();

    
        $.each(gridCobertura, function (index, item) {
        if (item.XTIPO_COBERTURA == $("#XTIPO_COBERTURA option:selected").val()) {
            flg = false;
            //bootbox.alert("Debe seleccionar otro tipo de cobertura");
            objData.push({ "TIPO_COBERTURA": [{ ErrorMessage: "La cobertura que desea agregar ya esta registrada" }] })
        }
    });
    

    if ($("#XTIPO_COBERTURA").val().trim() == "") {
        flg = false;
        objData.push({ "XTIPO_COBERTURA": [{ ErrorMessage: "Debe seleccionar un Tipo Cobertura" }] })
    }

    if (flg) {
        $("#divErrorCertificacion").hide();
    }
    else {
        $("#divErrorCobertura").html('<strong>No se puede grabar</strong><ul id="ulListaErrorCobertura"></ul>');
        errorAddJS("divErrorCobertura", "ulListaErrorCobertura", objData)
    }

    return flg;
}

function GuardarCobertura() {

    
    if (validaCobertura()) {

    $("#gridCobertura")
                       .data("kendoGrid")
                       .dataSource
                       .insert({
                           XCOBERTURA_SEGURO: $("#XCOBERTURA_SEGURO").val(),
                           XSEGUROS: $("#XSEGUROS").val(),
                           XTIPO_COBERTURA: $("#XTIPO_COBERTURA option:selected").val(),
                           TIPO_COBERTURA: $("#XTIPO_COBERTURA option:selected").text(),
                           MONTO: $("#txtMontocobertura").val()
                       });
    $("#contenedorModalCobertura").modal('hide');
    }
}
