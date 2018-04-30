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
    if(pokemon.Generation === 1 && pokemon.Number <= 34){
      pokemonGen1.push(pokemon)
    }
  })
  console.log(pokemonGen1)

  const colorScale = d3.scaleLinear()
    .domain([0, 130])
    .range(['red', 'blue'])
  
  const svg = d3.select('.container').append('svg')
                .attr('width', 1400)
                .attr('height', 500)
                .style('background', 'azure')
  
  svg.selectAll('rect')
    .data(pokemonGen1)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 40
    })
    .attr('y', d => {
      return 400 - d.Attack * 3
    })
    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', 'pink')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d.Attack))
    })
    .transition()
    .duration(100)
    .delay((d, i) => {
      return i * 100
    })
    .attr('width', 35)
    .attr('height', d => {
      return d.Attack * 3
    })
    .attr('fill', d => {
      return colorScale(d.Attack)
    })

  
  svg.selectAll('name')
    .data(pokemonGen1)
    .enter()
    .append('text')
    .attr('class', 'name')
    .transition()
    .duration(100)
    .delay((d, i) => {
      return i * 100
    })
    .text(d => {
      return d.Name
    })
    .attr('transform', (d,i) => {
      return `translate(${i * 40 + 10}, ${415}) rotate (45)`
    })

  svg.selectAll('attack')
    .data(pokemonGen1)
    .enter()
    .append('text')
    .attr('class', 'attack')
    .transition()
    .duration(100)
    .delay((d, i) => {
      return i * 100
    })
    .text(d => {
      return d.Attack
    })
    .attr('transform', (d,i) => {
      return `translate(${i * 40 + 7}, ${400 - d.Attack*3 - 5})`
    })
})
