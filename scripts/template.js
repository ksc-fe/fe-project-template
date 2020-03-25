module.exports = {
    vueTemplate: componentName => {
        return `<template>
            <div class="main">
                <div class="breadcrumb-wrapper">
                    
                </div>
                <div class="body-wrapper">
            
                </div>
            </div>
        </template>
        <script>
        export default {
            name: '${componentName}'
        }
        </script>
        <style lang="stylus" scoped>
            @import '../../styles/common.styl';
        </style>
        `;
    },
}