class Renderer {
    renderTeam(team){
        $("#display-team").empty()
        let source = $("#team-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template(team)
        $("#display-team").append(newHTML)
    }
}