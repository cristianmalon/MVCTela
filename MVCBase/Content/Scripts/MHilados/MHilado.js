
function enableTransactHE() {
    console.log('enableTransactHE')
    $('.transactHE').each(function (i, e) {
        $(e).removeAttr('disabled')
    })
    $('select.selectpicker.transactHE').each(function (i, e) {
        // Actualizar el elemento select
        e.selectedIndex = e.selectedIndex; // Esto fuerza la actualización visual
    });
   /* $('#chkEstadoEspecifico').bootstrapToggle({
        on: 'Activo',
        off: 'Inactivo'
    }).bootstrapToggle('enable');*/
}
function disableTransactHE() {
    //$('.transact').prop('disable', false)
    console.log('disabled')
    $('.transactHE').each(function (i, e) {
        $(e).attr('disabled', 'disabled')
    })
    $('select.transactHE').each(function (i, e) {
        // Actualizar el elemento select
        e.selectedIndex = e.selectedIndex; // Esto fuerza la actualización visual
    });    //debugger
   /* $('#chkEstadoEspecifico').bootstrapToggle({
        on: 'Activo',
        off: 'Inactivo'
    }).bootstrapToggle('disable');*/
}

function handleBtnNuevoClick() {
    sessionStorage.setItem('optionHM', 'new');
    $.get("/MHilado/HiladoMadrePartial", function (data) {
        BootstrapDialog.show({
            closeByBackdrop: false,
            title: 'Registrar Hilado Madre',
            size: BootstrapDialog.SIZE_LARGE,
            message: $(data)
        });
    });

    // Ejecutar acciones después de un cierto tiempo de retardo
    setTimeout(() => {
        $.blockUI({
            message: '<img src="/Content/Images/loading.gif">',
            css: { border: 'none', background: 'transparent', zIndex: 2000 },
            overlayCSS: { backgroundColor: '#000', opacity: 0.6, zIndex: 2000 }
        });

        loadCombosIni(); // Aquí podrías esperar con una promesa si fuera necesario

        setTimeout(() => {
            $.unblockUI(); // Desbloquear después de un tiempo prudente
        }, 2000);
        $(".panelHEspecificos").hide();
    }, 500); // Tiempo de retardo en milisegundos (en este caso, 500 ms)
}

/*//FORMATO DXPOPUP
 function handleBtnNuevoClick() {
    sessionStorage.setItem('optionHM', 'new');

    $.get("/MHilado/HiladoMadrePartial", function (data) {
        // Crear el popup si no existe
        if (!$("#popupNuevo").data("dxPopup")) {
            $("#popupNuevo").dxPopup({
                title: "Registrar Hilado Madre",
                width: 1400,
                height: 800,
                showTitle: true,
                dragEnabled: true,
                closeOnOutsideClick: true,
                resizeEnabled: true, // 🔹 Permite redimensionar con el puntero
                contentTemplate: function () {
                    return $("<div>").append(data);
                },
                onShown: function () {
                    console.log("ACA LLEGA");
                    loadCombosIni();
                    $(".panelHEspecificos").hide();
                }
            });
        } else {
            $("#popupNuevo").dxPopup("option", "contentTemplate", function () {
                return $("<div>").append(data);
            });
        }

        // Mostrar el popup
        $("#popupNuevo").dxPopup("show");
    });
}
 */


function handleBtnEditarClick(parametro) {
    

    console.log("parametro123editar",parametro);
    sessionStorage.setItem('optionHM', 'edit')

             
        $.get("/MHilado/HiladoMadrePartial", function (data) {
            BootstrapDialog.show({
                closeByBackdrop: false,
                title: 'Editar Hilado Madre',
                size: BootstrapDialog.SIZE_LARGE,
                message: $(data)
            });
        });

    sleep(500).then(() => {
            loadCombosIni();
            $(txtCodigoHilo).val(parametro.Codigo)
            console.log("EL VALOR DE PARAMETRO CODIGO ES", parametro.Codigo);
        $.blockUI({ message: '<img src="/Content/Images/loading.gif">', css: { border: 'none', background: 'transparent' } });
            loadByCodigo();
    });

}

function handleBtnVerClick(parametro) {
    console.log("parametro", parametro);
    sessionStorage.setItem('optionHM', 'ver')


    $.get("/MHilado/HiladoMadrePartial", function (data) {
        BootstrapDialog.show({
            closeByBackdrop: false,
            title: 'Ver Hilado Madre',
            size: BootstrapDialog.SIZE_LARGE,
            message: $(data)
        });
    });

    sleep(500).then(() => {
        loadCombosIni();
        $(txtCodigoHilo).val(parametro.Codigo)
        console.log("EL VALOR DE PARAMETRO CODIGO ES", parametro.Codigo);
        $.blockUI({
            message: '<img src="/Content/Images/loading.gif">',
            css: { border: 'none', background: 'transparent', zIndex: 2000 },
            overlayCSS: {
                backgroundColor: '#000',  // Color de fondo para el overlay
                opacity: 0.6,             // Opacidad del fondo
                zIndex: 2000              // Asegúrate de que el z-index del overlay sea mayor que el del BootstrapDialog
            }

        });
        loadByCodigo();
    });

}

function handleBtnCopyClick(parametro) {
    console.log("parametro", parametro);
    sessionStorage.setItem('optionHM', 'new')


    $.get("/MHilado/HiladoMadrePartial", function (data) {
        BootstrapDialog.show({
            closeByBackdrop: false,
            title: 'Copiar Hilado Madre',
            size: BootstrapDialog.SIZE_LARGE,
            message: $(data)
        });
    });

    sleep(500).then(() => {
        loadCombosIni();
        $(txtCodigoHilo).val(parametro.Codigo)
        console.log("EL VALOR DE PARAMETRO CODIGO ES", parametro.Codigo);
        $.blockUI({
            message: '<img src="/Content/Images/loading.gif">',
            css: { border: 'none', background: 'transparent', zIndex: 2000 },
            overlayCSS: {
                backgroundColor: '#000',  // Color de fondo para el overlay
                opacity: 0.6,             // Opacidad del fondo
                zIndex: 2000              // Asegúrate de que el z-index del overlay sea mayor que el del BootstrapDialog
            }

        });

        loadByCodigo();

        sleep(3500).then(() => {

            $(txtCodigoHilo).val(0)
            $("div.panelHEspecificos").hide()
            console.log('eeeeeeeeeee')
            enableTransact()
        })
    });

}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * /COPIA
 */
function handleBtnEditarClick(parametro) {
    console.log("parametro", parametro);
    sessionStorage.setItem('optionHM', 'edit')


    $.get("/MHilado/HiladoMadrePartial", function (data) {
        BootstrapDialog.show({
            closeByBackdrop: false,
            title: 'Editar Hilado Madre',
            size: BootstrapDialog.SIZE_LARGE,
            message: $(data)
        });
    });
    sleep(500).then(() => {
        loadCombosIni();
        $(txtCodigoHilo).val(parametro.Codigo)
        console.log("EL VALOR DE PARAMETRO CODIGO ES", parametro.Codigo);
        $.blockUI({
            message: '<img src="/Content/Images/loading.gif">',
            css: { border: 'none', background: 'transparent', zIndex: 2000 },
            overlayCSS: {
                backgroundColor: '#000',  // Color de fondo para el overlay
                opacity: 0.6,             // Opacidad del fondo
                zIndex: 2000              // Asegúrate de que el z-index del overlay sea mayor que el del BootstrapDialog
            }
        });
        loadByCodigo();
    });
    

}

//INDEX PAGINAL INICIAL DE HILO MADRE
function openModalAddHEspecificoInBandeja(parametro) {
    console.log("parametro", parametro);
    

    $.get("/MHilado/ModalHiladoEspecifico", function (data) {
        BootstrapDialog.show({
            closeByBackdrop: false,
            title: 'Hilado Específico',
            size: BootstrapDialog.SIZE_LARGE,
            message: $(data),
            buttons: [
                {
                    label: 'Registrar',
                    id: 'btnDialogokPro',
                    cssClass: 'btn-default transactHE btnSaveHEspecifico',
                    action: function (dialog) {

                        var procesoHilo = $(cmbProcesoHilo).val();
                        var colorHilo = $(lblColorID).text();
                        var sentTorsion = $(cmbSentidoTorsion).val();
                        var descripcionLarga = $(txtDescripcionEspecifico).val();
                        var codigoHiloMadre = $(txtCodigoHiloHMADRE).val();
                        var codigoHiloHijo = $(txtCodigoHiloEspecifico).val();
                        var tipoHiladoMadre = $(cmbTipoHiladoHMADRE).val();
                        var codigoRefProveedor = $(txtCodigoProveedor).val();
                        var descripcionCorta = $(txtDescripcionEspecificoCorta).val();
                        var vvp = $(txtVPPEspecifico).val();

                        if (procesoHilo == null || procesoHilo == undefined || procesoHilo == "" || procesoHilo == "0") {
                            DevExpress.ui.dialog.alert("Seleccione Proceso Hilado", "Mensaje", "OK");
                            return;
                        }
                        if (sentTorsion == null || sentTorsion == undefined || sentTorsion == "" || sentTorsion == "<NINGUNO>" || sentTorsion == "0") {
                            DevExpress.ui.dialog.alert("Seleccione Sentido Torsión", "Mensaje", "OK");
                            return;
                        }
                        if (colorHilo == null || colorHilo == undefined || colorHilo == "" || colorHilo == "0") {
                            colorHilo = "";
                        }

                        const reader = new FileReader();

                        // Si hay archivo, intenta leerlo
                        if (file) {
                            console.log("ENTRO AL FILE LLENO");
                            reader.onload = function (event) {
                                const fileContent = event.target.result; // ArrayBuffer

                                // Convertir ArrayBuffer a Base64
                                const fileContentBase64 = arrayBufferToBase64(fileContent);

                                // Construir el objeto para enviar en el AJAX
                                var XML = '<ROOT></ROOT>';
                                var encodeXML = encodeURIComponent(XML);
                                var o = {
                                    Nombre: descripcionLarga,
                                    DescripcionLarga: descripcionLarga,
                                    CodigoHiloComer: codigoHiloMadre,
                                    ColCCod: colorHilo.substring(0, 6),
                                    SentidoTorsion: sentTorsion,
                                    TTeCCod: colorHilo.substring(6, 7),
                                    CodigoAcadoHilo: procesoHilo,
                                    CodigoRefProveedor: codigoRefProveedor,
                                    TipoHiladoConfigurado: tipoHiladoMadre,
                                    CodigoHiloFabri: codigoHiloHijo,
                                    descripcionCorta: descripcionCorta,
                                    VPP: vvp,
                                    DetalleXml: encodeXML,
                                    File1: fileContentBase64,
                                    File1Name: File1Name,
                                    EstFile1: EstFile1,
                                    ESTADO_DES: $('#chkEstadoEspecifico').prop('checked') ? 'A' : 'I'
                                };

                                // Realizar la llamada AJAX
                                $.ajax({
                                    type: "POST",
                                    url: '/HiloEspecifico/InsertHiladoE',
                                    data: o,
                                    success: function (data) {
                                        var rpt = JSON.parse(data);
                                        if (rpt.status == 1) {
                                            DevExpress.ui.dialog.alert("Hilo Específico generado: " + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");
                                            $("button.btnSaveHEspecifico").closest('div.bootstrap-dialog').modal('hide');
                                        } else {
                                            DevExpress.ui.dialog.alert("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')', "Alerta", "OK");
                                        }
                                        var dataGrid2 = $('#gridContainerHijo').dxDataGrid('instance');
                                        dataGrid2.refresh();
                                    },
                                    dataType: 'text',
                                }).fail(function (jqxhr, textStatus, error) {
                                    console.log("Request Failed: " + error);
                                });
                            };
                            reader.readAsArrayBuffer(file);
                        } else {
                            console.log("ENTRO AL FILE VACIO");
                            // Si no hay archivo, solo enviamos los datos sin el archivo
                            var XML = '<ROOT></ROOT>';
                            var encodeXML = encodeURIComponent(XML);
                            var o = {
                                Nombre: descripcionLarga,
                                DescripcionLarga: descripcionLarga,
                                CodigoHiloComer: codigoHiloMadre,
                                ColCCod: colorHilo.substring(0, 6),
                                SentidoTorsion: sentTorsion,
                                TTeCCod: colorHilo.substring(6, 7),
                                CodigoAcadoHilo: procesoHilo,
                                CodigoRefProveedor: codigoRefProveedor,
                                TipoHiladoConfigurado: tipoHiladoMadre,
                                CodigoHiloFabri: codigoHiloHijo,
                                descripcionCorta: descripcionCorta,
                                VPP: vvp,
                                DetalleXml: encodeXML,
                                File1: null,
                                File1Name: null,
                                EstFile1: 0,
                                ESTADO_DES: $('#chkEstadoEspecifico').prop('checked') ? 'A' : 'I'
                            };

                            $.ajax({
                                type: "POST",
                                url: '/HiloEspecifico/InsertHiladoE',
                                data: o,
                                success: function (data) {
                                    var rpt = JSON.parse(data);
                                    if (rpt.status == 1) {
                                        DevExpress.ui.dialog.alert("Hilo Específico generado: " + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");
                                        $("button.btnSaveHEspecifico").closest('div.bootstrap-dialog').modal('hide');
                                    } else {
                                        DevExpress.ui.dialog.alert("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')', "Alerta", "OK");
                                    }
                                    var dataGrid2 = $('#gridContainerHijo').dxDataGrid('instance');
                                    dataGrid2.refresh();
                                },
                                dataType: 'text',
                            }).fail(function (jqxhr, textStatus, error) {
                                console.log("Request Failed: " + error);
                            });
                        }
                    }
                },
                {
                    label: 'Cerrar',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
        });
    });

    // Función para convertir ArrayBuffer a Base64
    function arrayBufferToBase64(buffer) {
        if (!buffer) {
            return null; // Si no hay contenido en el buffer, retorna null
        }

        let binary = '';
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary); // Convertir a Base64
    }

    sleep(500).then(() => {
        /*$('select').selectpicker();
        $('#chkEstadoEspecifico').bootstrapToggle({
            on: 'Activo',
            off: 'Inactivo'
        }).bootstrapToggle('enable');*/
        //rowSelected = gridoRp.dataItem(selectedItemRp)
        $(txtCodigoHiloEspecifico).val('0')
        console.log(123)
        console.log("PRUEBA CARGAR")
        //debugger;
        $(txtCodigoHiloHMADRE).val(parametro.Codigo.trim());
        loadHMadreByCodigo(parametro.Codigo.trim());
        sleep(500).then(() => {
            console.log('cmbProcesoHilo')
            console.log($(cmbProcesoHilo).text())
            loadHijoByCodigo()
            $.blockUI({
                message: '<img src="/Content/Images/loading.gif">',
                css: { border: 'none', background: 'transparent', zIndex: 2000 },
                overlayCSS: {
                    backgroundColor: '#000',  // Color de fondo para el overlay
                    opacity: 0.6,             // Opacidad del fondo
                    zIndex: 2000              // Asegúrate de que el z-index del overlay sea mayor que el del BootstrapDialog
                }
            });
        })

    });



}

    




//INDEX PAGINAL INICIAL DE HILO HIJJO

function openModalBandejaHEspecifico(parametro, updInt) {
    console.log("parametrosss", parametro);

    $.get("/MHilado/ModalHiladoEspecifico", function (data) {

        BootstrapDialog.show({
            closeByBackdrop: false,
            title: 'Hilado Específico',
            type: BootstrapDialog.TYPE_PRIMARY,
            //closeByBackdrop: false,
            //size: BootstrapDialog.SIZE_LARGE,
            message: $(data),
            buttons: [
                {
                    label: 'Registrar',
                    id: 'btnDialogokPro',
                    cssClass: 'btn-default transactHE btnSaveHEspecifico',
                    action: function (dialog) {
                        var procesoHilo = $(cmbProcesoHilo).val();
                        var colorHilo = $(lblColorID).text();
                        var sentTorsion = $(cmbSentidoTorsion).val();
                        var descripcionLarga = $(txtDescripcionEspecifico).val()
                        var codigoHiloMadre = $(txtCodigoHiloHMADRE).val();
                        var codigoHiloHijo = $(txtCodigoHiloEspecifico).val();
                        var tipoHiladoMadre = $(cmbTipoHiladoHMADRE).val()
                        var codigoRefProveedor = $(txtCodigoProveedor).val();
                        var descripcionCorta = $(txtDescripcionEspecificoCorta).val();
                        var vvp = $(txtVPPEspecifico).val();
                        console.log("procesoHilo", procesoHilo);
                        if ($('#chkEstadoMadre').prop('checked') == false) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: "El Hilo Madre se encuentra inactivo"
                            })
                            return;
                        }

                        if (procesoHilo == null || procesoHilo == undefined || procesoHilo == "" || procesoHilo == "0") {
                            //$("<div></div>").kendoAlert({
                            //    title: "Mensaje",
                            //    content: "Seleccione Proceso Hilado"
                            //}).data("kendoAlert").open();
                            DevExpress.ui.dialog.alert("Seleccione Proceso Hilado", "Mensaje", "OK");

                            return;
                        }

                        if (sentTorsion == null || sentTorsion == undefined || sentTorsion == "" || sentTorsion == "<NINGUNO>" || sentTorsion == "0") {
                            /*$("<div></div>").kendoAlert({
                                title: "Mensaje",
                                content: "Seleccione Proceso Hilado"
                            }).data("kendoAlert").open();*/
                            DevExpress.ui.dialog.alert("Seleccione Sentido Torsión", "Mensaje", "OK");

                            return;
                        }

                        if (colorHilo == null || colorHilo == undefined || colorHilo == "" || colorHilo == "0") {
                            //$("<div></div>").kendoAlert({
                            //    title: "Mensaje",
                            //    content: "Seleccione Color Hilado"
                            //}).data("kendoAlert").open();
                            //return;
                            colorHilo = "";
                        }
                        //if ($("#tblFibrasEspecifico>tbody>tr").length == 0 && $(cmbTipoHiladoHMADRE).val() == "1") {
                        //    AlertMessage("No ha ingresado fibras")
                        //    return;
                        //}




                        const reader = new FileReader();
                        if (file && file !== 0) {
                            console.log("HAY ARCHIVO");
                            reader.onload = function (event) {
                                const fileContent = event.target.result; // ArrayBuffer

                                // Convertir ArrayBuffer a Base64
                                const fileContentBase64 = arrayBufferToBase64(fileContent);

                                var detalle = []
                                var XML = '<ROOT>'
                                $("#tblFibrasEspecifico>tbody>tr").each(function (i, tr) {
                                    XML = XML + '<DETALLE>'
                                    XML = XML + '<CodigoDetalleFabri>' + '0' + '</CodigoDetalleFabri>'
                                    XML = XML + '<CodigoTipoFibra>' + $(tr).find('td.tdTipoFibraHEID').text() + '</CodigoTipoFibra>'
                                    XML = XML + '<Fibra>' + $(tr).find('td.tdFibraHEID').text() + '</Fibra>'
                                    XML = XML + '</DETALLE>'


                                    var item = {
                                        CodigoDetalleFabri: "0",
                                        CodigoTipoFibra: $(tr).find('td.tdTipoFibraHEID').text(),
                                        CodigoFibra: $(tr).find('td.tdFibraHEID').text()
                                    }
                                    detalle.push(item);
                                })
                                XML = XML + '</ROOT>'
                                var encodeXML = encodeURIComponent(XML);
                                var o = {
                                    Nombre: descripcionLarga,
                                    DescripcionLarga: descripcionLarga,
                                    CodigoHiloComer: codigoHiloMadre,
                                    sentidoTorsion: sentTorsion,
                                    ColCCod: colorHilo.substring(0, 6),
                                    TTeCCod: colorHilo.substring(6, 7),
                                    CodigoAcadoHilo: procesoHilo,
                                    CodigoRefProveedor: codigoRefProveedor,
                                    TipoHiladoConfigurado: tipoHiladoMadre,
                                    CodigoHiloFabri: codigoHiloHijo,
                                    //UsuarioCreacion: $(lblUserId).text().trim(),
                                    descripcionCorta: descripcionCorta,
                                    VPP: vvp,
                                    detalle: detalle,
                                    DetalleXml: encodeXML,


                                    File1: fileContentBase64,
                                    File1Name: File1Name,
                                    EstFile1: EstFile1,







                                    ESTADO_DES: $('#chkEstadoEspecifico').prop('checked') == true ? 'A' : 'I'
                                }

                                console.log(o)

                                //debugger;
                                // Realizando Ajax
                                $.ajax({

                                    url: '/HiloEspecifico/InsertHiladoE',
                                    type: 'POST',
                                    dataType: 'text',
                                    data: o,

                                    success: function (data) {
                                        console.log(data);
                                        desbloqObject();
                                        var rpt = JSON.parse(data)
                                        //loadListHilados();
                                        //$(txtCodigoHiloEspecifico).val(data.replaceAll('"', ''));
                                        //AlertMessage("Hilo Específico generado: " + data.replaceAll('"', ''))
                                        //loadHiloEspecificoBandeja();

                                        if (rpt.status == 1) {
                                            $(txtCodigoHiloEspecifico).val(rpt.codigo.replaceAll('"', ''));
                                            //loadListHilados();
                                            //loadHiloEspecificoBandeja2();
                                            //loadHiloEspecificoBandeja();
                                            //onChangeHMadre()
                                            if (updInt == 1) {
                                                //AlertMessage("Hilo Específico actualizado: " + rpt.codigo.replaceAll('"', ''))
                                                DevExpress.ui.dialog.alert("Hilo Específico actualizado: " + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");

                                            } else {
                                                //AlertMessage("Hilo Específico generado: " + rpt.codigo.replaceAll('"', ''))
                                                DevExpress.ui.dialog.alert("Hilo Específico generado: " + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");

                                            }

                                            $("button.btnSaveHEspecifico").closest('div.bootstrap-dialog').modal('hide')

                                        } else if (rpt.status == 0) {
                                            //AlertMessage("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')')
                                            DevExpress.ui.dialog.alert("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')', "Alerta", "OK");

                                        }
                                        var dataGrid4 = $('#gridContainerHijo').dxDataGrid('instance');

                                        dataGrid4.refresh();
                                        //if (!data.result) {
                                        //    AlertMessage(data.msg);
                                        //    console.log(data.msg);
                                        //}
                                        //else {
                                        //    AlertMessage(data.msg);
                                        //    ReloadGrid();
                                        //    dialog.close();
                                        //}
                                    }
                                }).fail(function (jqxhr, textStatus, error) {
                                    console.log("Request Failed: " + error);
                                    desbloqObject();
                                });
                            };
                            reader.readAsArrayBuffer(file);
                        }
                        else if (file === 0)
                        {
                            console.log("FILE ES 0");

                            // Aquí colocas la lógica que quieres cuando file == 0
                            // por ejemplo, enviar los campos de archivo como null o como desees
                            var detalle = []
                            var XML = '<ROOT>'
                            $("#tblFibrasEspecifico>tbody>tr").each(function (i, tr) {
                                XML = XML + '<DETALLE>'
                                XML = XML + '<CodigoDetalleFabri>' + '0' + '</CodigoDetalleFabri>'
                                XML = XML + '<CodigoTipoFibra>' + $(tr).find('td.tdTipoFibraHEID').text() + '</CodigoTipoFibra>'
                                XML = XML + '<Fibra>' + $(tr).find('td.tdFibraHEID').text() + '</Fibra>'
                                XML = XML + '</DETALLE>'

                                var item = {
                                    CodigoDetalleFabri: "0",
                                    CodigoTipoFibra: $(tr).find('td.tdTipoFibraHEID').text(),
                                    CodigoFibra: $(tr).find('td.tdFibraHEID').text()
                                }
                                detalle.push(item);
                            })
                            XML = XML + '</ROOT>'
                            var encodeXML = encodeURIComponent(XML);

                            var o = {
                                Nombre: descripcionLarga,
                                DescripcionLarga: descripcionLarga,
                                CodigoHiloComer: codigoHiloMadre,
                                sentidoTorsion: sentTorsion,
                                ColCCod: colorHilo.substring(0, 6),
                                TTeCCod: colorHilo.substring(6, 7),
                                CodigoAcadoHilo: procesoHilo,
                                CodigoRefProveedor: codigoRefProveedor,
                                TipoHiladoConfigurado: tipoHiladoMadre,
                                CodigoHiloFabri: codigoHiloHijo,
                                descripcionCorta: descripcionCorta,
                                VPP: vvp,
                                detalle: detalle,
                                DetalleXml: encodeXML,

                                File1: "",
                                File1Name: 0,
                                EstFile1:  2,

                                ESTADO_DES: $('#chkEstadoEspecifico').prop('checked') == true ? 'A' : 'I'
                            }

                            console.log(o)

                            $.ajax({
                                url: '/HiloEspecifico/InsertHiladoE',
                                type: 'POST',
                                dataType: 'text',
                                data: o,
                                success: function (data) {
                                    desbloqObject();
                                    var rpt = JSON.parse(data)
                                    if (rpt.status == 1) {
                                        $(txtCodigoHiloEspecifico).val(rpt.codigo.replaceAll('"', ''));
                                        DevExpress.ui.dialog.alert((updInt == 1 ? "Hilo Específico actualizado: " : "Hilo Específico generado: ") + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");
                                        $("button.btnSaveHEspecifico").closest('div.bootstrap-dialog').modal('hide')
                                    } else if (rpt.status == 0) {
                                        DevExpress.ui.dialog.alert("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')', "Alerta", "OK");
                                    }
                                    $('#gridContainerHijo').dxDataGrid('instance').refresh();
                                }
                            }).fail(function (jqxhr, textStatus, error) {
                                console.log("Request Failed: " + error);
                                desbloqObject();
                            });

                        } else
                        {
                                console.log("NO HAY ARCHIVO");

                                var detalle = []
                                var XML = '<ROOT>'
                                $("#tblFibrasEspecifico>tbody>tr").each(function (i, tr) {
                                    XML = XML + '<DETALLE>'
                                    XML = XML + '<CodigoDetalleFabri>' + '0' + '</CodigoDetalleFabri>'
                                    XML = XML + '<CodigoTipoFibra>' + $(tr).find('td.tdTipoFibraHEID').text() + '</CodigoTipoFibra>'
                                    XML = XML + '<Fibra>' + $(tr).find('td.tdFibraHEID').text() + '</Fibra>'
                                    XML = XML + '</DETALLE>'


                                    var item = {
                                        CodigoDetalleFabri: "0",
                                        CodigoTipoFibra: $(tr).find('td.tdTipoFibraHEID').text(),
                                        CodigoFibra: $(tr).find('td.tdFibraHEID').text()
                                    }
                                    detalle.push(item);
                                })
                                XML = XML + '</ROOT>'
                                var encodeXML = encodeURIComponent(XML);
                                var hayPdfCargado = $('#pdfPreview').is(':visible') && $('#pdfPreview').attr('src') != "";

                                var o = {
                                    Nombre: descripcionLarga,
                                    DescripcionLarga: descripcionLarga,
                                    CodigoHiloComer: codigoHiloMadre,
                                    sentidoTorsion: sentTorsion,
                                    ColCCod: colorHilo.substring(0, 6),
                                    TTeCCod: colorHilo.substring(6, 7),
                                    CodigoAcadoHilo: procesoHilo,
                                    CodigoRefProveedor: codigoRefProveedor,
                                    TipoHiladoConfigurado: tipoHiladoMadre,
                                    CodigoHiloFabri: codigoHiloHijo,
                                    //UsuarioCreacion: $(lblUserId).text().trim(),
                                    descripcionCorta: descripcionCorta,
                                    VPP: vvp,
                                    detalle: detalle,
                                    DetalleXml: encodeXML,


                                    File1: null,
                                    File1Name: null,
                                    EstFile1: hayPdfCargado ? 1 : 0,


                                    ESTADO_DES: $('#chkEstadoEspecifico').prop('checked') == true ? 'A' : 'I'
                                }

                                console.log(o)

                                //debugger;
                                // Realizando Ajax
                                $.ajax({

                                    url: '/HiloEspecifico/InsertHiladoE',
                                    type: 'POST',
                                    dataType: 'text',
                                    data: o,

                                    success: function (data) {
                                        console.log(data);
                                        desbloqObject();
                                        var rpt = JSON.parse(data)
                                        //loadListHilados();
                                        //$(txtCodigoHiloEspecifico).val(data.replaceAll('"', ''));
                                        //AlertMessage("Hilo Específico generado: " + data.replaceAll('"', ''))
                                        //loadHiloEspecificoBandeja();

                                        if (rpt.status == 1) {
                                            $(txtCodigoHiloEspecifico).val(rpt.codigo.replaceAll('"', ''));
                                            //loadListHilados();
                                            //loadHiloEspecificoBandeja2();
                                            //loadHiloEspecificoBandeja();
                                            //onChangeHMadre()
                                            if (updInt == 1) {
                                                //AlertMessage("Hilo Específico actualizado: " + rpt.codigo.replaceAll('"', ''))
                                                DevExpress.ui.dialog.alert("Hilo Específico actualizado: " + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");

                                            } else {
                                                //AlertMessage("Hilo Específico generado: " + rpt.codigo.replaceAll('"', ''))
                                                DevExpress.ui.dialog.alert("Hilo Específico generado: " + rpt.codigo.replaceAll('"', ''), "Alerta", "OK");

                                            }

                                            $("button.btnSaveHEspecifico").closest('div.bootstrap-dialog').modal('hide')

                                        } else if (rpt.status == 0) {
                                            //AlertMessage("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')')
                                            DevExpress.ui.dialog.alert("Ya existe un registro con las mismas características (" + rpt.codigo.replaceAll('"', '') + ')', "Alerta", "OK");

                                        }
                                        var dataGrid4 = $('#gridContainerHijo').dxDataGrid('instance');

                                        dataGrid4.refresh();
                                        //if (!data.result) {
                                        //    AlertMessage(data.msg);
                                        //    console.log(data.msg);
                                        //}
                                        //else {
                                        //    AlertMessage(data.msg);
                                        //    ReloadGrid();
                                        //    dialog.close();
                                        //}
                                    }
                                }).fail(function (jqxhr, textStatus, error) {
                                    console.log("Request Failed: " + error);
                                    desbloqObject();
                                });
                            
                        }
                        







                        

















                    },
                    error: function (e) {
                        console.log("Error obtener Datos de Procesos : [ " + e + " ]")
                    }
                },
                {
                    label: 'Cerrar',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]

        });
    });


    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary); // Convertir a Base64
    }
   

    sleep(500).then(() => {
       /* $('select').selectpicker();
        $('#chkEstadoEspecifico').bootstrapToggle({
            on: 'Activo',
            off: 'Inactivo'
        }).bootstrapToggle('enable');*/
        $(txtCodigoHiloEspecifico).val('0')

        //debugger;
        //$(txtCodigoHiloHMADRE).val(rowSelected.Codigo.trim());
        console.log('12345')
        console.log(parametro.HCoCCod)
        $(txtCodigoHiloHMADRE).val(parametro.HCoCCod);
        $(txtCodigoHiloEspecifico).val(parametro.CodigoHiloFabri)
        //$("#cmbSentidoTorsion option:selected").val(parametro.SentidoTorsion)
        loadHMadreByCodigo(parametro.HCoCCod.trim());
        sleep(500).then(() => {
            console.log('cmbProcesoHilo')
            console.log($(cmbProcesoHilo).text())
            $.blockUI({
                message: '<img src="/Content/Images/loading.gif">',
                css: { border: 'none', background: 'transparent', zIndex: 2000 },
                overlayCSS: {
                    backgroundColor: '#000',  // Color de fondo para el overlay
                    opacity: 0.6,             // Opacidad del fondo
                    zIndex: 2000              // Asegúrate de que el z-index del overlay sea mayor que el del BootstrapDialog
                }
            });
            loadHijoByCodigo(0)
            sleep(500).then(() => {
                if (updInt == 3) {
                    $(txtCodigoHiloEspecifico).val('')
                }

                enableTransactHE()
                if (updInt == 2) {
                    disableTransactHE()
                }
            })



        })



        //loadHijoByCodigo()
    });

    

}


