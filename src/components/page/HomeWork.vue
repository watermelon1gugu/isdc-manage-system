<template>
    <div id="app">
        <el-button type="primary" icon="time" @click="getData()">刷新</el-button>
        <label>
            <select v-model="selected" @change="onSelectedDrug($event, item)">
                <option v-for="item in times" v-bind:value="item.value">{{item.code}}</option>
            </select>
        </label>
        <el-table stripe :data="showitem" height="600" border style="width: 100%">
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="number" label="文件数">
            </el-table-column>
            <el-table-column
                label="下载" width="180">
                <template scope="scope">
                    <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)">下载
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                url: '/api/file/getFileList',
                times: [],
                filedata: {},
                showitem: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                let context = this;
                context.$http.get(context.url).then((res) => {
                    let data = JSON.parse(res.body.data);
                    this.filedata = JSON.parse(res.body.data);
                    context.times.length = 0;
                    for (var i in data) {
                        let temp = {};
                        temp.value = data[i].name;
                        temp.code = '第' + temp.value + '次作业';
                        context.times.push(temp);
                    }
                });
            },
            onSelectedDrug($event, item) {
                let temp = {};
                this.showitem.length = 0;
                for (var i in this.filedata) {
                    if (this.filedata[i].name === this.selected) {
                        temp = this.filedata[i].files;
                        break;
                    }
                }
                for (var i in temp) {
                    let temps = {};
                    temps.email = temp[i].name;
                    temps.number = temp[i].files.length;
                    this.showitem.push(temps);
                }
            },
            handleEdit(index, row) {
                console.log(index);
                let context = this;

                let times = context.selected;
                let email = context.showitem[index].email;

                this.$http.post('/api/file/download', {
                    times: times,
                    email: email
                }, {
                    responseType: 'arraybuffer'
                }).then(function (res) {
                    let content = new Blob([res.body]);
                    let urlObject = window.URL || window.webkitURL || window;
                    let url = urlObject.createObjectURL(content);
                    let el = document.createElement('a');
                    el.href = url;
                    el.download = email + '.zip';
                    el.click();
                    urlObject.revokeObjectURL(url);
                }, function (res) {
                    alert(res.status)
                });

            },
        }
    }
</script>

<style scoped>

</style>
