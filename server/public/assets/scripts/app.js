$(document).ready(function(){
    var persons = {};
    $('#search').submit(function (event) {
      $('#result').empty();
      event.preventDefault();

        $.each($(this).serializeArray(), function(i, field){
            persons[field.name] = field.value;
        });


        $.ajax({
          type: 'GET',
          url: '/data',
          data: persons,
          beforeSend: function (){

          },
          success: function (personAndAnimal) {
            console.log(personAndAnimal);
            displayToDom(personAndAnimal);
            persons = {};
          }
        });
    });
    $('#inputPerson').submit(function (event) {
        event.preventDefault();
        $.each($(this).serializeArray(), function(i, field){
            persons[field.name] = field.value;
        });
        $.ajax({
          type:'POST',
          url:'/data',
          data: persons,
          beforeSend: function () {
            console.log(persons);
          },
          success: function (response) {
            console.log(response);
          }
        });

    });
});

function displayToDom(personAndAnimal) {
  for (var i = 0; i < personAndAnimal.length; i++) {
    $('#result').append('<p>Name: '+personAndAnimal[i].name+'</p>');
    $('#result').append('<p> Spirit Animal: ' + personAndAnimal[i].spirit_animal+'</p>');
  }

}
