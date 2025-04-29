$(document).ready(function () {
    

    $("#FEC_DOCUMENTO").kendoDatePicker();
    $("#FEC_EXTENSION").kendoDatePicker();
     
   

    $("#XID_TIPO_DOCU_DISCREPANCIA").toggleDisable();
    //Levantamiento();
    var XTIPDOCUDISCREPANCIA = $("#XTIPDOCUDISCREPANCIA").val();

   
    $("#XID_TIPO_DOCUMENTO_DS").kendoComboBox({
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

  
    $("#XID_TIPO_DOCU_DISCREPANCIA").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {

            
            //alert(this.value());
            var cmb = this;
            
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }

            
        },
    });

    cargarDocumentoDiscrepancia();

    if (XTIPDOCUDISCREPANCIA == $("#XID_TIPO_DOCU_DISCREPANCIA  option:selected").val())
    {
        Levantamiento();
    }
    else{
        Extension();
    }

    

});

function Levantamiento()
{
    $("#divTipoDoc").show();
    $("#divNro").show();
    $("#divDescrip").hide();
    $("#divFechaDoc").show();
    $("#divFechaExten").hide();

    $("#lblTipoDoc").addClass("asterisco");
    $("#lblFechaDoc").addClass("asterisco");
    
    $("#NRO_DOC").val("");
    $("#DESCRIPCION").val("");
    $("#FEC_DOCUMENTO").data("kendoDatePicker").value("");
    $("#FEC_EXTENSION").data("kendoDatePicker").value("");

    $("#btnModifyDocumentoDiscrepancia").hide();

}
function Extension() {
    $("#divTipoDoc").hide();
    $("#divNro").show();
    $("#divDescrip").show();
    $("#divFechaDoc").show();
    $("#divFechaExten").show();

    $("#lblNro").addClass("asterisco");
    $("#lblFechaExtension").addClass("asterisco");
    $("#lblFechaDoc").addClass("asterisco");

    $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value("");
    $("#NRO_DOC").val("");
    $("#DESCRIPCION").val("");
    $("#FEC_DOCUMENTO").data("kendoDatePicker").value("");
    $("#FEC_EXTENSION").data("kendoDatePicker").value("");

    $("#btnModifyDocumentoDiscrepancia").show();
}

function cargarDocumentoDiscrepancia() {

    $("#gridDocumentoDiscrepancia").html('');

    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/DocumentoDiscrepancia/ListarDocumentoDiscrepancia",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objInspeccion: $("#XINSPECCION").val().trim(), objTipoDocuDiscrep: $('#XOPCIONES').val().trim(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_GENM_DOCUMENTO_DISCREPANCIA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_DOCUMENTO_DISCREPANCIA: { type: "string" },
                    XID_DISCREPANCIA: { type: "string" },
                    XID_INSPECCION: { type: "string" },
                    XID_OFICIO_REFERENCIA: { type: "string" },
                    XORDEN: { type: "string" },
                    DES_TIP_DOCU_DS: { type: "string" },                    
                    XFEC_DOCUMENTO: { type: "string" },
                    DES_TIP_DOC_DISCREP: { type: "string" },
                    NRO_DOC: { type: "string" },
                    XFEC_EXTENSION: { type: "string" }

                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    
    var grid = $("#gridDocumentoDiscrepancia").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        change: onChange,
        columns: [
            {
                field: "XID_DOCUMENTO_DISCREPANCIA",
                title: "ID_DOCUMENTO_DISCREPANCIA",
                width: 150,
                hidden: true
            }, {
                field: "XID_DISCREPANCIA",
                title: "ID_DISCREPANCIA",
                width: 150,
                hidden: true
            }, {
                field: "XID_INSPECCION",
                title: "ID_INSPECCION",
                width: 150,
                hidden: true
            }, {
                field: "XID_OFICIO_REFERENCIA",
                title: "ID_OFICIO_REFERENCIA",
                width: 150,
                hidden: true
            }, {
                field: "XORDEN",
                title: "Nº DISCREPANCIA",
                width: 150
            }, {
                field: "DES_TIP_DOCU_DS",
                title: "TIPO DOCUMENTO",
                flex: 1
            }, {
                field: "XFEC_DOCUMENTO",
                title: "FECHA DOCUMENTO",
                width: 180
            }, {
                field: "DES_TIP_DOC_DISCREP",
                title: "DOCUMENTO",
                hidden: true,
                width: 200
            }, {
                field: "XNRO_DOC",
                title: "NÚMERO DOCUMENTO",
                width: 180
            }, {
                field: "XFEC_EXTENSION",
                title: "FECHA EXTENSIÓN",
                width: 180
            }]
    }).data("kendoGrid");

}


function validDatosDocumentoDiscrepancia() {
    var TIPDOCDISCREPANCIA = $("#XTIPDOCUDISCREPANCIA").val();
    //alert(TIPDOCDISCREPANCIA);
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;
    
   
    if ($("#XID_TIPO_DOCU_DISCREPANCIA").data("kendoComboBox").value() == TIPDOCDISCREPANCIA) {

        if ($("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value() == null || $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XID_TIPO_DOCUMENTO_DS_listbox"]').parents("span").addClass("valError");
            objData.push({ "XID_TIPO_DOCUMENTO_DS": [{ ErrorMessage: "Debe seleccionar el tipo documento" }] })
        }
        if ($("#FEC_DOCUMENTO").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FEC_DOCUMENTO").parents("span").addClass("valError");
            objData.push({ "FEC_DOCUMENTO": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha del documento" }] })
        }
        if (flg) {
            $("#divErrorDocumentoDiscrepancia").hide();
        }
        else {
            $("#divErrorDocumentoDiscrepancia").html('<strong>No se puede grabar</strong><ul id="ulListaDocumentoDiscrepancia"></ul>');
            errorAddJS("divErrorDocumentoDiscrepancia", "ulListaDocumentoDiscrepancia", objData)
        }

    } else {
        if ($("#NRO_DOC").val().trim() == "") {
            flg = false;
            objData.push({ "NRO_DOC": [{ ErrorMessage: "Debe ingresar el número" }] })
        }
        if ($("#FEC_DOCUMENTO").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FEC_DOCUMENTO").parents("span").addClass("valError");
            objData.push({ "FEC_DOCUMENTO": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha del documento" }] })
        }
        if ($("#FEC_EXTENSION").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FEC_EXTENSION").parents("span").addClass("valError");
            objData.push({ "FEC_EXTENSION": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de extensión" }] })
        }
        if (flg) {
            $("#divErrorDocumentoDiscrepancia").hide();
        }
        else {
            $("#divErrorDocumentoDiscrepancia").html('<strong>No se puede grabar</strong><ul id="ulListaDocumentoDiscrepancia"></ul>');
            errorAddJS("divErrorDocumentoDiscrepancia", "ulListaDocumentoDiscrepancia", objData)
        }
    }
    
   
    

  
    return flg;
}

$("#btnRegistroDocumentoDiscrepancia").click(function () {
    if (validDatosDocumentoDiscrepancia()) {

        var LisAntDiscrepancia = [];
        $.each(checkedIds, function (index, item) {

            var o_T_Genm_DocumentoDiscrepancia = {                
                XID_DISCREPANCIA: item.XDISCREPANCIA
            }

            LisAntDiscrepancia.push(o_T_Genm_DocumentoDiscrepancia);
        });
        console.log(LisAntDiscrepancia);

        var T_GENM_DOCUMENTO_DISCREPANCIA = {
            ID_DOCUMENTO_DISCREPANCIA: 0,
            NRO_DOC: $("#NRO_DOC").val().trim(),
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            FEC_DOCUMENTO: $("#FEC_DOCUMENTO").val(),
            XFEC_EXTENSION: $("#FEC_EXTENSION").val(),
            FLG_ESTADO: null,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_DOCUMENTO_DISCREPANCIA: $("#XID_DOCUMENTO_DISCREPANCIA").val().trim(),
            XID_TIPO_DOCU_DISCREPANCIA: $("#XID_TIPO_DOCU_DISCREPANCIA").data("kendoComboBox").value(),
            XID_TIPO_DOCUMENTO_DS: $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value(),
            XID_OFICIO_REFERENCIA: $("#XID_OFICIO_REFERENCIA").val().trim(),
            XID_INSPECCION: $("#XINSPECCION").val().trim(),
            XID_ACTIVIDAD_DS: $("#XID_ACTIVIDAD_DS").val().trim(),
            XID_TIPO_ACTIVIDAD_DS: $("#XID_TIPO_ACTIVIDAD_DS").val().trim(),
            XID_PERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").val().trim(),
            XINSPECCION_BASE: $("#XINSPECCION_BASE").val().trim()
        }

        console.log(T_GENM_DOCUMENTO_DISCREPANCIA);
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/DocumentoDiscrepancia/SaveDocumentoDiscrepancia',
            type: 'POST',
            data: JSON.stringify({ objDocumentoDiscrepancia: LisAntDiscrepancia, objTGenmDocumentoDiscrepancia: T_GENM_DOCUMENTO_DISCREPANCIA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorDocumentoDiscrepancia", "ulListaDocumentoDiscrepancia", data.errores);
                } else {

                    // $("#contenedor2").modal('hide');
                    
                    $("#btnVerDocumentos").show();
                    ConsultaDiscrepancia();
                    cargarDocumentoDiscrepancia();
                    AgregarDocumento();
                    
                    if ($("#XCOORDINACIONTECNICA").val() == 61)
                    {
                        cargarGridInspeccionBase();
                    }
                        
                    
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

function AgregarDocumento()
{
    $("#FEC_DOCUMENTO").data("kendoDatePicker").value("");
    $("#FEC_DOCUMENTO").val('');

    $("#FEC_EXTENSION").data("kendoDatePicker").value("");
    $("#FEC_EXTENSION").val('');

    $("#NRO_DOC").val('');
    $("#DESCRIPCION").val('');

    $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value("");
    $("#btnRegistroDocumentoDiscrepancia").prop('disabled', true);
    //$("#btnRegistroDocumentoDiscrepancia").hide();
}

function onChange(arg) {
    var entityGrid = $("#gridDocumentoDiscrepancia").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());
    
    if ($("#XTIPDOCUDISCREPANCIA").val() != $("#XID_TIPO_DOCU_DISCREPANCIA").data("kendoComboBox").value()) {
        DataDocumentoDiscrepancia(selectedItem.XID_DOCUMENTO_DISCREPANCIA);
    }
}

function DataDocumentoDiscrepancia(obj) {
    $.ajax({
        datatype: 'json',
        url: '/DocumentoDiscrepancia/CargarDocumentoDiscrepancia',
        contentType: "application/json",
        type: 'POST',
        data: JSON.stringify({ ObjIdDocumentoDiscrepancia: obj }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            var l_CargarDocumentoDiscrepancia = data.l_CargarDocumentoDiscrepancia
            console.log(l_CargarDocumentoDiscrepancia[0]);
            $("#NRO_DOC").val(l_CargarDocumentoDiscrepancia[0].XNRO_DOC);
            $("#DESCRIPCION").val(l_CargarDocumentoDiscrepancia[0].DESCRIPCION);
            $("#FEC_EXTENSION").data("kendoDatePicker").value(l_CargarDocumentoDiscrepancia[0].FEC_EXTENSION);
            $("#FEC_DOCUMENTO").data("kendoDatePicker").value(l_CargarDocumentoDiscrepancia[0].FEC_DOCUMENTO);
            
            $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value(l_CargarDocumentoDiscrepancia[0].XID_DOCUMENTO_DISCREPANCIA);
            $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").text(l_CargarDocumentoDiscrepancia[0].DES_TIP_DOCU_DS);
            
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;        
        desbloqObject();
    });
}

$("#btnModifyDocumentoDiscrepancia").click(function () {


    var dataDocumentoDiscrepancia = $("#gridDocumentoDiscrepancia").data("kendoGrid");
    var itemDataDocumentoDiscrepancia = dataDocumentoDiscrepancia.dataItem(dataDocumentoDiscrepancia.select());
    if (itemDataDocumentoDiscrepancia != undefined) {
        
        if (validDatosDocumentoDiscrepancia()) {

            var T_GENM_DOCUMENTO_DISCREPANCIA = {
                ID_DOCUMENTO_DISCREPANCIA: 0,
                NRO_DOC: $("#NRO_DOC").val().trim(),
                DESCRIPCION: $("#DESCRIPCION").val().trim(),
                FEC_DOCUMENTO: $("#FEC_DOCUMENTO").val(),
                XFEC_EXTENSION: $("#FEC_EXTENSION").val(),
                FLG_ESTADO: null,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_DOCUMENTO_DISCREPANCIA: itemDataDocumentoDiscrepancia.XID_DOCUMENTO_DISCREPANCIA,
                XID_TIPO_DOCU_DISCREPANCIA: $("#XID_TIPO_DOCU_DISCREPANCIA").data("kendoComboBox").value(),
                XID_TIPO_DOCUMENTO_DS: $("#XID_TIPO_DOCUMENTO_DS").data("kendoComboBox").value(),
                XID_OFICIO_REFERENCIA: $("#XID_OFICIO_REFERENCIA").val().trim(),
                XID_INSPECCION: $("#XINSPECCION").val().trim(),
                XID_ACTIVIDAD_DS: $("#XID_ACTIVIDAD_DS").val().trim(),
                XID_TIPO_ACTIVIDAD_DS: $("#XID_TIPO_ACTIVIDAD_DS").val().trim(),
                XID_PERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").val().trim()
            }

            console.log(T_GENM_DOCUMENTO_DISCREPANCIA);
            
            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/DocumentoDiscrepancia/SaveDocumentoDiscrepancia',
                type: 'POST',
                data: JSON.stringify({ objTGenmDocumentoDiscrepancia: T_GENM_DOCUMENTO_DISCREPANCIA }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    console.log(data);
                    if (!data.rpta) {
                        errorAddModelo("divErrorDocumentoDiscrepancia", "ulListaDocumentoDiscrepancia", data.errores);
                    } else {

                        $("#btnVerDocumentos").show();
                        ConsultaDiscrepancia();
                        cargarDocumentoDiscrepancia();
                        AgregarDocumento();
                    }

                    desbloqObject();

                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
                desbloqObject();
            });
            
        }



    }
    else {
        bootbox.alert("Seleccione un registro de la tabla");
    }


});