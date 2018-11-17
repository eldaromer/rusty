$(document).ready(() => {
    let socket = io('http://localhost:3000');
    $('#test').text("Tested");

    $.ajax({
        url: "http://localhost:3000/auth/login",
        type: 'POST',
        data: {
            username: "eldaremily",
            password: "1234"
        }
    }).done((data, err) => {
        Cookies.set('access_token', data.token);
        console.log(data);
        console.log(err);
    })
});