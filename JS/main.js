;(function(){
  'use strict';

  var task_list, last_id;
  init_data();

  function init_data(){
    task_list = S.get('task_list');
    last_id = S.get('last_id');
    if(!task_list){
      task_list = [];
      S.set('task_list', task_list);
    }
    if (!last_id) {
      last_id = 0;
      S.set('last_id', last_id);
    }
  }

  function add(title, completed){
    completed = completed || false;
    var new_item = {
      id: S.get('last_id') + 1,
      title: title,
      completed: completed,
    }
    task_list.push(new_item);
    inc();
    sync();

  }

  // add('hi');

  // add('hello');

  // function del(id){
  //   task_list.forEach(function(e, index){
  //     if(e.id == id){
  //       task_list.splice(index,1);
  //     }
  //   })
  //   sync();
  // }

  function find_index(id){
    return task_list.findIndex(function(e){
      if(e.id == id)
        return true;
    })
  }

  function del(id){
    var index = find_index(id);
    if(index != -1){
      task_list.splice(index, 1);
      sync();
    }
  }

  function inc(){
    var last_id = S.get('last_id');
    return S.set('last_id', last_id + 1);
  }

  function sync(){
    S.set('task_list',task_list);
  }


  function render() {
    var card_list = document.getElementById('list');
    card_list.innerHTML = '';

    for(var i=0; i<task_list.length; i++){
      var card = document.createElement('div');
      card.innerHTML=`
      <input type="checkbox">
      <span>${task_list[i].title}</span>
      <button>×</button>
      `;
      console.log(card);
      card_list.appendChild(card);
    }
  }

  function init(){
    render();
  }

  init();
})();