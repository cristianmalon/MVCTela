var consultarAprobacion = false;
$(document).ready(function () {
    loadGridPadre();
    CargarSwitch();

    $('.filtro').on('keypress', function (e) {
        if (e.which === 13) {
            ActualizarTablaSolicitud();
        }
    });

    $("#btnRegistrarSolicitudActualizacionPC").click(function () {
        //alert(123)
        //var CLIENTEKey = $('#frmIdxSolicitudActualizacionPC').find('input[id="CLIENTEKey"]').val();
        consultarAprobacion = true;
        var IdSolicitudKey = "";
        BootstrapDialog.show({
            id: 'abcid',
            cssClass: 'size-wide-dialog-1200',
            title: 'REGISTRAR SOLICITUD APERTURA ASOCIACION',
            message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + IdSolicitudKey)),
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            buttons: [{
                label: 'Cerrar',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                label: 'Registrar',
                icon: 'glyphicon glyphicon-save',
                action: function (dialog) {
                    debugger;
                    if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                        AlertMessage("Seleccione Motivo");
                        return;
                    }
                    
                    var o = {
                        IdSolicitudAperturaAsociacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudAperturaAsociacion']").val(),
                        saa_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Anio']").val(),
                        saa_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Nro']").val(),
                        IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                        saa_EstadoAprobracion: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="saa_EstadoAprobracion"]').val(),
                        saa_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Observacion']").val()
                    }


                    var dataSave = $("#gridDCPO").data("kendoGrid").dataSource.data()

                    if (dataSave.length == 0) {
                        AlertMessage("Seleccione al menos una Asociación");
                        return;
                    }
                   
                    o.IdAsociacionPedido = dataSave[0].IdAsociacionPedido

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/SolicitudActualizacionApertura/GuardarSolicitud',
                        type: 'POST',
                        data: JSON.stringify({ entidad: o, _entidad: null }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            //debugger;
                            if (!data.rpta) {
                                //errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                AlertMessage(data.errores);
                            } else {
                                AlertMessage("Se generó la solicitud " + data.id);

                                var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                                grid.dataSource.read();
                                grid.refresh();
                                dialog.close();
                            }


                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }
            }]
        });
    });

    $("#btnEditarSolicitudActualizacionPC").click(function () {
        //alert(123)
        consultarAprobacion = true;
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            debugger;
            if (item.saa_EstadoAprobracion != 'P') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser modificada, su estado es: ' + item.saa_EstadoAprobracionDescipcion,
                });
                return;
            }
            bloquoteObject();
            console.log(item.IdSolicitudActualizacion)
            BootstrapDialog.show({
                cssClass: 'size-wide-dialog-1200',
                title: 'EDITAR SOLICITUD ACTUALIZACIÓN',
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + item.SerialKey)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: 'Registrar',
                    icon: 'glyphicon glyphicon-save',
                    action: function (dialog) {

                        if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                            AlertMessage("Seleccione Motivo");
                            return;
                        }
                        var Detalle = [
                        ]

                        var o = {
                            IdSolicitudAperturaAsociacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudAperturaAsociacion']").val(),
                            saa_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Anio']").val(),
                            saa_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Nro']").val(),
                            IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                            saa_EstadoAprobracion: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="saa_EstadoAprobracion"]').val(),
                            saa_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Observacion']").val()
                        }
                        var dataSave = $("#gridDCPO").data("kendoGrid").dataSource.data()

                        if (dataSave.length == 0) {
                            AlertMessage("Seleccione al menos una Asociación");
                            return;
                        }
                        
                        o.IdAsociacionPedido = dataSave[0].IdAsociacionPedido
                        console.log(o);
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/SolicitudActualizacionApertura/GuardarSolicitud',
                            type: 'POST',
                            data: JSON.stringify({ entidad: o, _entidad: null }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                debugger;
                                if (!data.rpta) {
                                    //errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                    AlertMessage(data.errores);
                                } else {
                                    AlertMessage("Se edito la solicitud " + data.id);

                                    var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                                    grid.dataSource.read();
                                    grid.refresh();
                                    dialog.close();
                                }

                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                }]
            });

        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA EDITAR");
        }

    })

    $("#btnEliminarSolicitudActualizacion").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            console.log(item);
            if (item.saa_EstadoAprobracion != 'P') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser eliminada, su estado es: ' + item.saa_EstadoAprobracionDescipcion,
                });
                return;
            }
            window.ConfirmMessage("SEGURO QUE DESEA ELIMINAR LA SIGUIENTE SOLICITUD?").then(function () {

                var SOLICITUDPEDIDO = {
                    SerialKey: item.SerialKey,
                    ESTADO: "I"
                }

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/SolicitudActualizacionApertura/Eliminar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: SOLICITUDPEDIDO }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {
                            AlertMessage(data.errores);
                        } else {

                            AlertMessage("Se Elimino la solicitud");
                            ActualizarTablaSolicitud();
                        }

                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });

            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA ELIMINAR");
        }


    });

    $("#btnEnvioPcp").click(function () {
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            if (item.saa_EstadoAprobracion != 'P') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser enviada a PCP, su estado es: ' + item.saa_EstadoAprobracionDescipcion,
                });
                return;

            }
            window.ConfirmMessage("Desea Enviar el Pedido Comercial a PCP?").then(function () {

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/SolicitudActualizacionApertura/ListarDatosPCP',
                    type: 'POST',
                    data: JSON.stringify({ entidad: item }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {

                        if (data.rpta == false || data.rpta == undefined) {
                            AlertMessage(data.result);

                        }
                        else {
                            var vrParametros = data.parametros;
                            console.log(vrParametros);
                            var mCotizacion = {
                                StrSubject: data.parametros[2],
                                StrBody: data.parametros[3]
                            };

                            vrRuta = Enrutamiento("../EmailPCP/EnviarPCP", 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion)));
                            BootstrapDialog.show({
                                title: 'Envió Email',
                                cssClass: 'size-wide-dialog-1000',
                                closable: false,
                                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
                                buttons: [
                                    {
                                        label: 'Cerrar',
                                        action: function (dialog) {
                                            dialog.close();
                                        }
                                    },
                                    {
                                        label: 'Aceptar',
                                        action: function (dialog) {
                                            var vrcuerpo = $("#frmEnvioEmail").find("textarea[id='strStrBody']").val();
                                            var vrDestinatarios = $("#frmEnvioEmail").find("textarea[id='txtStrTo']").val();

                                            if ($.trim(vrDestinatarios).length == 0) {
                                                AlertMessage('Debe de ingresar al menos un destinatario');
                                                return;
                                            } else {

                                                var arr = vrDestinatarios.split(';');

                                                for (var i = 0; i < arr.length; i++) {
                                                    if ($.trim(arr[i]).length == 0) {
                                                        AlertMessage('Debe de ingresar al menos un destinatario');
                                                        break;
                                                        return;
                                                    }
                                                }
                                            }
                                            if ($.trim(vrcuerpo).length == 0) {
                                                AlertMessage('Debe de ingresar el Contenido del Mensaje');
                                                return;
                                            }
                                            var mCotizacion = {
                                                StrFrom: $("#frmEnvioEmail :input[id='txtStrFrom']").val(),
                                                StrTo: $("#frmEnvioEmail").find("textarea[id='txtStrTo']").val(),
                                                StrCopyTo: $("#frmEnvioEmail").find("textarea[id='strStrCopyTo']").val(),
                                                StrSubject: $("#frmEnvioEmail :input[id='txtStrSubject']").val(),
                                                StrBody: $("#frmEnvioEmail").find("textarea[id='strStrBody']").val(),
                                            };

                                            $.ajax({
                                                datatype: 'json',
                                                contentType: "application/json",
                                                url: '/EmailPCP/EnviarEmail',
                                                type: 'POST',
                                                data: JSON.stringify(mCotizacion),
                                                beforeSend: function () { },
                                                success: function (data) {
                                                    if (!data.rpta) {
                                                        AlertMessage(data.result);
                                                        console.log("error :" + data.result);
                                                        return;
                                                    }
                                                    //Actualizamos estado
                                                    $.ajax({
                                                        datatype: 'json',
                                                        contentType: "application/json",
                                                        url: '/SolicitudActualizacionApertura/EnviarCorreo',
                                                        type: 'POST',
                                                        data: JSON.stringify({ entidad: item }),
                                                        beforeSend: function () { },
                                                        success: function (data) {
                                                            if (!data.rpta) {
                                                                AlertMessage(data.result);
                                                                console.log("error :" + data.result);
                                                                return;
                                                            }
                                                            AlertMessage("Se envio a PCP " + data.id);
                                                            //AlertMessage(data.result);
                                                            ActualizarTablaSolicitud();
                                                            dialog.close();
                                                        }
                                                    });

                                                    //AlertMessage(data.result);
                                                    //ActualizarTablaSolicitud();
                                                    //dialog.close();
                                                }
                                            }).fail(function (jqxhr, textStatus, error) {
                                                console.log("Request Failed: " + error);
                                                dialog.close();
                                            });


                                        },
                                        error: function (e) {
                                            console.log("Error eviar Mail: [ " + e + " ]")
                                        }
                                    }
                                ]
                            });
                        }
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });



            });
        } else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA ENVIAR A PCP");
        }



    });

    $("#btnAprobarSolicitudActualizacionPC").click(function () {
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        consultarAprobacion = false;
        if (item != undefined) {
            debugger;
            if (item.saa_EstadoAprobracion != 'E') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser procesada, su estado es: ' + item.saa_EstadoAprobracionDescipcion,
                });
                return;
            }
            bloquoteObject();
            console.log(item.IdSolicitudActualizacion)
            BootstrapDialog.show({
                cssClass: 'size-wide-dialog-1200',
                title: 'APROBAR SOLICITUD ACTUALIZACIÓN',
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + item.SerialKey)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: 'Rechazar',
                    icon: 'glyphicon glyphicon-remove',
                    action: function (dialog) {
                        if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                            AlertMessage("Seleccione Motivo");
                            return;
                        }
                        var Detalle = [
                        ]

                        var o = {
                            IdSolicitudAperturaAsociacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudAperturaAsociacion']").val(),
                            saa_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Anio']").val(),
                            saa_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Nro']").val(),
                            IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                            saa_EstadoAprobracion: 'R',
                            saa_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Observacion']").val()
                        }


                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/SolicitudActualizacionApertura/AprobarSolicitud',
                            type: 'POST',
                            data: JSON.stringify({ entidad: o, _entidad: null }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                if (!data.rpta) {
                                    errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                } else {
                                    AlertMessage("Se rechazó la solicitud " + data.id);

                                    ActualizarTablaSolicitud();
                                    dialog.close();
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                },
                {
                    label: 'Aprobar',
                    icon: 'glyphicon glyphicon glyphicon-ok',
                    action: function (dialog) {

                        if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                            AlertMessage("Seleccione Motivo");
                            return;
                        }

                        var o = {
                            IdSolicitudAperturaAsociacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudAperturaAsociacion']").val(),
                            saa_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Anio']").val(),
                            saa_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Nro']").val(),
                            IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                            saa_EstadoAprobracion: 'A',
                            saa_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='saa_Observacion']").val()
                        }
                       

                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/SolicitudActualizacionApertura/AprobarSolicitud',
                            type: 'POST',
                            data: JSON.stringify({ entidad: o, _entidad: null }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                if (!data.rpta) {
                                    errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                } else {
                                    AlertMessage("Se aprobó la solicitud " + data.id);

                                    ActualizarTablaSolicitud();
                                    dialog.close();
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                }]
            });

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL DE MUESTRA QUE DESEA EDITAR");
        }

    });

    $("#btnActualizacionPC").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            bloquoteObject();
            debugger;
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey_PC);
            if (item.saa_EstadoAprobracion == 'A') {
                var SOLICITUDPEDIDO = {
                    SerialKey: item.SerialKey
                }

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/SolicitudActualizacionApertura/ActualizarSolicitud_Historico',
                    type: 'POST',
                    data: JSON.stringify({ entidad: SOLICITUDPEDIDO }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {
                            AlertMessage(data.errores);
                        } else {

                            //desbloqObject();
                            window.location.href = url_;

                        }
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });


            }
            else if (item.saa_EstadoAprobracion == 'U') {
                window.location.href = url_;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser Actualizada, su estado es: ' + item.saa_EstadoAprobracionDescipcion,
                });
                desbloqObject();

            }




        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA ACTUALIZAR");
        }


    });

    $("#btnAuditoria").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {

            vrRuta = Enrutamiento("../SolicitudActualizacionApertura/Auditoria", 'IdSolicitudKey=' + item.SerialKey);
            BootstrapDialog.show({
                title: 'Auditoria ' + item.saa_Anio + '-' + item.saa_Nro,
                cssClass: 'size-wide-dialog-1000',
                closable: false,
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
                buttons: [
                    {
                        label: 'Aceptar',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }
                ]
            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA AUDITAR");
        }


    });

    $("#btnConsultar").click(function () {
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        consultarAprobacion = false;
        if (item != undefined) {
            debugger;
            bloquoteObject();
            BootstrapDialog.show({
                cssClass: 'size-wide-dialog-1200',
                title: 'SOLICITUD ACTUALIZACIÓN',
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + item.SerialKey)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Aceptar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL DE MUESTRA QUE DESEA EDITAR");
        }

    });

    $("#btnConsultarConf").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            bloquoteObject();
            var parametros = "key=" + item.SerialKey_PC + "&Tip=C";
            var url_ = Enrutamiento($(this).attr('data-url'), parametros);
            if (item.saa_EstadoAprobracion == 'F') {
                window.location.href = url_;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser Actualizada, su estado es: ' + item.saa_EstadoAprobracionDescipcion,
                });
                desbloqObject();

            }

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL QUE DESEA ACTUALIZAR");
        }


    });
});

function onDataBound(arg) {
    var myElem = document.getElementById('trParentHeader');
    if (myElem === null) {
        $("#gridSolicitudActualizacion").find("th.k-header").parent().before(`<tr id='trParentHeader'>
                                                <th colspan='3' class='k-header'><strong>Solicitud de Apertura</strong></th>
                                                <th colspan='2' class='k-header'><strong>Grupo</strong></th>
                                                <th colspan='9' class='k-header'><strong></strong></th>
                                                </tr>`);
    }
}

function loadGridPadre() {
    //alert(1234)
    var grid = $("#gridSolicitudActualizacion").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    type: "POST",
                    url: "/SolicitudActualizacionApertura/ListarPaginado",
                    contentType: "application/json",
                    dataType: 'json',
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    complete: function () {
                        desbloqObject();
                    }
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        PageNumber: options.page, //(options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        EmpCCod: $('#frmIdxSolicitudActualizacionPC').find('input[id="EmpCCod"]').val(),
                        saa_Anio: $('#frmIdxSolicitudActualizacionPC').find('input[id="saa_Anio"]').val(),
                        saa_Nro: $('#frmIdxSolicitudActualizacionPC').find('input[id="saa_Nro"]').val(),
                        apc_Anio: $('#frmIdxSolicitudActualizacionPC').find('input[id="apc_Anio"]').val(),
                        apc_Nro: $('#frmIdxSolicitudActualizacionPC').find('input[id="apc_Nro"]').val(),
                        OPCNAno: $('#frmIdxSolicitudActualizacionPC').find('input[id="OPCNAno"]').val(),
                        OPCNNro: $('#frmIdxSolicitudActualizacionPC').find('input[id="OPCNNro"]').val(),
                        OrdenManuAno: $('#frmIdxSolicitudActualizacionPC').find('input[id="OrdenManuAno"]').val(),
                        OrdenManuNro: $('#frmIdxSolicitudActualizacionPC').find('input[id="OrdenManuNro"]').val(),
                        MotivoDescripcion: $('#frmIdxSolicitudActualizacionPC').find('input[id="MotivoDescripcion"]').val(),
                        Cliente: $('#frmIdxSolicitudActualizacionPC').find('input[id="Cliente"]').val(),
                        Marca: $('#frmIdxSolicitudActualizacionPC').find('input[id="Marca"]').val(),
                        Ejecutivo: $('#frmIdxSolicitudActualizacionPC').find('input[id="Ejecutivo"]').val(),
                        ESTADO: $('#frmIdxSolicitudActualizacionPC').find('input[id="ESTADO"]').val(),
                        TipoPedido: $('#frmIdxSolicitudActualizacionPC').find('input[id="TipoPedido"]').val(),
                        saa_EstadoAprobracionDescipcion: $('#frmIdxSolicitudActualizacionPC').find('input[id="saa_EstadoAprobracionDescipcion"]').val(),
                    });
                }
            },
            schema: {
                data: "lista",
                total: "pageSize",
                type: 'json',
                model: {
                    fields: {
                       
                        IdSolicitudAperturaAsociacion: { type: "string" },
                        saa_Anio: { type: "string" },
                        saa_Nro: { type: "string" },
                        saa_EstadoAprobracion: { type: "string" },
                        saa_EstadoAprobracionDescipcion: { type: "string" },

                        apc_Anio: { type: "string" },
                        apc_Nro: { type: "string" },
                        apc_FecEmi: { type: "date" },

                        Ejecutivo: { type: "string" },
                        TipoMercado: { type: "string" },

                        NOMBRE_ESTADO: { type: "String" },
                        COLOR_ESTADO: { type: "String" },
                        PedidosComercial: { type: "String" },
                        apc_EstadoAprobracion: { type: "String" },
                        OrdenesManufactura: { type: "String" },
                        Cliente: { type: "string" },
                        Marca: { type: "string" },
                        OPC_EJECUTIVO: { type: "string" },
                        TipoPedido: { type: "string" },
                        Empaques: { type: "string" },
                        TipoMercado: { type: "string" },
                        TotalPage: { type: "string" },
                        SerialKey: { type: "string" },
                        SerialKey_PC: { type: "string" },
                        MotivoDescripcion: { type: "string" },
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        },
        scrollable: true,
        dataBound: onDataBound,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateSolicitudActualizacionPC").html()),
        noRecords: {
            template: '<br /> ' +
                ' <div> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },

        columns: [{
            field: "saa_Anio",
                title: "Año",
                width: 60
            }, {
                field: "saa_Nro",
                title: "Nro",
                width: 60
            },
            {
                field: "saa_EstadoAprobracionDescipcion",
                title: "Estado de Solicitud",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            },
            {
                field: "apc_Anio",
                title: "Año",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 50
            }, {
                field: "apc_Nro",
                title: "Nro",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 70
            },
            {
                field: "PedidosComercial",
                title: "Pedido Comercial",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            },
            {
                field: "OrdenesManufactura",
                title: "Ordenes de Manufactura",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 250
            },
            {
                field: "TipoPedido",
                title: "Tipo Pedido",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 120
            },
            {
                field: "Cliente",
                title: "Cliente",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            },
            {
                field: "Marca",
                title: "Marca",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            },
            {
                field: "apc_FecEmi",
                title: "F. Emision",
                format: "{0: dd/MM/yyyy}",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 80
            },
            {
                field: "Ejecutivo",
                title: "Ejecutivo",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            },
            {
                field: "TipoMercado",
                title: "Mercado",
                template: '<div align="center"> #if (TipoMercado == "L") {# Local #} else {# Exportación #}# </div>',
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            },
            {
                field: "MotivoDescripcion",
                title: "Motivo",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            }
        ]
    }).data("kendoGrid");

    //grid.hideColumn(0);
    //grid.hideColumn(3);
    //grid.hideColumn(16);
}

function CargarSwitch() {
    $("#chkEstadoAnulado").kendoSwitch({
        checked: false,
        messages: {
            checked: "Si",
            unchecked: "No"
        },
        change: function (e) {
            if (e.checked) {
                $("#ESTADO").val("I");
            } else {
                $("#ESTADO").val("A");
            }
            ActualizarTablaSolicitud();
        }
    });



}

function ActualizarTablaSolicitud() {
    var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}