var tiempo = {
    Hora: 0,
    Minuto: 0,
    Segundo: 0
};

var tiempo_corriendo = null;
var tiempo_corriendo2 = null;
var tiempo_corriendoParada = null;

var lblContarReloj = true;

function AlertMessageFocus(content, campo) {
    $("<div></div>").kendoDialog({
        title: "Mensaje",
        content: content,
        closable: false,
        modal: true,
        actions: [
            {
                text: 'OK',
                action: function () {
                    if (campo != undefined) {
                        campo.focus();
                    }
                }
            }
        ],
    }).data("kendoDialog").open();
}


function desbloqObjectFocus(campo) {
    $.unblockUI();
    if (campo != undefined) {
        campo.focus();
    }
}

function desbloqObjectReport() {
    $.unblockUI();
}

function relojnew(myfecha) {
    var end, start;
    start = new Date(myfecha);
    end = new Date();

    var msegu = (end.getTime() - start.getTime());
    var dsegundos = Math.round(msegu / 1000);
    var horas = Math.floor(dsegundos / 3600);
    var dhoras = Math.floor(dsegundos % 3600);
    var minutos = Math.floor(dhoras / 60);
    var segundos = Math.floor(dhoras % 60);

    return addZero(horas) + ':' + addZero(minutos) + ':' + addZero(segundos);

}

function relojnewSinParada(myfecha,TimeParada) {
    var end, start;
    start = new Date(myfecha);
    start = new Date(start.getTime() + TimeParada * 60000);
    end = new Date();

    var msegu = Math.abs((end.getTime() - start.getTime()));
    var dsegundos = Math.round(msegu / 1000);
    var horas = Math.floor(dsegundos / 3600);
    var dhoras = Math.floor(dsegundos % 3600);
    var minutos = Math.floor(dhoras / 60);
    var segundos = Math.floor(dhoras % 60);

    return addZero(horas) + ':' + addZero(minutos) + ':' + addZero(segundos);

}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function StartReloj2(Campomostrar, fecha) {
    tiempo_corriendo2 = setInterval(function () {
        if (1==1) {
            $(Campomostrar).val(relojnew(fecha));
            //$(txtRelojTeorico).val(relojnew(fecha));
            console.log('StartReloj2')
            console.log(fecha)

            let minutosParada = $(txtTiempoParada).val()
            if (minutosParada == "") minutosParada = 0
            minutosParada = parseInt(minutosParada)

            $(txtRelojReal).val(relojnewSinParada(fecha, minutosParada));
        }
        
    }, 1000);
}

function StopReloj2(Campomostrar, myfecha) {
    clearInterval(tiempo_corriendo2);
    StartReloj2(Campomostrar, myfecha);
}

function StopRelojParda(Campomostrar, myfecha) {
    clearInterval(tiempo_corriendoParada);
    StartRelojParada(Campomostrar, myfecha);
}
function StopRelojParada(Campomostrar) {
    clearInterval(tiempo_corriendoParada);
    $(Campomostrar).val('');
}

function StartRelojParada(Campomostrar, fecha) {
    tiempo_corriendoParada = setInterval(function () {
        $(Campomostrar).val(relojnew(fecha));
    }, 1000);
}



function StartReloj(Campomostrar) {

    tiempo_corriendo = setInterval(function () {
        // Segundos
        tiempo.Segundo++;
        if (tiempo.Segundo >= 60) {
            tiempo.Segundo = 0;
            tiempo.Minuto++;
        }

        // Minutos
        if (tiempo.Minuto >= 60) {
            tiempo.Minuto = 0;
            tiempo.Hora++;
        }
        var vrreloj = '';
        vrreloj = vrreloj + (tiempo.Hora < 10 ? '0' + tiempo.Hora : tiempo.Hora);
        vrreloj = vrreloj + ' : ';
        vrreloj = vrreloj + (tiempo.Minuto < 10 ? '0' + tiempo.Minuto : tiempo.Minuto);
        vrreloj = vrreloj + ' : ';
        vrreloj = vrreloj + (tiempo.Segundo < 10 ? '0' + tiempo.Segundo : tiempo.Segundo);
        GrabarTiempo();
        $(Campomostrar).val(vrreloj);



    }, 1000);

}


function StopReloj(Campomostrar) {
    clearInterval(tiempo_corriendo);
    tiempo = {
        Hora: 0,
        Minuto: 0,
        Segundo: 0
    };
    GrabarTiempo();
    $(Campomostrar).val('00 : 00 : 00');
    StartReloj(Campomostrar);
}

function GrabarTiempo() {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Home/SetTime',
        type: 'POST',
        data: JSON.stringify({ mReloj: tiempo }),
        beforeSend: function () {
        },
        success: function (data) {
            if (data.result == undefined) {
                DialogMessage("Su tiempo de Session a Caducado..Favor de Volver a Ingresar", "../Account/Login");
            }
            else if (!data.result) {
                console.log('Resultado [js_General]  : ' + data.msg);
            }
        }
    }).fail(function (jqxhr, textStatus, error) {
        console.log("Request Failed [js_General]: " + error);
    });
}


Array.prototype.max = function (s) {
    s = s || DefaultSelector;
    var l = this.length;
    var max = s(this[0]);
    while (l-- > 0)
        if (s(this[l]) > max) max = s(this[l]);
    return max;
};
function DefaultEqualityComparer(a, b) {
    return a === b || a.valueOf() === b.valueOf();
};

function DefaultSortComparer(a, b) {
    if (a === b) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a == "string") return a.toString().localeCompare(b.toString());
    return a.valueOf() - b.valueOf();
};

function DefaultPredicate() {
    return true;
};

function DefaultSelector(t) {
    return t;
};


