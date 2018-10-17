<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item>CTF题目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="time" @click="getData()">刷新</el-button>
            <el-button type="primary" icon="edit" @click="addData()">添加</el-button>

        </div>

        <img src="../../../static/img/img.jpg"/>

        <el-table stripe :data="tableData" height="600" border style="width: 100%">
            <el-table-column prop="id" label="题目编号">
            </el-table-column>
            <el-table-column prop="title" label="题目名称">
            </el-table-column>
            <el-table-column prop="data" label="题目内容">
            </el-table-column>


            <el-table-column prop="time" sortable label="发布时间">

            </el-table-column>
            <el-table-column prop="userName" sortable label="发布人">

            </el-table-column>
            <el-table-column prop="magnet" label="题目链接">
            </el-table-column>
            <el-table-column
                label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" icon="edit"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" icon="close"
                               @click="delDevice(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog id="putDialog" title="添加题目" :model="form" :visible.sync="putDialogFormVisible">
            <!--绑定自定义属性form-->
            <el-form>
                <el-form-item label="题目名称" :label-width="formLabelWidth">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="题目内容" :label-width="formLabelWidth">
                    <el-input v-model="form.data"></el-input>
                </el-form-item>
                <el-form-item label="题目链接" :label-width="formLabelWidth">
                    <el-input v-model="form.magnet"></el-input>
                </el-form-item>
                <el-form-item label="flag" :label-width="formLabelWidth">
                    <el-input v-model="form.flag"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="putDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="putDevice(form)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog id="updateDialog" :title="form.title" :model="form" :visible.sync="updateDialogFormVisible">
            <!--绑定自定义属性form-->
            <el-form>
                <el-form-item label="题目名称" :label-width="formLabelWidth">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="题目内容" :label-width="formLabelWidth">
                    <el-input v-model="form.data"></el-input>
                </el-form-item>
                <el-form-item label="题目链接" :label-width="formLabelWidth">
                    <el-input v-model="form.magnet"></el-input>
                </el-form-item>
                <el-form-item label="flag" :label-width="formLabelWidth">
                    <el-input v-model="form.flag"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDevice(form)">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                url: '/api/ctf/form',
                tableData: [],
                updateDialogFormVisible: false,
                putDialogFormVisible: false,
                formLabelWidth: '120px',
                form: {},
                editing: 0
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                let self = this;
                self.$http.get(self.url).then((res) => {
                    res.json().then(data => self.tableData = data.data);
                });
            },
            handleEdit(index, row) {
                this.editing = index;
                this.form = JSON.parse(JSON.stringify(this.tableData[index]));
                this.updateDialogFormVisible = true;
            }, addData() {
                this.form = {
                    title: '',
                    data: '',
                    magnet: '',
                    flag: ''
                };
                // this.form = JSON.parse(JSON.stringify(this.tableData[0]));
                this.putDialogFormVisible = true;
            },
            updateDevice(form) {
                this.$http.post(this.url, form).then(res => res.json().then((data) => {
                    if (data.code == 200) {
                        this.getData();
                        this.updateDialogFormVisible = false;
                        this.$message.success('更新成功');
                    }
                    else {
                        this.$message.error('更新失败');
                    }

                }), err => this.$message.error('更新出错'));
            }, putDevice(form) {
                this.$http.put(this.url, form).then((form) => form.json().then((data) => {
                    if (data.code == 200) {
                        this.putDialogFormVisible = false;
                        this.$message.success('添加成功');
                        /*   Vue.set(this.tableData,this.editing,form);*/
                        this.getData();
                    }
                    else {
                        this.$message.error('添加出错');
                    }
                }), err => this.$message.error('添加出错'));
            }, delDevice(index, row) {

                var con = confirm("确定删除题目:\"" + this.tableData[index].title + "\"吗?");
                if (con == true) {
                    this.form = JSON.parse(JSON.stringify(this.tableData[index]));
                    //alert(this.form.userName);
                    this.$http.delete(this.url+"/"+this.tableData[index].id).then(form => form.json().then(data => {
                        if (data.code == 200) {
                            this.$message.success('删除成功');
                            this.getData();
                        }
                        else {
                            this.$message.error('删除失败');
                        }
                    }), err => this.$message.error('删除出错'));

                }
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>
