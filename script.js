function init(){
  var chromosomeNum = 3;

  var display = d3.select('#display').append('ol')
    .selectAll('li')
    .attr('class','list-group col-md-4')
    .style('list-style','decimal inside !important');
  var inputs = d3.select('#chromosomes-inputs').selectAll('.input-group')
  for( let i = 0; i<chromosomeNum;i++){
    inputs.append('input')
      .attr('type', 'text')
      .attr('class', 'col-sm-2');
  }
  var compute = d3.select('#compute');
  compute.on('click', calculate_and_display);
  var searchInput = d3.select('#search-input');
  searchInput.on('keyup', filter);

  function filter(){
    let value = searchInput.value;
  }

  function calculate_and_display(){
    let leftVal = d3.select('.chromosomes-input-left').selectAll('input')
      .nodes().map(d => d.value);
    let rightVal = d3.select('.chromosomes-input-right').selectAll('input')
    .nodes().map(d => d.value);
    leftVal = combinations(leftVal, 3);
    rightVal = combinations(rightVal, 3);

    let possibilities = new Set();
    for(let a of leftVal){
      for(let b of rightVal){
        output = [];
        for(let elementA of a){
          for(let elementB of b){
            if(elementA.toString()> elementB.toString()){
              output.push(elementA.toString()+", "+elementB.toString())
            }else{
              output.push(elementB.toString()+", "+elementA.toString())
            }
          }
        }
        output.sort();
        possibilities.add(output.join('; '));
      }
    }
    // display.selectAll("*").remove();
    // values = combinations(possibilities,3);
    // toploop: for(let i = values.length-1; i>=0; i--){
    //   let copies = new Set();
    //   for(let pair of values[i]){
    //     if(copies.has(pair[0])){
    //       values.splice(i,1);
    //       continue toploop;
    //     }
    //     copies.add(pair[0]);
    //     if(copies.has(pair[1])){
    //       values.splice(i,1);
    //       continue toploop;
    //     }
    //     copies.add(pair[1]);
    //   }
    // }
    // let reduced = new Set(values);
    let newLists = display.data([...possibilities]).enter().append("li");
    display.exit().remove();
    display = newLists.merge(display);
display.text(d=>d)
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
