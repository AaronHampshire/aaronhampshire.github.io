var data, actualStuff, skills, svg, texty, percent;

var margin = {top: 50, right: 20, bottom: 20, left: 20};
    width = 200 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2,
    TAU = Math.PI * 2;
    
var overallarc = d3.svg.arc()
    .endAngle(function(d) {  return 2*Math.PI; })
    .startAngle(0)
    .outerRadius(radius - 5)
    .innerRadius(radius - 35);
    
var arc = d3.svg.arc()
        .startAngle(0)
        .outerRadius(radius - 10)
        .innerRadius(radius - 30)
        .endAngle(function(d) {return d;});
        
 var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });
            
d3.json("resrc/proficiency.json", function(error, json) {
    if (error) return console.warn(error);
        data = json;
        
    svg = d3.select('.charts').selectAll('div').data(data[data.length - 1].Technologies).enter().append('div')
            .attr('class', 'skill-chart')
        .append('svg')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);
            
    skills = svg
        .append('g')
            .attr('transform', 'translate(' + (margin.left + radius) + ',' + (margin.top + radius) + ')')
            .attr("class", "arc");
    
    skills.append("path")
        .attr("d", overallarc)
        .style("fill", "#5A6796");
            
    actualStuff = skills.append("path")
        .datum(function(d) {return  [d.Proficiency/100 * TAU];})
        .attr("d", arc)
            .style("fill", function(d) { return '#F75D4D'; })
            .each(function(d) { this._current = d; });

    percent = skills.append("text")
        .text(function(d) { return d.Proficiency + '%';})
        .attr('class', 'percent-label')
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle");
        
    texty = svg.append("text")
        .text(function(d, i) { return d.Skill;})
        .attr('class', 'skill-header')
        .attr('transform', 'translate (0,30)');
});
    
function updateSkills (date) {
    d3.json("resrc/proficiency.json", function(error, json) {
        if (error) return console.warn(error);
        
        var arc = d3.svg.arc()
            .endAngle(function(d) { return 2*Math.PI*d/100; })
            .startAngle(0)
            .outerRadius(radius - 10)
            .innerRadius(radius - 30);
        
        for (var i = 0, numProficiencies = json.length; i < numProficiencies; i++) {
            if (json[i].Date == date)
                data = json[i];
        }
        
        svg = d3.selectAll('.skill-chart');
    
        actualStuff.each(function(d) {})
    
        actualStuff.data(data.Technologies)
            .datum(function(d) {return [(d.Proficiency * TAU / 100)];}).transition().duration(1000).attrTween("d", arcTween);
            
        percent.data(data.Technologies).transition().duration(5000).text(function(d) { return d.Proficiency + '%';});

    });
    
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = a;
        return function (t) {
            return arc(i(t));
        }
    }
}
   
  
$(".update").click(function () {
    updateSkills($( this ).attr("data"));
})
    
