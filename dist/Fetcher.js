class Fetcher{
    fetchTeamData(input){
        $.get(`/teams/${input}`, function(response){
            render.renderTeam({player:response})
        })
    }
    // fetchPlayerStats(player){
    //     $.get(`/playerStats/${player}`, function(response){
    //         console.log(JSON.parse(response))
    //         // render.renderStats(JSON.parse(response))
    //     })
    // }
} 

