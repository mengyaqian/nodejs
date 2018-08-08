
//列表
function getList(){
    api('product/carList',{},'post').then(function(res) {
        if(res.stateCode == 200){
            var htmls = '';
            res.data.forEach(element => {
               htmls +='<tr id="'+element.id+'">'
                      +'<td>'+element.id+'</td>'
                      +'<td>'+element.name+'</td>'
                      +'<td>'+element.price+'</td>'
                      +'<td>'+element.num+'</td>'
                      +'<td>'+element.remark+'</td>'
					  +'<td><button type="button" id="edit" class="btn btn-primary">编辑</button><button type="button" id="delete" class="btn btn-danger">删除</button></td>'
                      +'</tr>'
            });
           
             document.getElementById('js_product').innerHTML=htmls;
        }else{
            alert(res)
        }
    })
}
//新建和编辑校验
function check(){
    var _name = $.trim($('#name').val());
    var _price = $.trim($('#price').val()); 
    var _num = $.trim($('#num').val());
	var _remark = $.trim($('#remark').val());
	var carId = $('#carId').val();
    if(_name == '' || _price=='' || _num== ''){
		alert('请把信息填写完整')
    }else{
		var pdata = {name:_name,price:_price,num:_num,remark:_remark};
		if(carId != '-1'){
			pdata.id = carId;
		}
		api('product/addCar',pdata,'post').then(function(res) {
			if(res.stateCode==200){
				$('#add').modal('toggle');
				$('#name').val('');$('#price').val('');$('#num').val('');$('#remark').val('');
				getList();
			}
		})
	}
}
//新增显示弹框
$('#add-btn').click(function(){
	$('#carId').val('-1');
    $('#add').modal();
})
//编辑弹框
$('#js_product').on('click','#edit',function(){
	var _id = $(this).parent().parent('tr').attr('id');
	api('product/searchCar',{id:_id},'post').then(function(res){
		if(res.stateCode == 200){
			var d = res.data[0];
			$('#add').modal();
			$('#carId').val(_id);$('#name').val(d.name);$('#price').val(d.price);$('#num').val(d.num);$('#remark').val(d.remark);
		}
	})
})
//删除弹框
$('#js_product').on('click','#delete',function(){
	var _id = $(this).parent().parent('tr').attr('id');
	api('product/deleteCar',{id:_id},'post').then(function(res){
		if(res.stateCode == 200){
			alert(res.msg);
			getList();
		}
	})
})
$('#save').click(function () {
  check();
})

getList();
