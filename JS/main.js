;(function(){
  'use strict';

  var task_list, last_id;
  init_data();

  function init_data(){
    var task_list = S.get('task_list');
    var last_id = S.get('last_id');
    if(!task_list){
      task_list = [];
      S.set('task_list', task_list);
    }
    if (!last_id) {
      last_id = 0;
      S.set('last_id', last_id);
    }
  }

  // function add(task) {
  //   S.set('task_list', task);
  // }

  // add({
  //   title: 'yo',
  //   completed: false,
  // })

  // console.log('s:  ',S.get('task_list'));
})();