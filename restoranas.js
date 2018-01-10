$(function(){
    $("form").submit(function(e){
        e.preventDefault();
        
        var name = $('#name').val();
        name = name.trim();
        if(name == ""){
            alert('Iveskite varda');
            return;
        }

        var ppl = $('#ppl').val();
        if(ppl <= 0 || parseInt(ppl) != ppl){
            alert('Zmoniu skaicius turi buti sveikasis bei teigiamas skaicius');
            return;
        }

        var reservDate = $('#resDate').val();
        var date = reservDate.split('-');
            if(date.length == 3){
                var dateObject = new Date(date[0], date[1] - 1, date[2]);
                if(!(dateObject.getFullYear() == date[0] && dateObject.getMonth() == date[1]-1 && dateObject.getDate() == date[2])){
                    alert('Neteisingai nurodyta data');
                    return;
                }
            } 
            else{
                alert('Neteisingai nurodyta data');
                return;
            }

        var querryArray = $("form").serializeArray();
        serialize(querryArray);
    });   
    $("#name").change(function(){
        if($("#name").val() === "mike"){
            $("#pic").css('display', 'none');
        }
    });
    $('a[href="#desertuMeniu"]').click(function(){
        $("#desertuMeniu").text("DESERTU MENIU");
    });
    $("#colorbutton").click(function(){
        $("#colorbutton").next().next().attr('style', 'color : blue');
    });
    $("#deleteNr").change(function(e){
        if($("li").length >= e.target.value)
        {$("li")[parseInt(e.target.value)-1].remove();}
        
    });
    $("#addText").change(function(e){
        $('#klientai').append('<p>' + e.target.value + '</p>');
    });
});
function serialize(querryArray){
    $.ajax({
        url:"https://api.myjson.com/bins",
        type:"POST",
        data: JSON.stringify(querryArray),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data, textStatus){
            if(textStatus == "success"){
                $.get(data.uri, function(getData){ 
                $("#rezerTable").append(`<tr>
                    <td>` + getData[0].value + `</td>
                    <td>` + getData[1].value + `</td>
                    <td>` + getData[2].value + `</td>
                    <td>` + getData[3].value + `</td>
                    <td>` + getData[4].value + `</td>
                </tr>`);
            })
            }
        }
    });
}
