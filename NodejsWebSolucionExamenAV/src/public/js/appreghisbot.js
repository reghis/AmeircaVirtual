$(function () {
    //------------------------------------------------------------   INICIO
    $(document).ready(function () {
        //var events = [];
        var selectedEvent = null;
        FetchEventAndRenderCalender1();
        function FetchEventAndRenderCalender1() {
            //alert("reghisbot");
            $.ajax({
                type: 'GET',
                url: '/rvr',
                success: function (data) {
                    console.log("estamos aca");
                },
                error: function (error) {
                    alert('falla');
                }
            })
        }
        $(document).ajaxStart(function () {
            $("#loading").show();
        });
        $(document).ajaxStop(function () {
            $("#loading").hide();
        });
        
    });
    //------------------------------------------------------------   FINAL
   
    //alert("aca");
    $('#getUsuarios').on('click', function () {
        $.ajax({
            url: '/usuarios',
            success: function (usuarios) {
                console.log(usuarios);
                localStorage.setItem("Persona", JSON.stringify(usuarios));
            }
        })
    })
    $('#getSistemas').on('click', function () {
        $.ajax({
            url: '/lista',
            success: function (sistemas) {
                console.log(sistemas);
            }
        })
    })
    // guardar datos
    $('#productForm').on('submit', function (e) {
        // prueba 
        e.preventDefault();
        var _username = $('#username').val();
        if (_username == "") {
            //$('#lblMensaje').html('Usted debe introducir registro');
            alert('debe introducir usuario');
            $('#username').focus();
            return false;
        }
        var _password = $('#password').val();
        if (_password == "") {
            //$('#lblMensaje').html('Usted debe introducir registro');
            alert('debe introducir password');
            $('#password').focus();
            return false;
        }
        $.ajax({
            url: '/login',
            method: 'GET',
            data: {
                username: _username,
                password: _password,
            },
            success: function (response) {
                console.log(response);
            }
            
        })
    });

})
