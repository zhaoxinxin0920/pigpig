//入口函数
$(function() {
    // alert('ok')
    //单击去注册添加事件
    $('#link_reg,#link_login').on('click', function() {
        // 添加元素显示和隐藏
        $('.login-box,.reg-box').toggle();
    });
    //自定义验证
    // var form = layui.form;
    //通过form.verify函数自定义验证
    layui.form.verify({
            pwd: [/^[\S]{6,12}$/, ],
            repwd: function(value, item) {
                // console.log(value, item);
                var pwdipt = $('.reg-box [name=password]').val()
                if (pwdipt !== value) {
                    return ('两次密码不一致')
                }
            }
        })
        //注册功能
    $('#form_reg').submit(function(e) {
            //阻止默认行为
            e.preventDefault(e)
                //获得表单数据
            var data = {
                    username: $('.reg-box [name=username]').val().trim(),
                    password: $('.reg-box [name=password]').val().trim()
                }
                // 发送ajax请求
            $.ajax({
                method: 'post',
                url: "/api/reguser",
                data: data,
                success: function(res) {
                    if (res.status !== 0) {
                        // return alert('注册失败')
                        // console.log(res);
                        return layui.layer.msg(es.message, { icon: 5 })
                    }
                    layui.layer.msg('注册成功', { icon: 6 }, function() {
                        $('#link_login').click();
                    })
                }
            })
        })
        //登陆功能
        //添加submit点击事件
    $('#form_login').on('submit', function(e) {
        //阻止默认提交事件
        e.preventDefault()
            //收集表单数据
        var data = $(this).serialize()
            //发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                })
            }
        })


    })
})