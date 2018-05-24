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
        let permutationB = permute(b);
        for(let elementB of permutationB){
          output = [];
          for(let idx =0; idx<elementB.length;idx++){
            if(a[idx].toString()> elementB[idx].toString()){
              output.push(a[idx].toString()+", "+elementB[idx].toString())
            }else{
              output.push(elementB[idx].toString()+", "+a[idx].toString())
            }
          }
          output.sort();
          possibilities.add(output.join('; '));
        }

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

  function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

console.log(permute([1, 2, 3]));

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
