<template>
    <div class="editor">
        <TinymceEditor v-model="myValue" :init="completeSetting" :disabled="disabled" />
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/searchreplace'
import OssFileAPI from '@/api/modules/oss-file'
import { ossClient } from '@/utils/ali_oss.js'

export default {
    name: 'Editor',
    components: {
        TinymceEditor
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        setting: {
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            defaultSetting: {
                language_url: '/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/tinymce/skins/ui/oxide',
                min_height: 250,
                max_height: 600,
                selector: 'textarea',
                plugins: 'autolink autoresize contextmenu fullscreen hr image imagetools insertdatetime link lists media preview table textcolor wordcount code searchreplace',
                toolbar: 'undo redo | formatselect | bold italic strikethrough forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | hr link image media table insertdatetime searchreplace removeformat | preview code fullscreen',
                branding: false,
                menubar: false,
                file_picker_types: 'media',
                file_picker_callback: (callback, value, meta)=> {
                    if (meta.filetype == 'media') {
                        let input = document.createElement('input');//创建一个隐藏的input
                        input.setAttribute('type', 'file');
                        let that = this;
                        input.onchange = function() {
                            let file = this.files[0];//选取第一个文件
                            let _url = that.uploadVideo(file, callback); // 上传视频拿到url
                        }
                        //触发点击
                        input.click();
                    }
                },
                media_url_resolver: function(data, resolve) {
                    try {
                        let videoUri = encodeURI(data.url);
                        let embedHtml = `<p>
                            <span
                            data-mce-selected="1"
                            data-mce-object="video"
                            data-mce-p-controls="controls"
                            data-mce-p-controlslist="nodownload"
                            data-mce-p-allowfullscreen="true"
                            style="width: 200px;height:120px;display: block;"
                            data-mce-p-src=${data.url} >
                            <video src=${data.url} width="100%" height="100%" controls="controls" controlslist="nodownload">
                            </video>
                            </span>
                            </p>
                            <p style="text-align: left;"></p>`;
                        resolve({ html: embedHtml });
                    } catch (e) {
                        resolve({ html: "" });
                    }
                },
                toolbar_mode: 'sliding',
                insertdatetime_formats: [
                    '%Y年%m月%d日',
                    '%H点%M分%S秒',
                    '%Y-%m-%d',
                    '%H:%M:%S'
                ],
                images_upload_handler: async (blobInfo, success, failure) => {
                    let _ossParams = await this.beforeUpload();
                    if (_ossParams === false) {
                        failure('上传失败!')
                    } else {
                        let _oldFilename = blobInfo.filename();
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                        let _suffix = ''
                        if (_oldFilename && _oldFilename.lastIndexOf('.') != -1) {
                            _suffix = _oldFilename.substring(_oldFilename.lastIndexOf('.') + 1).toLowerCase();
                        }
                        let _fileName = this.generateGuid() + '.' + _suffix;
                        let _that = this;
                        async function putObject() {
                            try {
                                const result = await ossClient(_ossParams).put(_fileName, blobInfo.blob());
                                success(result.url)
                            } catch (e) {
                                console.log(e)
                                // _that.$message.error("上传失败!")
                                failure('上传失败2')
                            }
                        }
                        putObject();
                    }
                }
            },
            myValue: this.value
        }
    },
    computed: {
        completeSetting() {
            return Object.assign(this.defaultSetting, this.setting)
        }
    },
    watch: {
        myValue(newValue) {
            this.$emit('input', newValue)
        },
        value(newValue) {
            this.myValue = newValue
        }
    },
    mounted() {
        this.$nextTick(() => {
            tinymce.init({})
        })
    },
    methods: {
        beforeUpload() {
            return new Promise((resolve, reject) => {
                //从后台获取第一步所需的数据
                OssFileAPI.fetchOSSConfig().then(response => {
                    console.log('response.data', response.data)
                    resolve(response.data)
                }).catch(err => {
                    console.log(err)
                    resolve(false)
                })
            })
        },
        async uploadVideo(file, callback) {
            let _ossParams = await this.beforeUpload();
            if (_ossParams === false) {
                failure('上传失败!')
                return;
            }
            return new Promise((resolve, reject) => {
                let _oldFilename = file.name;
                let _suffix = ''
                if (_oldFilename && _oldFilename.lastIndexOf('.') != -1) {
                    _suffix = _oldFilename.substring(_oldFilename.lastIndexOf('.') + 1).toLowerCase();
                }
                let _fileName = this.generateGuid() + '.' + _suffix;
                let _that = this;
                async function putObject() {
                    try {
                        const result = await ossClient(_ossParams).put(_fileName, file);
                        callback(result.url)
                    } catch (e) {
                        console.log(e)
                        resolve('上传失败')
                    }
                }
                putObject();
            })
        },
        generateGuid() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep .tox-tinymce {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}
</style>
