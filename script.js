function init(){
  var chromosomeNum = 3;

  var display = d3.select('#display').append('ol').selectAll('li');
  var inputs = d3.select('#chromosomes-inputs').selectAll('.input-group')
  for( let i = 0; i<chromosomeNum;i++){
    inputs.append('input')
      .attr('type', 'text')
      .attr('class', 'col-sm-2');
  }
  var compute = d3.select('#compute');
  compute.on('click', calculate_and_display);
  function calculate_and_display(){
    let leftVal = d3.select('.chromosomes-input-left').selectAll('input')
      .nodes().map(d => d.value);
    let rightVal = d3.select('.chromosomes-input-right').selectAll('input')
    .nodes().map(d => d.value);
    let possibilities = [];
    for(let a of leftVal){
      for(let b of rightVal){
        let output = "";
        if (a.toString()+", "+b.toString()){
          output += a.toString()+", "+b.toString();
        }else {
          output += b.toString()+", "+a.toString();
        }
        possibilities.push(output);
      }
    }
    // display.selectAll("*").remove();
    values = combinations(possibilities,3);
    let newLists = display.data(values).enter().append("li");
    display.exit().remove();
    display = newLists.merge(display);
display.text(d=>d.join('; '))
  }

  function combinations(arr, k){
      var i,
      subI,
      ret = [],
      sub,
      next;
      for(i = 0; i < arr.length; i++){
          if(k === 1){
              ret.push( [ arr[i] ] );
          }else{
              sub = combinations(arr.slice(i+1, arr.length), k-1);
              for(subI = 0; subI < sub.length; subI++ ){
                  next = sub[subI];
                  next.unshift(arr[i]);
                  ret.push( next );
              }
          }
      }
      return ret;
  }
}

init()
