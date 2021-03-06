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

/*
  function del(id){
    task_list.forEach(function(e, index){
      if(e.id == id){
        task_list.splice(index,1);
      }
    })
    sync();
  }
  */

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
    var checked_list = document.getElementById('checked');
    card_list.innerHTML = '';
    checked_list.innerHTML = '';

    for(var i = task_list.length - 1; i >= 0; i--){
      var card = document.createElement('div');

      card.setAttribute('class','list-item');

      if(task_list[i].completed){
        card.innerHTML = `
        <input checked="checked" id="checkItem${task_list[i].id}" type="checkbox">
        <label for="checkItem${task_list[i].id}" class="checkedBtn"></label>
        <input type="text" readonly="readonly" id="titleContent${task_list[i].id}" class="checked_title text_box" value = "${task_list[i].title}">
        <button class="del_btn" id="btn${task_list[i].id}">×</button>
        `;
        checked_list.appendChild(card);
        continue;
      }
      card.innerHTML=`
      <input id="checkItem${task_list[i].id}" type="checkbox">
      <label for="checkItem${task_list[i].id}" class="checkedBtn"></label>
      <input id="titleContent${task_list[i].id}" class="text_box" value = "${task_list[i].title}">
      <button class="del_btn" id="btn${task_list[i].id}">×</button>
      `;
      card_list.appendChild(card);

    }
    delBtn();
    checkBtn();
    inputContent();
  }

  function addBtn(){
    var form = document.getElementById('add_bar');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var input = document.getElementById('add_bar_content');
      if(!input.value){
        alert('请输入内容！');
      }else{
        add(input.value);
        render();
        input.value = '';
      }
    })
  }

  function delBtn(){
    for(var i=0; i<task_list.length; i++){
      var item = document.getElementById('btn'+task_list[i].id);
      item.addEventListener('click',function(){
          del(this.id.substring(3));
          sync();
          render();
      })
    }
  }


  function update(id, title) {
    var task_index = find_index(id);
    if (task_index === -1) return;

    var task = task_list[task_index];
    task.title = title;

    sync();
  }


  function changeCheck(id){
    task_list.forEach(function(e, index){
      if(e.id == id){
        e.completed = (!e.completed);
        if(e.completed == true){
          var str = task_list.splice(index, 1)
          task_list = task_list.concat(str);
        }else{
          var str = task_list.splice(index, 1)
          task_list = task_list.concat(str);
        }
      }
      sync();
    });
  }

  function checkBtn(){
    for(var i=0; i<task_list.length; i++){
      var item = document.getElementById('checkItem'+task_list[i].id);
      item.addEventListener('click',function(){
          changeCheck(this.id.substring(9));
          render();
      })
    }
  }

  function inputContent(){
    for(var i=0; i<task_list.length; i++){
      var item = document.getElementById('titleContent'+task_list[i].id);
      item.addEventListener('keydown',handler);
      function handler(e){
        if (e.keyCode == 13) {
          var val = document.getElementById('titleContent'+this.id.substring(12)).value;
          var id = this.id.substring(12);
          if(val == ''){
            del(this.id.substring(12));
          }else{
            update(id,val);
          }
          render();
        }
      }
      item.addEventListener('blur',function(){
        var val = document.getElementById('titleContent'+this.id.substring(12)).value;
        var id = this.id.substring(12);
        if(val == ''){
          del(this.id.substring(12));
        }else{
          update(id,val);
        }
        render();
      })
    }
  }

  function init(){
    render();
    addBtn();
  }

  init();
})();