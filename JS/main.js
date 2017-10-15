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

  function inc(){
    var last_id = S.get('last_id');
    return S.set('last_id', last_id + 1);
  }

  function sync(){
    S.set('task_list',task_list);
  }

  console.log(S.get('task_list'));
})();