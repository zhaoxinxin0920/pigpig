//入口函数
$(function() {
    // alert('ok')
    getUserInfo()
        //退出按钮
        //绑定点击事件2
    $('#logout').on('click', function() {
            //弹出提示框
            layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //删除本地的token
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            })
        })
        // 封装一个获取服务器地址的函数
    function getUserInfo() {
        // 发送ajaxing求
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // headers: { Authorization: localStorage.getItem('token') },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 调用renderAvater渲染
                renderAvatar(res.data)
            }
        })
    }

    function renderAvatar(user) {
        var name = user.nickname || user.username
            //渲染欢迎语
        $('#welcome').html('欢迎' + name)
            // 渲染头像
        if (user.user_pic !== null) {
            //渲染图片头像隐藏文字头像
            $('.layui-nav-img').attr('scr', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            //渲染文字头像,隐藏图片头像
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
    }


})