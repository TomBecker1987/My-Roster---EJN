let render = new Renderer()
let fetch = new Fetcher()

$("button").on("click", function(){
    let input = $(this).closest("div").find("input").val()
    fetch.fetchTeamData(input)
    $(this).closest("div").find("input").val('')
})