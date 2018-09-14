<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item>面试管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="time" @click="getData()">刷新</el-button>
        </div>
        <el-table stripe :data="tableData" height="600" border style="width: 100%">
            <el-table-column prop="stuId" label="学号">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="tel" label="手机号码">
            </el-table-column>
            <el-table-column label="民族">
                <template scope="scope">
                    {{scope.row.nationality === 'chinese' ? '汉族' : scope.row.nationality === 'huihui' ? '回族' : '其他'}}
                </template>
            </el-table-column>
            <el-table-column label="面试时间">
                <template scope="scope">
                    {{new Date(scope.row.interview).getMonth() + '/' + new Date(scope.row.interview).getDate() + ' ' + new Date(scope.row.interview).getHours() + ':' + new Date(scope.row.interview).getMinutes()}}
                </template>
            </el-table-column>
            <el-table-column prop="impressionScore" sortable label="印象分">
                <template scope="scope">
                    {{scope.row.impressionScore}}
                </template>
            </el-table-column>
            <el-table-column prop="techScore" sortable label="技术分">
                <template scope="scope">
                    {{scope.row.techScore}}
                </template>
            </el-table-column>
            <el-table-column prop="integratedScore" sortable label="综合分">
                <template scope="scope">
                    {{scope.row.integratedScore}}
                </template>
            </el-table-column>
            <el-table-column label="加权总分">
                <template scope="scope">
                    {{scope.row.integratedScore * 0.5 + scope.row.techScore * 0.2 + scope.row.impressionScore * 0.3}}
                </template>
            </el-table-column>
            <el-table-column prop="block" sortable label="黑名单">
                <template scope="scope">
                    <el-tag :type="scope.row.block?'danger':'gray'">{{scope.row.block ? '是' : '否'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="pass" sortable label="钦点">
                <template scope="scope">
                    <el-tag :type="scope.row.pass?'success':'gray'">{{scope.row.pass ? '是' : '否'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" icon="edit"
                               @click="handleEdit(scope.$index, scope.row)">面试
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="form.name" :model="form" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="自我介绍" :label-width="formLabelWidth">
                    {{form.introduce}}
                </el-form-item>
                <el-form-item label="自我描述" :label-width="formLabelWidth">
                    {{form.description}}
                </el-form-item>
                <el-form-item label="印象分" :label-width="formLabelWidth">
                    <el-input v-model="form.impressionScore"></el-input>
                </el-form-item>
                <el-form-item label="技术分" :label-width="formLabelWidth">
                    <el-input v-model="form.techScore"></el-input>
                </el-form-item>
                <el-form-item label="综合分" :label-width="formLabelWidth">
                    <el-input v-model="form.integratedScore"></el-input>
                </el-form-item>
                <el-form-item label="面试评语" :label-width="formLabelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.judge"></el-input>
                </el-form-item>
                <el-form-item label="黑名单" :label-width="formLabelWidth">
                    <el-switch
                        v-model="form.block"
                        on-color="#13ce66"
                        off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="钦点" :label-width="formLabelWidth">
                    <el-switch
                        v-model="form.pass"
                        on-color="#13ce66"
                        off-color="#ff4949"></el-switch>
                </el-form-item>
                <el-form-item label="理由描述" :label-width="formLabelWidth">
                    <el-input v-model="form.reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
                url: '/api/join/form',
                tableData: [],
                dialogFormVisible: false,
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
                this.dialogFormVisible = true;
            },
            updateDevice(form) {
                this.$http.put('/api/join/form', form).then((res) => {
                    Vue.set(this.tableData, this.editing, form);
                    this.dialogFormVisible = false;
                    this.$message.success('更新成功');
                }, err => this.$message.error('更新出错'));
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>
