d3.csv('pokemon.csv', function(d) {
  return {
    Number: +d.Number,
    Legend: d.Legend,
    Mega: d.Mega,
    Name: d.Name,
    Type1: d.Type1,
    Type2: d.Type2,
    Total: +d.Total,
    HP: +d.HP,
    Attack: +d.Attack,
    Defense: +d.Defense,
    SpAtk: +d.SpAtk,
    SpDef: +d.SpDef,
    Speed: +d.Speed,
    Height: +d.Height,
    Weight: +d.Weight,
    BMI: +d.BMI,
    Generation: +d.Generation
  }
}).then(data => {
  const pokemonGen1 = []
  
  data.map(pokemon => {
    if(pokemon.Generation === 1){
      pokemonGen1.push(pokemon)
    }
  })
  console.log(pokemonGen1)

  const colorScale = d3.scaleLinear()
    .domain([0, 85])
    .range(['red', 'green'])
  
  const svg = d3.select('.container').append('svg')
                .attr('width', 1240)
                .attr('height', 240)
                .style('background', 'azure')
  
  svg.selectAll('rect')
    .data(pokemonGen1)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 10
    })
    .attr('y', d => {
      return 240 - d.HP
    })
    .transition()
    .duration(50)
    .delay((d, i) => {
      return i * 50
    })
    .attr('width', 10)
    .attr('height', d => {
      return d.HP
    })
    .attr('fill', d => {
      return colorScale(d.HP)
    })
})
