<template>
    <footer class="app_footer">

        <!-- 其它 -->
        <div class="extra">
                <!-- 版权信息 -->
                <div class="copyright">
                    <p>
                        <a href="javascript:;">关于我们</a>
                        <a href="javascript:;">帮助中心</a>
                        <a href="javascript:;">友情链接</a>
                    </p>
                    <p>CopyRight © 许影杰</p>
                </div>
        </div>
    </footer>
</template>

<style scoped lang='scss'>
.app_footer {
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;
    .extra {
        background-color: #333;
    }

    
    .copyright {
        height: 170px;
        padding-top: 40px;
        text-align: center;
        color: #999;
        font-size: 15px;

        p {
            line-height: 1;
            margin-bottom: 20px;
        }

        a {
            color: #999;
            line-height: 1;
            padding: 0 10px;
            border-right: 1px solid #999;

            &:last-child {
                border-right: none;
            }
        }
    }
}
</style>