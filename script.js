$(document).ready(function(){
  var check_count = 0,
      total = 0;
  
  //Custom Functions
  function updateText(){
    $('#count').text(total);
    $('#count_done').text(check_count);
    $('#remaining_done').text(total-check_count);
  }
  function showDate(){
    var suffix = "", date = new Date(), dayOfMonth = date.getDate(), dayOfWeek = date.getDay(), Month = date.getMonth(),
        $today =  $('#today'),
        $daymonth =  $('#daymonth'),
        $month =  $('#month');

    var dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthArray = ["January","February","March","April,","May","June","July","August","September","October","November","December"];
    
    switch(dayOfMonth) {
        case 1: case 21: case 31: suffix = 'st'; break;
        case 2: case 22:          suffix = 'nd'; break;
        case 3: case 23:          suffix = 'rd'; break;
        default:                  suffix = 'th';
    }
    
    $today.text(dayArray[dayOfWeek] + ",");
    $daymonth.text(" " + dayOfMonth + suffix);
    $month.text(monthArray[Month]);
  }
  // Get the total number of "li's" and checked "li's"  
  function loadLi(){
    var findTheMarkedList = $('ul li');
    for (var i = 0; i < findTheMarkedList.length; i++)
    {
      total++;
      if ($(findTheMarkedList[i]).find('i').hasClass('fa-check-circle mark'))
      {
        $('li .right').eq(i).find('p').addClass('line-through').attr("contentEditable", false);
        check_count++;
      }
    }
    updateText();
  }
  
  $('ul li').each(function(j){
      var $this = $(this);
      $('.bottom').addClass('show');
      setTimeout(function () {
        $this.addClass('down_in').removeClass('lihiden');
         setTimeout(function () {
            $this.removeAttr('class');
         }, 550);
      }, 60 * j );
    });
  
  // Click on button function add new item to list
  var li = "<li><a href='' class='check_button' onmousedown='return false'><i class='fa fa-circle-thin' aria-hidden='true'></i></a><div class='right'><p contenteditable='true'><strong></strong></p></div><span class='delete_button' onmousedown='return false'><i class='fa fa-times-circle' aria-hidden='true'></i></span></li>";
  
  $('.bottom #add-new').click(function(e){
    e.preventDefault();
    
    $('ul').append(li).find('li:last-child').addClass('down');
    
    total += 1;
    $('li:last-child p').text('New Task');

    updateText();
  });
  // Click on button function list
  $('.app ul').on('click','li .check_button',function(e){
    e.preventDefault();
    
    let button = $(this).find('i');
    let checked = 'fa fa-check-circle mark';
    let unchecked = 'fa fa-circle-thin';
    
    // Save the current index of button after the click event in the "left" div.
    let index_click = $('li .check_button').index(this);
    // Use the current index of button to target the correct "li p" in the "right" div.
    let linethrough_text = $('li .right').eq(index_click).find('p');
    
    if(button.hasClass(unchecked))
    {
      linethrough_text.addClass('line-through').attr("contentEditable", false);
      button.removeClass(unchecked + ' mark-alt').addClass('pop_in').addClass(checked);
      check_count += 1;
    }
    else
    {    
      linethrough_text.removeClass('line-through').attr('contentEditable', true);
      button.removeClass(checked).removeClass('pop_in').addClass(unchecked + ' mark-alt');
      check_count -= 1;
    }
    
    updateText();
  });
  // Click on button function and delete 'li'
  $('.app ul').on('click','li .delete_button',function(e){
    e.preventDefault();
    let index_click = $('li .delete_button').index(this);
    let current = $('li').eq(index_click);
    let button = $('.check_button').find('i');
    
    $(this).prop("disabled", true);
    total -= 1;
    
    if(button.eq(index_click).hasClass('mark'))
    {
      check_count -= 1;
    }
    
    current.addClass('up');
    setTimeout(function () 
    {
      current.remove();  
    }, 560); 
    
    $('#undo').removeClass('pop_out').addClass('pop_in').prop('disabled', false);
    
    updateText();
  });
  
  showDate();
  loadLi();
});