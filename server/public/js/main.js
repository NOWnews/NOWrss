$(function() {

    // 分類的全選/全不選
    var $checkAll = $('.checkAll');
    checkOrRemoveCheckAll($checkAll);
    $checkAll.change(function() {
        var checkboxes = $(this).closest('label').closest('.checkbox').closest('.form-group').find('.checkbox .checkbox-input');
        checkboxes.prop('checked', $(this).is(':checked'));
    });
    $('.checkbox-input').change(function() {
        checkOrRemoveCheckAll($checkAll);
    });

    // remove rss
    $('.remove-btn').on('click', function() {
        event.preventDefault();
        var sn = $(this).attr('item-sn');
        var url = $(this).attr('page-route');
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(data, err) {
                if (data.trashed) {
                    location.reload();
                } else {
                    swal({
                        title: '資料有誤 請重新整理！!',
                        type: 'error'
                    });
                }
            }
        });
    });
});

function checkOrRemoveCheckAll($checkAll) {
    var $checkBox = $('.checkbox-input');
    var $checkBoxIsClick = $('.checkbox-input:checked');
    var checkedValue = $checkBoxIsClick.length === $checkBox.length;
    $checkAll.prop('checked', checkedValue);
}
