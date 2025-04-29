export const on = (eventName, selector, handler) => {
    document.addEventListener(
        eventName,
        event => {
            const elements = document.querySelectorAll(selector);
            const path = event.composedPath();

            path.forEach(node => {
                elements.forEach(elem => {
                    if (node === elem) {
                        handler.call(elem, event);
                    }
                });
            });
        },
        true
    );
};

export const createButton = (id, className) => {
    const button = document.createElement("button");

    button.innerText = `button ${id}`;
    button.id = id;
    button.classList.add(className);

    return button;
};

export const isLogged = () => {
    console.log('isLogged?')
    var user = localStorage.getItem("user");

    if (!user) {
        //window.location.href = "/Login";
        console.log('Not Logged')
        return false;
    } else {
        console.log('Logged')
        inactivityTime();
        return true;
    }
}

export const logout = () => {
    console.log('logout')
    localStorage.removeItem('user')
    localStorage.removeItem('currentTime')

    window.location.href = "/Login";
}

export const login = () => {
    localStorage.setItem('user', 'peppito')
    sessionStorage.setItem('sessionExpired', false)
    localStorage.setItem('sessionExpiredFlag', false)
    var n = new Date().getTime();
    localStorage.setItem("currentTime", n)

    window.location.href = "/Home";
}

let timeSessionExpired = 800000

const confirmPassword = () => {
    Swal.fire({
        title: 'La sesión expiró, ingrese clave para continuar',
        input: 'password',
        inputAttributes: {
            //autocapitalize: 'off'
        },
        showDenyButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        //showCancelButton: true,
        confirmButtonText: 'ReIngresar',
        denyButtonText: 'Salir',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.setItem('sessionExpired', false)
            localStorage.setItem('sessionExpiredFlag', false)
            //localStorage.removeItem('user')
            resetTimer()
        } else if (result.isDenied) {
            logout()
        }
    })
}

function resetTimer() {
    var n = new Date().getTime();
    localStorage.setItem("currentTime", n)
}

export const inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer; // touchscreen presses
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;     // touchpad clicks
    document.onkeydown = resetTimer;   // onkeypress is deprectaed
    document.addEventListener('scroll', resetTimer, true); // improved; see comments
    var varsessionExpiredFlag = localStorage.getItem('sessionExpiredFlag')
    console.log('varsessionExpiredFlag')
    console.log(varsessionExpiredFlag)
    if (varsessionExpiredFlag == 'true') {
        confirmPassword()
    }
    setInterval(function () {
        var timeSession = localStorage.getItem("currentTime");
        var timeLeft = 0

        if (!timeSession) {
            var n = new Date().getTime();
            localStorage.setItem("currentTime", n)
        }
        timeLeft = new Date().getTime() - localStorage.getItem("currentTime");
        var sessionExpired = sessionStorage.getItem('sessionExpired')
        var sessionExpiredFlag = localStorage.getItem('sessionExpiredFlag')
        if (!sessionExpired) {
            sessionStorage.setItem('sessionExpired', false)
        }
        console.log(timeLeft)
        console.log(sessionExpired)

        if (timeLeft > timeSessionExpired) {
            if (sessionExpired == 'false') {
                console.log('bloqueando')
                sessionStorage.setItem('sessionExpired', true)
                localStorage.setItem('sessionExpiredFlag', true)
                confirmPassword()
            }
            console.log('Logout for time Session Inactive');
        }
    }, 2000);
};