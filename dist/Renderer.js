class Renderer {
    renderTeam(team){
        $("#display-team").empty()
        let source = $("#team-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template(team)
        $("#display-team").append(newHTML)
        // $("img").on("click", function(){
        //     let inp = $(this).attr("src").split('/')
        //     let input = `${inp[inp.length-2]} ${inp[inp.length-1]}`
        //     fetch.fetchPlayerStats(input)
        // })
    }
    // renderStats(stats){
    //     let source = $("#stats-template").html();
    //     let template = Handlebars.compile(source);
    //     let newHTML = template(stats)
    //     $(".image-container").append(newHTML);
    // }
}