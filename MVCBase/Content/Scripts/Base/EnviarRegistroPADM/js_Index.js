$(document).ready(function () {

    $("#txtRazonSocial").kendoComboBox({
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

    $("#chbPendiente").click(function () {

        if ($('#chbPendiente').is(':checked') && $('#chbEnviados').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('6');
        } else if ($('#chbPendiente').is(':checked') && $('#chbEnviados').is(':checked')) {
            $('#hdnFlag').val('3');
        } else if ($('#chbPendiente').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('4');
        } else if ($('#chbEnviados').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('5');
        } else if ($('#chbPendiente').is(':checked')) {
            $('#hdnFlag').val('0');
        } else if ($('#chbEnviados').is(':checked')) {
            $('#hdnFlag').val('1');
        } else if ($('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('2');
        } else {
            $('#hdnFlag').val('7');
        }

    });

    $("#chbEnviados").click(function () {

        if ($('#chbPendiente').is(':checked') && $('#chbEnviados').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('6');
        } else if ($('#chbPendiente').is(':checked') && $('#chbEnviados').is(':checked')) {
            $('#hdnFlag').val('3');
        } else if ($('#chbEnviados').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('5');
        } else if ($('#chbDevueltos').is(':checked') && $('#chbPendiente').is(':checked')) {
            $('#hdnFlag').val('4');
        } else if ($('#chbEnviados').is(':checked')) {
            $('#hdnFlag').val('1');
        } else if ($('#chbPendiente').is(':checked')) {
            $('#hdnFlag').val('0');
        } else if ($('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('2');
        } else {
            $('#hdnFlag').val('7');
        }

    });

    $("#chbDevueltos").click(function () {

        if ($('#chbPendiente').is(':checked') && $('#chbEnviados').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('6');
        } else if ($('#chbPendiente').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('4');
        } else if ($('#chbEnviados').is(':checked') && $('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('5');
        } else if ($('#chbEnviados').is(':checked') && $('#chbPendiente').is(':checked')) {
            $('#hdnFlag').val('3');
        } else if ($('#chbDevueltos').is(':checked')) {
            $('#hdnFlag').val('2');
        } else if ($('#chbPendiente').is(':checked')) {
            $('#hdnFlag').val('0');
        } else if ($('#chbEnviados').is(':checked')) {
            $('#hdnFlag').val('1');
        } else {
            $('#hdnFlag').val('7');
        }

    });

    cargarGridRegisroPA();

    $("#btnbuscaregistro").click(function () {

        var hdnFlag = $('#hdnFlag').val();
        if ($("#txtRazonSocial").data("kendoComboBox").value() == "") {
            bootbox.alert("Seleccione la razón social");
        }
        else
        {
            if (hdnFlag == '7') {
                bootbox.alert("Seleccione al menos una opción de busqueda!!!");
            } else {

                checkedIds = {};
                $(".k-state-selected input[type=checkbox]").each(function () {
                    if (typeof this.checked != "undefined") {
                        if (this.checked) {
                            this.checked = false;
                        }
                    }
                });

                $(".k-state-selected").removeClass("k-state-selected");

                cargarGridRegisroPA();
            }
        }

        

        


    });

    $("#btnEnviosMasivos").bind("click", function () {

        var grid = $("#gridRegistroPA").data("kendoGrid");
        var selectedRows = $(".k-state-selected", "#gridRegistroPA");

        var selectedItem = grid.dataItem(selectedRows[0]);
        if (selectedItem != undefined) {
            bootbox.confirm("¿Desea remitir la información consignada a la DGAC para su verificación ?", function (res) {
                if (res) {
                    var ListBandeja = [];
                    $.each(checkedIds, function (index, item) {

                        var T_GEND_AERONAVE_PA_BANDEJA = {
                            ID_AERONAVE_PA_BANDEJA: 0,
                            ID_AERONAVE_PA: 0,
                            ID_BANDEJA: 0,
                            ID_SITUACION_BANDEJA: 0,
                            ID_USUARIO_ENVIO: null,
                            ID_USUARIO_ORIGEN: null,
                            PASOS: 0,
                            FLG_RECEPCIONADO: null,
                            FEC_RECEPCIONADO: null,
                            FLG_ESTADO: null,
                            ID_USUARIO_REG: null,
                            FEC_REG: null,
                            ID_USUARIO_ACT: null,
                            FEC_ACT: null,
                            XID_AERONAVE_PA_BANDEJA: item.IDAEROPABAN,
                            XID_AERONAVE_PA: item.IDAERONAVEPA,
                            XID_BANDEJA: item.IDBANDEJA,
                            XID_SITUACION_BANDEJA: 0,
                            XID_USUARIO_ENVIO: 0,
                            XID_USUARIO_ORIGEN: 0
                        }

                        ListBandeja.push(T_GEND_AERONAVE_PA_BANDEJA);
                    });
                    console.log(ListBandeja);

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/EnviarRegistroPADM/SaveRegistroPA',
                        type: 'POST',
                        data: JSON.stringify({ objBandeja: ListBandeja }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divError", "ulListaError", data.errores);
                            } else {
                                window.location = "/EnviarRegistroPADM/Index";
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
        }
        else {
            //alert("Seleccione al menos un registro!!!");
            bootbox.alert("Seleccione un registro de la tabla");
        }

    });


});

var checkedIds = {};

//on click of the checkbox:
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#gridRegistroPA").data("kendoGrid"),
    dataItem = grid.dataItem(row);


    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
        checkedIds[dataItem.id] = { "IDAEROPABAN": dataItem.XAERONAVE_PA_BANDEJA, "IDBANDEJA": dataItem.XBANDEJA, "IDAERONAVEPA": dataItem.XAERONAVE_PA };

    } else {
        //-remove selection
        delete checkedIds[dataItem.id];
        row.removeClass("k-state-selected");
    }
}

function cargarGridRegisroPA() {
    $("#gridRegistroPA").html('');

    $.ajax({
        datatype: 'json',
        url: '/EnviarRegistroPADM/ListaRegistroPA',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ objrdbEnvio: $('#hdnFlag').val(), objRazonSocial: $('#txtRazonSocial').val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (JsonResponse) {
            //console.log(JsonResponse);

            var dataSource = new kendo.data.DataSource({
                batch: true,
                //pageSize: 20,
                data: JsonResponse.l_GENM_REGISTROPA,
                schema: {
                    model: {
                        id: "XAERONAVE_PA_BANDEJA",
                        fields: {
                            XAERONAVE_PA_BANDEJA: { editable: false, nullable: true }
                        }
                    }
                }
            });


            var grid = $("#gridRegistroPA").kendoGrid({

                //autoBind: false,
                dataSource: dataSource,
                scrollable: true,
                height: 400,
                columns: [
                    {
                        //title: "<input id='checkAll', type='checkbox', class='check-box' />",
                        title: "MARCAR",
                        width: 80,
                        //template: "<input type='checkbox' class='checkbox' />"                            
                        template: "# if(XSITUACIONBANDEJA == 1 ) {# <input type='checkbox' id='chbTodos1' class='checkbox' /> #} else {# <div>&nbsp;</div> #} #",
                        field: "XMARCAR"

                    }, {
                        field: "",
                        width: 150,
                        title: "ESTADO",
                        template: "# if (XSITUACIONBANDEJA == 1) {# <div style='background-color:dodgerblue'>&nbsp;</div> # } else if (XSITUACIONBANDEJA == 2) {# <div style='background-color:lightseagreen'>&nbsp;</div> # } else {# <div style='background-color:crimson'>&nbsp;</div> #} #"
                        //template: "# if (FLG_ESTADO == 0) {# <img src='../Content/images/rectangle_green.png' /> #} else {# <img src='../Content/images/rectangle_blue.png' /> #}  #"

                    },
                    {
                        field: "XAERONAVE_PA_BANDEJA",
                        width: 90,
                        title: "ID_AEROPABAN",
                        hidden: true
                    }, {
                        field: "XBANDEJA",
                        width: 90,
                        title: "ID_BANDEJA",
                        hidden: true
                    }, {
                        field: "XAERONAVE_PA",
                        width: 90,
                        title: "ID_AERONAVE_PA",
                        hidden: true
                    }, {
                        field: "DESCRIPCION",
                        title: "DESCRIPCIÓN",
                        flex: 1,
                        hidden: true
                    }, {
                        field: "XRAZONSOCIAL",
                        title: "RAZÓN SOCIAL",
                        flex: 1
                    }, {
                        field: "MATRICULA",
                        title: "MATRÍCULA",
                        flex: 1
                    }, {
                        field: "NUMERO_SERIE",
                        title: "SERIE",
                        flex: 1
                    }, {
                        field: "XCATEGORIAAERONAVE",
                        title: "CATEGORÍA AERONAVE",
                        flex: 1
                    }, {
                        field: "XSITUACIONBANDEJA",
                        width: 90,
                        title: "ESTADOBANDEJA",
                        hidden: true
                    }]
            }).data("kendoGrid");

            //bind click event to the checkbox
            grid.table.on("click", ".checkbox", selectRow);


            desbloqObject();


        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });

}