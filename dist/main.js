let render = new Renderer()
let fetch = new Fetcher()

$("#button-1").on("click", function(){
    let input = $(this).closest("div").find("input").val()
    fetch.fetchTeamData(input)
    $(this).closest("div").find("input").val('')
})


let addTeam = function(){
    $.ajax({
        url: `team`,
        method: "PUT",
        data: data ,
        success: function (response) {
            console.log("PUT complete");
        }
    })
}

$("#button-2").on("click", function(){
    $.get('/dreamTeam', function(response){
        render.renderTeam({player:response})
        $(".player").on("click",function(){
            let lName = $(this).find(`[data-id="player-name"]`).text().split(' ')[2]
            let playa = response.find( p => p.lastName == lName )
            $.post(`/roster`,playa, function(response){
                console.log(response)
            })
            console.log(playa)
        })
    })
})



