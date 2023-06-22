<template>
    <span :style="{ color: degreeColor[value] || '#606266' }">{{ value || '' }}</span>
</template>

<script>

export default {
    name: 'DegreeText',
    data() {
        return {
            degreeColor: {
                '严重': '#D9001B',
                '较严重': '#F59A23',
                '一般': '#02A7F0',
            },
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
    }
}
</script>
