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
});

function checkOrRemoveCheckAll($checkAll) {
    var $checkBox = $('.checkbox-input');
    var $checkBoxIsClick = $('.checkbox-input:checked');
    var checkedValue = $checkBoxIsClick.length === $checkBox.length;
    $checkAll.prop('checked', checkedValue);
}
