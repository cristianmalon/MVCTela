//import { on } from '/Content/js/_General/js_Events.js';
//import { createButton } from '/Content/js/_General/js_Events.js';
import * as Events from '/Content/js/_General/js_Events.js';

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);

    }
}
docReady(function () {
    if (Events.isLogged()) {
        window.location.href = "/Home";
    }

    $("#form").validate({
        rules: {
            "txtUser": {
                required: true,
                minlength: 3
            },
            "txtPassword": {
                required: true,
                minlength: 3
            }
        },
        messages: {
            "txtUser": {
                required: "Ingrese Usuario",
                minlength: jQuery.validator.format("Mínimo {0} caracteres")
            },
            "txtPassword": {
                required: "Ingrese Clave",
                minlength: jQuery.validator.format("Mínimo {0} caracteres")
            }
        },
        submitHandler: function (form) { // for demo
            //alert('valid form submitted'); // for demo
            login()
            return; // for demo
        }
    });

    const clean = () => {
        $(txtErrorLogin).text('')
            $(txtErrorLogin).hide()
    }

    document.addEventListener('keypress', clean)
    document.addEventListener('keypress', clean)

    const login = () => {
        let txtUser = document.querySelectorAll('#txtUser')[0].value
        let txtPassword = document.querySelectorAll('#txtPassword')[0].value

        console.log(txtUser);
        console.log(txtPassword);
        if (txtUser == "123") {
            console.log('Ingreso')

            Events.login()
        } else {
            $(txtErrorLogin).text('Usuario o clave incorrecto')
            $(txtErrorLogin).show()
        }
    }

});
