<template>
    <div class="header">
        <div class="logo">ISDC后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{user.userName}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                url: '/api/user/auth',
                user: {}
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                let self = this;
                self.$http.get(self.url).then((res) => {
                    res.json().then(data => {
                        if (data.code === 200 && data.data.root) {
                            self.user = data.data;
                        } else {
                            self.user = data.data;  /*window.location.href = 'https://www.scuisdc.org';*/
                        }
                    });
                }).catch(() => {
                    /*window.location.href = 'https://www.scuisdc.org'*/
                });
            },
            handleCommand(command) {
                if (command === 'loginout') {
                    window.location.href = '/';
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }

    .header .logo {
        float: left;
        width: 250px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

</style>
